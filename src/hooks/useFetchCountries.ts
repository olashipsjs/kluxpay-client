import { useQuery } from '@tanstack/react-query';
import client from 'src/lib/queryClient';

const useFetchCountries = () => {
  const fetchCountries = async () => {
    try {
      const response = await fetch(
        'https://restcountries.com/v3.1/all?fields=name,idd,flags,flag,capital,cca2',
        {
          headers: {
            'content-type': 'application/json',
          },
        }
      );

      const countries = await response.json();

      return countries;
    } catch (error) {
      console.log((error as Error).message);
      throw new Error((error as Error).message);
    }
  };

  const { data, isLoading, error } = useQuery(
    { queryKey: ['fetchCountries'], queryFn: fetchCountries },
    client
  );

  return { countries: data, isLoading, error };
};

export default useFetchCountries;
