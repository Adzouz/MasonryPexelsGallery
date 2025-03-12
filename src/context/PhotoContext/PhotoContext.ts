// Types
import type { PhotoContextProps } from "./types";

// Libraries
import { createContext, useContext } from "react";

const nbItemsPerPage = 80; // Pexels limit is 80

export const initialValue = {
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
      loading: false,
      error: null,
      performed: false,
    },
  },
};

export const PhotoContext = createContext<PhotoContextProps>(initialValue);

export const usePhotoContext = () => useContext(PhotoContext);
