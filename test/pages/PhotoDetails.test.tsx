// Types
import type { PhotoContextProps } from "../../src/contexts/PhotoContext/types";

// Libraries
import { ReactElement } from "react";
import { BrowserRouter } from "react-router-dom";
import { render, RenderOptions, screen, waitFor } from "@testing-library/react";

// Context
import {
  PhotoContext,
  photoContextInitialValues,
  usePhotoContext,
} from "../../src/contexts/PhotoContext/PhotoContext";

// Components
import DetailsPage from "../../src/pages/Details";

// Data
import mockPhotoSearch from "../__mocks__/photoSearch.json";

// Mock methods
const mockFetchPhotoDetails = jest.fn();

// Mock of the usePhotoContext hook
jest.mock("../../src/contexts/PhotoContext/PhotoContext", () => {
  const currentModule = jest.requireActual(
    "../../src/contexts/PhotoContext/PhotoContext"
  );
  return {
    ...currentModule,
    usePhotoContext: jest.fn(() => ({
      ...photoContextInitialValues,
      fetchPhotoDetails: mockFetchPhotoDetails,
    })),
  };
});

// Mock of the useParams hook
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: jest.fn().mockReturnValue({ id: "670261" }),
}));

interface CustomRenderOptions extends Omit<RenderOptions, "wrapper"> {
  providerProps: PhotoContextProps;
}

const customPhotoRender = (
  ui: ReactElement,
  { providerProps, ...renderOptions }: CustomRenderOptions
) => {
  return render(
    <PhotoContext.Provider value={providerProps}>{ui}</PhotoContext.Provider>,
    renderOptions
  );
};

describe("Details Page", () => {
  let providerProps: PhotoContextProps;

  beforeEach(() => {
    providerProps = {
      list: {
        queryText: "madrid",
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
      fetchPhotoDetails: mockFetchPhotoDetails,
    };
    mockFetchPhotoDetails.mockClear();
    (usePhotoContext as jest.Mock).mockReturnValue(providerProps);
  });

  test("should render Details page and display the correct photo info", async () => {
    const { rerender } = customPhotoRender(
      <BrowserRouter>
        <DetailsPage />
      </BrowserRouter>,
      { providerProps }
    );

    expect(screen.getByText("Photo details")).toBeInTheDocument();

    await waitFor(() => {
      expect(mockFetchPhotoDetails).toHaveBeenCalledTimes(1);
    });

    const itemFound = mockPhotoSearch.photos.find(
      (item) => item.id === parseInt("670261")
    );
    if (itemFound) {
      providerProps.details.item = itemFound;
      rerender(
        <BrowserRouter>
          <DetailsPage />
        </BrowserRouter>
      );

      // Check if the photo image is correctly displayed
      const photoImage = screen.getByRole("img");
      expect(photoImage).toBeInTheDocument();
      expect(photoImage).toHaveAttribute(
        "src",
        "https://images.pexels.com/photos/670261/pexels-photo-670261.jpeg?auto=compress\u0026cs=tinysrgb\u0026h=650\u0026w=940"
      );

      // Check if the photo description is correctly displayed
      expect(
        screen.getByText(
          /A breathtaking aerial view of Madrid's vibrant cityscape under a clear blue sky./i
        )
      ).toBeInTheDocument();

      // Check if the photo author is correctly displayed
      expect(screen.getByText(/Abhishek Verma/i)).toBeInTheDocument();
    }
  });

  test("should display error if photo not found", async () => {
    const { rerender } = customPhotoRender(
      <BrowserRouter>
        <DetailsPage />
      </BrowserRouter>,
      { providerProps }
    );

    await waitFor(() => {
      expect(mockFetchPhotoDetails).toHaveBeenCalledTimes(1);
    });

    // Simulate the setState in fetchPhotoDetails that will be triggered in case of an error
    providerProps.details.request = {
      loading: false,
      performed: true,
      error: "Failed to fetch photo.",
    };

    rerender(
      <BrowserRouter>
        <DetailsPage />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/Failed to fetch photo./i)).toBeInTheDocument();
    });

    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });
});
