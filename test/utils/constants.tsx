// Types
import type { CustomRenderOptions } from "./types";

// Libraries
import { ReactElement } from "react";
import { BrowserRouter } from "react-router-dom";
import { render } from "@testing-library/react";

// Context
import { PhotoContext } from "../../src/contexts/PhotoContext/PhotoContext";

export const customPhotoRender = (
  ui: ReactElement,
  { providerProps, ...renderOptions }: CustomRenderOptions
) => {
  return render(
    <PhotoContext.Provider value={providerProps}>
      <BrowserRouter>{ui}</BrowserRouter>
    </PhotoContext.Provider>,
    renderOptions
  );
};

export const defaultContextValues = {
  list: {
    queryText: "",
    photos: [],
    nbResults: {
      total: 0,
      displayed: 0,
    },
    nbItemsPerPage: 3,
    page: 1,
    request: {
      loading: false,
      error: null,
      performed: false,
    },
  },
  details: {
    item: null,
    request: {
      loading: false,
      error: null,
      performed: true,
    },
  },
};
