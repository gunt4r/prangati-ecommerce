import { useQuery } from "@tanstack/react-query";

import { api } from "../api";

import { REACT_QUERY_COUNTRIES_KEY } from "@/config/const";
/**
 * Hook to fetch the list of countries.
 * Utilizes React Query for data fetching and caching.
 */
export function useGetCountries() {
  return useQuery({
    // Unique key for the query to identify and cache data
    queryKey: [REACT_QUERY_COUNTRIES_KEY],

    // Function to fetch data from the server
    queryFn: async () => {
      const res = await api.get(`/countries`);

      return res.data;
    },
    staleTime: Infinity,
  });
}

export function useGetCountryStates(countryCode: string) {
  return useQuery({
    queryKey: [REACT_QUERY_COUNTRIES_KEY, countryCode],
    queryFn: async ({ queryKey }) => {
      const [, code] = queryKey;
      const res = await api.get(`/countries/${code}`);

      return res.data.sub_regions || null;
    },

    enabled: !!countryCode,
  });
}
