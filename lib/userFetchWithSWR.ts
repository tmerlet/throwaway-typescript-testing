import useSWR from 'swr';
import fetch from 'node-fetch';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

function useGames() {
  const { data, error } = useSWR(
    () => 'https://5fbc07c3c09c200016d41656.mockapi.io/api/v1/games',
    fetcher
  );

  if (error) {
    // TODO: handle if API fails
  }
  return { Games: data, GamesError: error };
}

export { useGames };
