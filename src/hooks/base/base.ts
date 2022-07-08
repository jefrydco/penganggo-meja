import { fetcher } from "@/services/api";
import { HTTPError } from "ky";
import { Key, SWRResponse } from "swr";
import useSWRImmutable from 'swr/immutable'

export function useApi<Data = any, SWRKey extends Key = string>(swrKey: SWRKey): SWRResponse<Data, HTTPError> {
  // @ts-expect-error TODO: fix type checking
  const response = useSWRImmutable<Data, HTTPError, SWRKey>(swrKey, fetcher)
  return response
}
