// Libraries
import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";

// Context
import { usePhotoContext } from "../../context/PhotoContext/PhotoContext";

// Components
import Loader from "../../components/Loader";
import PhotoDetails from "../../components/PhotoDetails";

// Styles
import {
  ButtonLink,
  ErrorMessage,
  LoaderContainer,
  ButtonContainer,
  PageContent,
} from "../styles";

const DetailsPage = () => {
  const { id } = useParams();
  const { details, fetchPhotoDetails } = usePhotoContext();
  const { item, request } = details;
  const shouldFetchRef = useRef(true);

  useEffect(() => {
    if (
      fetchPhotoDetails &&
      shouldFetchRef.current &&
      id &&
      !isNaN(parseInt(id))
    ) {
      fetchPhotoDetails(parseInt(id), () => {
        shouldFetchRef.current = false;
      });
    }
  }, [fetchPhotoDetails, id]);

  return (
    <div>
      <h2>Photos details</h2>
      {request.loading && (
        <LoaderContainer>
          <Loader />
        </LoaderContainer>
      )}
      {request.error && <ErrorMessage>{request.error}</ErrorMessage>}
      {item && (
        <PageContent>
          <PhotoDetails details={item} />
        </PageContent>
      )}
      <ButtonContainer>
        <ButtonLink to={"/"}>Got back to gallery</ButtonLink>
      </ButtonContainer>
    </div>
  );
};

export default DetailsPage;
