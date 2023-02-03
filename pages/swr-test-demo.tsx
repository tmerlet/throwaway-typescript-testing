import { Fragment } from 'react';
import { useGames } from '../lib/userFetchWithSWR';

export default function Home() {
  const { Games, GamesError } = useGames();

  console.log('Games', Games);
  console.log('GamesError', GamesError);

  if (GamesError) {
    return <>Error loading Games</>;
  }

  if (!Games) {
    return <>loading...</>;
  }

  return (
    <div>
      {Games.map((game: { id: string; name: string; genre: string }) => {
        return (
          <Fragment key={game?.id}>
            <h1>{game?.name}</h1>
            <h3>{game?.genre}</h3>
          </Fragment>
        );
      })}
    </div>
  );
}
