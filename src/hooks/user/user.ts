import { QueryString } from "@/interfaces/query-string";
import { IApiUser } from "@/interfaces/user";
import { usersMetaState, usersState } from "@/states/user";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { useApi } from "@/hooks/base/base";
import { useQueryString } from "@/hooks/query-string/query-string";

export function useUser<QueryStringGeneric extends QueryString>(
  queryString: QueryStringGeneric = {} as QueryStringGeneric
) {
  const [users, setUsers] = useRecoilState(usersState)
  const [usersMeta, setUsersMeta] = useRecoilState(usersMetaState)
  const defaultQueryString = {
    seed: "jefrydco",
    results: "10",
    exc: "info",
    page: "1",
  };
  const stringifiedQueryString = useQueryString({...defaultQueryString, ...queryString})
  const { data, error, mutate } = useApi<IApiUser, string>(
    stringifiedQueryString
  );
  useEffect(() => {
    setUsers(data?.results || [])
    setUsersMeta(data?.info)
  }, [data])
  const refetch = () => {
    // @ts-expect-error TODO: Fix type checking
    mutate(stringifiedQueryString)
  }
  return {
    users,
    usersMeta,
    usersError: error,
    refetch
  };
}
