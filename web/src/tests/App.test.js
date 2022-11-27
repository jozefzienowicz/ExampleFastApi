import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import App from "../App";

let container = null;
beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("renders favourite zip codes", async () => {
  const fakeFavouriteData = [{
    name: "Washington",
    code: "55555",
    id: "123",
    user_cookie: "728063"
  }];
  jest.spyOn(global, "fetch").mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve(fakeFavouriteData)
    })
  );

  await act(async () => {
    render(<App />, container);
  });

  console.log(container.querySelector("[data-testid='favourite_zip_codes']").textContent)
  expect(container.querySelector("[data-testid='favourite_zip_codes']").textContent).toBe(`${fakeFavouriteData[0].name}X`);

  global.fetch.mockRestore();
});
