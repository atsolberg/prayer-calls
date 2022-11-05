/**
 * @jest-environment jsdom
 */
import React from "react";
import { expect, test } from "@jest/globals";
import { render } from "@testing-library/react";
import { StaticRouter } from "react-router-dom/server";

import FileCard from "./FileCard";

test("displays a default thumbnail", async () => {
  // We need StaticRouter since <FileCard> has a <Link> in it and you can't
  // have Links unless you are inside a router

  const file = { id: "1234", name: "01-01-21.md", contents: "foo bar" };
  const card = render(
    <StaticRouter location="/">
      <FileCard file={file} />
    </StaticRouter>
  );

  const thumb = await card.findByTestId("thumbnail");
  expect(thumb).toHaveTextContent(/foo bar/i);

  const link = await card.findByRole("link", { name: file.contents });
  expect(link.href).toMatch(new RegExp(`/details/${file.id}$`));
});
