// Types
import type { Photo } from "pexels";
import type { FormEvent } from "react";

export interface RequestState {
  loading: boolean;
  error: string | null;
  performed: boolean;
}

export interface PhotoContextProps {
  list: {
    queryText: string;
    setQueryText?: (queryText: string) => void;
    photos: Photo[];
    nbResults: {
      total: number;
      displayed: number;
    };
    nbItemsPerPage: number;
    page: number;
    request: RequestState;
    handleSearchFormSubmit?: (
      event: FormEvent,
      shouldFetchRefCallback: () => void
    ) => void;
    handleLoadMore?: (
      value: number,
      shouldFetchRefCallback: () => void
    ) => void;
  };
  details: {
    item: Photo | null;
    request: RequestState;
  };
  fetchPhotos?: (
    newPage: number,
    query: string,
    shouldFetchRefCallback: () => void
  ) => void;
  fetchPhotoDetails?: (id: number, shouldFetchRefCallback: () => void) => void;
}
