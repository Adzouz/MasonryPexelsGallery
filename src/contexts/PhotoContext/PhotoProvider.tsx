// Types
import type { PhotosWithTotalResults } from "pexels";
import type { PhotoContextProps, RequestState } from "./types";

// Libraries
import {
  FormEvent,
  PropsWithChildren,
  useCallback,
  useRef,
  useState,
} from "react";
import { createClient } from "pexels";

import { PhotoContext } from "./PhotoContext";

export const PhotoProvider = ({
  children,
  ...initialValues
}: PropsWithChildren<PhotoContextProps>) => {
  const client = useRef(createClient(import.meta.env.VITE_PEXELS_API_KEY));
  const resultsRef = useRef<PhotosWithTotalResults | null>(null);

  // List state
  const [requestStateList, setRequestStateList] = useState<RequestState>(
    initialValues.list.request
  );
  const [queryText, setQueryText] = useState<
    PhotoContextProps["list"]["queryText"]
  >(initialValues.list.queryText);
  const [previousQueryText, setPreviousQueryText] = useState("");
  const [photos, setPhotos] = useState<PhotoContextProps["list"]["photos"]>(
    initialValues.list.photos
  );
  const [page, setPage] = useState<PhotoContextProps["list"]["page"]>(
    initialValues.list.page
  );

  // Details state
  const [requestStateDetails, setRequestStateDetails] = useState<RequestState>(
    initialValues.details.request
  );
  const [photoDetails, setPhotoDetails] = useState<
    PhotoContextProps["details"]["item"]
  >(initialValues.details.item);

  /**
   * Method to fetch the list of photos from Pexels API
   */
  const fetchPhotos = useCallback(
    async (
      newPage: number,
      query: string,
      shouldFetchRefCallback: () => void
    ) => {
      // As soon as a request is triggered, we set the shouldFetchRef to false to prevent fetching from happening again in the useEffect
      shouldFetchRefCallback();
      if (!client.current) return;

      setRequestStateList((state) => ({
        ...state,
        loading: true,
        error: null,
      }));

      try {
        const response = await client.current.photos.search({
          query,
          per_page: initialValues.list.nbItemsPerPage,
          page: newPage,
        });

        if ("photos" in response) {
          resultsRef.current = response;
          if (newPage > 1) {
            setPhotos((prev) => [...prev, ...response.photos]);
          } else {
            setPhotos(response.photos);
          }
        } else {
          setRequestStateList((state) => ({
            ...state,
            error: "An error occurred while fetching photos.",
          }));
        }
      } catch (err) {
        console.error(err);
        setRequestStateList((state) => ({
          ...state,
          error: "Failed to fetch data.",
        }));
      } finally {
        setRequestStateList((state) => ({
          ...state,
          loading: false,
        }));
      }
    },
    []
  );

  /**
   * Method to fetch the details of a given photo (by default in context or fallback with Pexels API)
   */
  const fetchPhotoDetails = useCallback(
    async (id: number, shouldFetchRefCallback: () => void) => {
      setRequestStateDetails((state) => ({
        ...state,
        loading: true,
        error: null,
      }));

      shouldFetchRefCallback();
      const photoFound = photos.find((photo) => photo.id === id);
      if (photoFound) {
        setRequestStateDetails((state) => ({
          ...state,
          performed: false,
          loading: false,
          error: null,
        }));
        setPhotoDetails(photoFound);
        return;
      }

      if (!client.current) return;

      try {
        const response = await client.current.photos.show({
          id,
        });

        if ("src" in response) {
          setPhotoDetails(response);
        } else {
          setRequestStateDetails((state) => ({
            ...state,
            error: "An error occurred while fetching photo details.",
          }));
        }
      } catch (err) {
        console.error(err);
        setRequestStateDetails((state) => ({
          ...state,
          error: "Failed to fetch photo.",
        }));
      } finally {
        setRequestStateDetails((state) => ({
          ...state,
          loading: false,
        }));
      }
    },
    [photos]
  );

  const handleSearchFormSubmit = (
    event: FormEvent,
    shouldFetchRefCallback: () => void
  ) => {
    event.preventDefault();
    if (queryText.trim() !== "" && queryText.trim() !== previousQueryText) {
      // Perform request if query is different from the previous entered
      setPreviousQueryText(queryText.trim());
      setQueryText(queryText.trim());
      setPage(1);
      shouldFetchRefCallback();
    } else if (queryText.trim() === "") {
      // Reset form if no value provided
      setPage(1);
      setPhotos([]);
      resultsRef.current = null;
    }
  };

  const handleLoadMore = (
    value: number,
    shouldFetchRefCallback: () => void
  ) => {
    if (!requestStateList.loading) {
      shouldFetchRefCallback();
      setPage(value);
    }
  };

  const nbResults = {
    total: resultsRef?.current?.total_results || 0,
    displayed: photos.length,
  };

  return (
    <PhotoContext.Provider
      value={{
        list: {
          queryText,
          setQueryText,
          photos,
          nbResults,
          nbItemsPerPage: initialValues.list.nbItemsPerPage,
          page,
          request: {
            ...requestStateList,
            performed: !!resultsRef.current,
          },
          handleSearchFormSubmit,
          handleLoadMore,
        },
        details: {
          item: photoDetails,
          request: requestStateDetails,
        },
        fetchPhotos,
        fetchPhotoDetails,
      }}
    >
      {children}
    </PhotoContext.Provider>
  );
};
