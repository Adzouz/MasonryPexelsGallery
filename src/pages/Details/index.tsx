// Libraries
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

// Context
import { usePhotoContext } from "../../contexts/PhotoContext/PhotoContext";

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
  const [reloadComponent, setReloadComponent] = useState(true);
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
      setReloadComponent(true);
      fetchPhotoDetails(parseInt(id), () => {
        shouldFetchRef.current = false;
      });
    }
  }, [fetchPhotoDetails, id]);

  useEffect(() => {
    if (!request.loading) {
      setReloadComponent(false);
    }
  }, [request.loading]);

  return (
    <div>
      <h2>Photo details</h2>
      {request.loading && (
        <LoaderContainer>
          <Loader />
        </LoaderContainer>
      )}
      {request.error && <ErrorMessage>{request.error}</ErrorMessage>}
      {item && !request.loading && !reloadComponent && (
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
