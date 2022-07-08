import { QueryString } from "@/interfaces/query-string";

export function useQueryString<QueryStringGeneric extends QueryString>(
  queryString: QueryStringGeneric = {} as QueryStringGeneric
) {
  return `?${new URLSearchParams(queryString)}`
}
