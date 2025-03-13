// Types
import type { PhotoContextProps } from "../../src/contexts/PhotoContext/types";

// Libraries
import { FormEvent } from "react";
import { BrowserRouter } from "react-router-dom";
import { fireEvent, screen, waitFor } from "@testing-library/react";

// Context
import { usePhotoContext } from "../../src/contexts/PhotoContext/PhotoContext";

// Components
import GridPage from "../../src/pages/Grid";

// Utils
import { customPhotoRender, defaultContextValues } from "../utils/constants";

// Data
import mockPhotoSearch from "../__mocks__/photoSearch.json";

// Mock methods
const mockFetchPhotos = jest.fn(
  (page: number, queryText: string, callback: () => void) => {
    console.log("fetchPhotos called with:", { page, queryText });
    callback();
  }
);

const mockHandleSearchFormSubmit = jest.fn(
  (_: FormEvent, callback: () => void) => {
    callback();
  }
);

// Mock of the usePhotoContext hook (for methods)
jest.mock("../../src/contexts/PhotoContext/PhotoContext", () => {
  const currentModule = jest.requireActual(
    "../../src/contexts/PhotoContext/PhotoContext"
  );
  return {
    ...currentModule,
    usePhotoContext: jest.fn(() => ({
      list: {
        handleSearchFormSubmit: mockHandleSearchFormSubmit,
      },
      fetchPhotos: mockFetchPhotos,
    })),
  };
});

describe("Grid Page", () => {
  let providerProps: PhotoContextProps;

  beforeEach(() => {
    mockFetchPhotos.mockClear();
    // Reset the providerProps
    providerProps = {
      ...JSON.parse(JSON.stringify(defaultContextValues)),
      list: {
        ...JSON.parse(JSON.stringify(defaultContextValues.list)),
        handleSearchFormSubmit: mockHandleSearchFormSubmit,
      },
      fetchPhotos: mockFetchPhotos,
    };
    (usePhotoContext as jest.Mock).mockReturnValue(providerProps);
  });

  test("should automatically display the grid page if data is in context", async () => {
    const providerPropsOverride = {
      ...providerProps,
      list: {
        ...providerProps.list,
        queryText: "madrid",
        photos: mockPhotoSearch.photos,
        nbResults: {
          total: mockPhotoSearch.total_results,
          displayed: mockPhotoSearch.photos.length,
        },
        page: mockPhotoSearch.page,
        nbItemsPerPage: mockPhotoSearch.per_page,
      },
    };
    (usePhotoContext as jest.Mock).mockReturnValue(providerPropsOverride);

    customPhotoRender(<GridPage />, { providerProps: providerPropsOverride });

    expect(mockFetchPhotos).not.toHaveBeenCalled();

    const listImages = screen.getAllByRole("img");
    expect(listImages).toHaveLength(3);

    for (let i = 0; i <= 2; i++) {
      expect(listImages[i]).toHaveAttribute(
        "data-src",
        mockPhotoSearch.photos[i].src.medium
      );
    }
  });

  test("should fetch the photos if the form is submitted", async () => {
    // Disable the console.log called by mockFetchPhotos
    const consoleSpy = jest.spyOn(console, "log").mockImplementation();

    const providerPropsOverride = {
      ...providerProps,
      list: {
        ...providerProps.list,
        queryText: "madrid",
      },
    };
    (usePhotoContext as jest.Mock).mockReturnValue(providerPropsOverride);

    const { rerender } = customPhotoRender(<GridPage />, {
      providerProps: providerPropsOverride,
    });

    const formElement = screen.getByRole("form");
    fireEvent.submit(formElement);

    // There shouldn't be any image displayed before sending the form
    expect(screen.queryByRole("img")).not.toBeInTheDocument();

    await waitFor(() => {
      expect(mockHandleSearchFormSubmit).toHaveBeenCalledTimes(1);
    });

    await waitFor(() => {
      expect(mockFetchPhotos).toHaveBeenCalledTimes(1);
    });

    providerPropsOverride.list = {
      ...providerPropsOverride.list,
      photos: mockPhotoSearch.photos,
      nbResults: {
        total: mockPhotoSearch.total_results,
        displayed: mockPhotoSearch.photos.length,
      },
      page: mockPhotoSearch.page,
      nbItemsPerPage: mockPhotoSearch.per_page,
    };

    rerender(
      <BrowserRouter>
        <GridPage />
      </BrowserRouter>
    );

    // After the fetchPhotos succeeded, we should have the images displayed
    const listImagesAfter = screen.getAllByRole("img");
    expect(listImagesAfter).toHaveLength(3);

    // Clear the console.log
    consoleSpy.mockRestore();
  });

  afterEach(() => {
    mockFetchPhotos.mockClear();
  });
});
