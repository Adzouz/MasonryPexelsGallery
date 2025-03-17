// Types
import type { PhotoContextProps } from "./types";

// Libraries
import { createContext, useContext } from "react";

const nbItemsPerPage = 80; // Pexels limit is 80

export const photoContextInitialValues = {
  list: {
    queryText: "madrid",
    photos: [],
    nbResults: {
      total: 0,
      displayed: 0,
    },
    nbItemsPerPage,
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
      loading: true,
      error: null,
      performed: false,
    },
  },
};

export const PhotoContext = createContext<PhotoContextProps>(
  photoContextInitialValues
);

export const usePhotoContext = () => useContext(PhotoContext);
