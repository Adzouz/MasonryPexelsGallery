// Libraries
import { useEffect, useRef } from "react";

// Context
import { usePhotoContext } from "../../context/PhotoContext/PhotoContext";

// Components
import FormSearch from "../../components/FormSearch";
import GridList from "../../components/GridList";
import Loader from "../../components/Loader";

// Styles
import {
  Button,
  ErrorMessage,
  HighlightNumber,
  LoaderContainer,
  PageContent,
  ButtonContainer,
} from "../styles";

const nbItemsPerPage = 80; // Pexels limit is 80

const GridPage = () => {
  const { list, fetchPhotos } = usePhotoContext();
  const {
    queryText,
    setQueryText,
    photos,
    nbResults,
    page,
    request,
    handleSearchFormSubmit,
    handleLoadMore,
  } = list;
  const shouldFetchRef = useRef(false);

  useEffect(() => {
    if (shouldFetchRef.current && fetchPhotos) {
      fetchPhotos(page, queryText, () => {
        shouldFetchRef.current = false;
      });
    }
  }, [fetchPhotos, page, queryText, request]);

  return (
    <div>
      <h2>List of images</h2>
      <FormSearch
        queryText={queryText}
        setQueryText={(value) => setQueryText?.(value)}
        handleSubmit={(event) =>
          handleSearchFormSubmit?.(event, () => {
            if (fetchPhotos) {
              shouldFetchRef.current = true;
              fetchPhotos(page, queryText, () => {
                shouldFetchRef.current = false;
              });
            }
          })
        }
      />
      {request.error && <ErrorMessage>{request.error}</ErrorMessage>}
      {request.performed && (
        <PageContent>
          <div>
            <HighlightNumber>{nbResults.total}</HighlightNumber> result
            {nbResults.total > 1 && "s"}
          </div>
          {nbResults.displayed > 0 && (
            <div>
              Showing the first{" "}
              <HighlightNumber>{nbResults.displayed}</HighlightNumber> items
            </div>
          )}
        </PageContent>
      )}
      <GridList photos={photos} />
      {request.loading && (
        <LoaderContainer>
          <Loader />
        </LoaderContainer>
      )}
      {!!(nbResults.total > 0 && page < nbResults.total / nbItemsPerPage) && (
        <ButtonContainer>
          <Button
            onClick={() =>
              handleLoadMore?.(page + 1, () => {
                shouldFetchRef.current = true;
              })
            }
            disabled={request.loading}
          >
            Show more
          </Button>
        </ButtonContainer>
      )}
    </div>
  );
};

export default GridPage;
