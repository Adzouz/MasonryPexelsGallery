require("@testing-library/jest-dom");
require("jest-styled-components");
const { TextEncoder, TextDecoder } = require("text-encoding");

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));
