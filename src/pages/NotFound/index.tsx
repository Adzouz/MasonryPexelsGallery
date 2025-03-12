// Styles
import { ButtonLink } from "../styles";

const NotFoundPage = () => {
  return (
    <div>
      <h2>404 - Not Found</h2>
      <p>This page doesn't exist.</p>
      <ButtonLink to={"/"}>Go back to the photo gallery</ButtonLink>
    </div>
  );
};

export default NotFoundPage;
