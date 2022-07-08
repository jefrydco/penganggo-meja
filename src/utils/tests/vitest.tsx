import { fetcher } from "@/services/api";
import {
  cleanup,
  render,
  renderHook,
  RenderHookOptions,
  RenderOptions,
} from "@testing-library/react";
import { RecoilRoot } from "recoil";
import { SWRConfig } from "swr";
import { afterEach } from "vitest";

afterEach(() => {
  cleanup();
});

const wrapper: React.JSXElementConstructor<{
  children: React.ReactElement;
}> = ({ children }) => {
  return (
    <RecoilRoot>
      <SWRConfig value={{ dedupingInterval: 0, fetcher }}>{children}</SWRConfig>
    </RecoilRoot>
  );
};

const customRender = (
  ui: React.ReactElement,
  options: Omit<RenderOptions, "queries" | "wrapper"> = {}
) =>
  render(ui, {
    // wrap provider(s) here if needed
    wrapper,
    ...options,
  });

const customRenderHook = <Result, Props>(
  render: (initialProps: Props) => Result,
  options: Omit<RenderHookOptions<Props>, "wrapper"> = {}
) =>
  renderHook<Result, Props>(render, {
    wrapper,
    ...options,
  });

export * from "@testing-library/react";
export { default as userEvent } from "@testing-library/user-event";
// override render export
export { customRender as render };
export { customRenderHook as renderHook };
