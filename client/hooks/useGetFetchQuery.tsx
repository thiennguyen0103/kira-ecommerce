import { QueryKey, useQueryClient } from "@tanstack/react-query";

export const useGetFetchQuery = <T,>(key: QueryKey) => {
  const queryClient = useQueryClient();

  return queryClient.getQueryData<T>(key);
};
