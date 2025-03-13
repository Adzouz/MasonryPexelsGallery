import type { RenderOptions } from "@testing-library/react";
import type { PhotoContextProps } from "../../src/contexts/PhotoContext/types";

export interface CustomRenderOptions extends Omit<RenderOptions, "wrapper"> {
  providerProps: PhotoContextProps;
}
