import ky from "ky-universal";
import { Input, Options } from "ky/distribution/types/options";
import { Fetcher } from "swr";

const api = ky.create({ prefixUrl: "https://randomuser.me/api" });

export const fetcher: Fetcher<any, string> = async <Data = any>(
  ...args: [url: Input, options?: Options | undefined]
) => {
   const response = await api(...args).json<Data>();
   return response
}
