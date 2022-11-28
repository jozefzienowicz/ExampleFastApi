import React from "react";
import App from "../App";
import { render } from '@testing-library/react';

async function mockFetch(url) {
  return {
      ok: true,
      status: 200,
      json: async () => [{
        name: "Washington",
        code: "55555",
        id: "123",
        user_cookie: "728063"
      }]
  };
}

beforeEach(() => {
  jest.spyOn(window, "fetch").mockImplementation(mockFetch);
});

afterEach(() => {
  jest.restoreAllMocks()
});

test('test favourite zip codes', async () => {
  const { getByTestId } = render(<App />);
  expect(await getByTestId('favourite_zip_codes')).toHaveTextContent('Washington')
});
