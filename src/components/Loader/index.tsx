// Libraries
import React from "react";

// Styles
import { LoaderContainer, LoaderDot } from "./styles";

const Loader = React.memo(() => (
  <LoaderContainer>
    <LoaderDot />
    <LoaderDot />
    <LoaderDot />
  </LoaderContainer>
));

export default Loader;
