import { render, screen } from '@testing-library/react';
import Home from '../pages/swr-test-demo';

type Game = {
  id: string;
  name: string;
  genre: string;
  avatar?: string;
  editor_choice?: false;
  platform?: string;
};

// mock the useGames hook
const mock = { Games: undefined as unknown as Game[], GamesError: null };
jest.mock('../lib/userFetchWithSWR', () => ({
  useGames: () => mock,
}));

describe('demo page', () => {
  beforeEach(() => {
    mock.Games = undefined as unknown as Game[];
    mock.GamesError = null;
  });

  it('should render in a loading state', () => {
    render(<Home />);
    const loadingElement = screen.queryByText('loading...');
    expect(loadingElement).toBeInTheDocument();
  });

  it('should display the games according to the hooks data', () => {
    mock.Games = [
      {
        id: '1',
        name: 'name 1',
        genre: 'Alda Kling',
        avatar:
          'https://s3.amazonaws.com/uifaces/faces/twitter/jm_denis/128.jpg',
        editor_choice: false,
        platform: 'platform 1',
      },
      {
        id: '2',
        name: 'name 2',
        genre: 'Haylie Dicki',
        avatar:
          'https://s3.amazonaws.com/uifaces/faces/twitter/netonet_il/128.jpg',
        editor_choice: false,
        platform: 'platform 2',
      },
    ];

    render(<Home />);
    const loadingElement = screen.queryByText('loading...');
    expect(loadingElement).not.toBeInTheDocument();

    const game1Element = screen.queryByText('name 1');
    expect(game1Element).toBeInTheDocument();

    const game2Element = screen.queryByText('name 2');
    expect(game2Element).toBeInTheDocument();
  });

  it('should render in a loading state', () => {
    render(<Home />);
    const loadingElement = screen.queryByText('loading...');
    expect(loadingElement).toBeInTheDocument();
  });
});
