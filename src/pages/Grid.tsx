// Types
import { PhotoProps } from "../types";

// Libraries
import { useEffect, useRef, useState, useCallback, FormEvent } from "react";
import { createClient, PhotosWithTotalResults } from "pexels";

// Components
import GridList from "../components/GridList";
import Loader from "../components/Loader";

// Styles
import {
  Button,
  HighlightNumber,
  LoaderContainer,
  RequestInfo,
  ShowMoreContainer,
} from "./styles";
import FormSearch from "../components/FormSearch";

const nbItemsPerPage = 80; // Pexels limit is 80

const GridPage = () => {
  const client = useRef(createClient(import.meta.env.VITE_PEXELS_API_KEY));
  const resultsRef = useRef<PhotosWithTotalResults | null>(null);

  const [queryText, setQueryText] = useState("madrid");
  const [previousQueryText, setPreviousQueryText] = useState(queryText);
  const [photos, setPhotos] = useState<PhotoProps[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const requestIdRef = useRef(0);
  const shouldFetchRef = useRef(!!queryText);

  const fetchPhotos = useCallback(async (newPage: number, query: string) => {
    if (!client.current) return;
    const thisRequestId = ++requestIdRef.current;

    setLoading(true);
    setError(null);

    try {
      const response = await client.current.photos.search({
        query,
        per_page: nbItemsPerPage,
        page: newPage,
      });

      if (thisRequestId === requestIdRef.current) {
        if ("photos" in response) {
          resultsRef.current = response;
          if (newPage > 1) {
            setPhotos((prev) => [
              ...prev,
              ...response.photos.map((photo) => ({
                id: photo.id,
                src: photo.src.large,
                alt: photo.alt || "",
                width: photo.width,
                height: photo.height,
              })),
            ]);
          } else {
            setPhotos([
              ...response.photos.map((photo) => ({
                id: photo.id,
                src: photo.src.large,
                alt: photo.alt || "",
                width: photo.width,
                height: photo.height,
              })),
            ]);
          }
        } else {
          setError("An error occurred while fetching photos.");
        }
      }
    } catch (err) {
      console.error(err);
      setError("Failed to fetch data.");
    } finally {
      if (thisRequestId === requestIdRef.current) {
        setLoading(false);
      }
    }
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (queryText.trim() !== "" && queryText.trim() !== previousQueryText) {
      // Perform request if query is different from the previous entered
      setPreviousQueryText(queryText.trim());
      setQueryText(queryText.trim());
      setPage(1);
      shouldFetchRef.current = true;
      fetchPhotos(1, queryText);
    } else if (queryText.trim() === "") {
      // Reset form if no value provided
      setPage(1);
      setPhotos([]);
      resultsRef.current = null;
    }
  };

  const handleLoadMore = (value: number) => {
    if (!loading) {
      shouldFetchRef.current = true;
      setPage(value);
    }
  };

  useEffect(() => {
    if (shouldFetchRef.current) {
      shouldFetchRef.current = false;
      fetchPhotos(page, queryText);
    }
  }, [fetchPhotos, page, queryText]);

  const nbResults = resultsRef?.current?.total_results || 0;

  return (
    <div>
      <h2>List of images</h2>
      <FormSearch
        queryText={queryText}
        setQueryText={setQueryText}
        handleSubmit={handleSubmit}
      />
      {error && <p>{error}</p>}
      {!!resultsRef.current && (
        <RequestInfo>
          <div>
            <HighlightNumber>{nbResults}</HighlightNumber> result
            {nbResults > 1 && "s"}
          </div>
          {nbResults > 0 && (
            <div>
              Showing the first{" "}
              <HighlightNumber>{photos.length}</HighlightNumber> items
            </div>
          )}
        </RequestInfo>
      )}
      <GridList photos={photos} />
      {loading && (
        <LoaderContainer>
          <Loader />
        </LoaderContainer>
      )}
      {!!(
        resultsRef.current?.total_results &&
        page < resultsRef.current.total_results / nbItemsPerPage
      ) && (
        <ShowMoreContainer>
          <Button onClick={() => handleLoadMore(page + 1)} disabled={loading}>
            Show more
          </Button>
        </ShowMoreContainer>
      )}
    </div>
  );
};

export default GridPage;
