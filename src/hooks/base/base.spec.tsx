import { IApiUser } from "@/interfaces/user";
import { renderHook, waitFor } from "@/utils/tests/vitest";
import { describe, expect, it, beforeAll, afterEach, afterAll } from "vitest";
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { useApi } from "./base";
import api from '@/mocks/api.json';

const server = setupServer(
  rest.get('https://randomuser.me/api', (req, res, ctx) => {
    return res(ctx.json(api))
  }),
)

beforeAll(() => {
  server.listen()
})
afterEach(() => {
  server.resetHandlers()
})
afterAll(() => {
  server.close()
})

describe("Base Hook", () => {
  it.todo("works", () => {
    const { result, rerender } = renderHook(() =>
      useApi<IApiUser>("?seed=jefrydco&page=1&results=10&exc=info")
    );
    expect(result.current.data).toStrictEqual(api)
  });
});
