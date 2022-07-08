import React from "react";
import { describe, expect, it, vi } from "vitest";
import {
  getByRole,
  render,
  screen,
  userEvent,
  waitFor,
} from "@/utils/tests/vitest";
import { Gender } from "./Gender";

describe("Gender", () => {
  it("match snapshot", () => {
    const { asFragment } = render(<Gender />);
    expect(asFragment()).toMatchSnapshot();
  });
  it("clickable", () => {
    const handleGenderChange = vi.fn();
    const user = userEvent.setup();
    const { getByTestId, getByRole } = render(
      <Gender onGenderChange={handleGenderChange} />
    );
    user.click(getByTestId("gender"));
    user.tab();
    user.type(getByTestId("gender"), "{arrowdown}");
    user.type(getByTestId("gender"), "{enter}");
    waitFor(() => {
      expect(getByRole("button")).toHaveTextContent('male');
      expect(handleGenderChange).toBeCalledTimes(1);
    });
  });
});
