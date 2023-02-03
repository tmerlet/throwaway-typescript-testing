import { renderHook, waitFor } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import useFetch, {
  IDLE_STATUS,
  FETCHING_STATUS,
  FETCHED_STATUS,
} from '../lib/useFetch';

const mockUrl = 'https://api.instantwebtools.net/v1/passenger';
const mockResponse = { greeting: 'hello there' };
const server = setupServer(
  rest.get(mockUrl, (req, res, ctx) => {
    return res(ctx.json(mockResponse));
  })
);

describe('UseFetch hook', () => {
  beforeAll(() => server.listen());
  afterAll(() => server.close());

  it('should exist', () => {
    const { result } = renderHook(() => useFetch());
    expect(result.current).toBeDefined();
  });

  it('should return an "idle" status when no url is given to it', () => {
    const { result } = renderHook(() => useFetch());
    expect(result.current.status).toEqual(IDLE_STATUS);
  });

  it('should first go into an "idle" status and then "fetching" and then "fetched" when initiated with a URL', async () => {
    let all: { status: string }[] = [];

    const { result } = renderHook(() => {
      const value = useFetch({ url: mockUrl });
      all.push(value);
      return value;
    });

    await waitFor(() => expect(all.length).toEqual(3));
    expect(all[0].status).toEqual(IDLE_STATUS);
    expect(all[1].status).toEqual(FETCHING_STATUS);
    expect(all[2].status).toEqual(FETCHED_STATUS);
  });

  // it should return the data from the server
  it('should return the data from the server', async () => {
    const { result } = renderHook(() => useFetch({ url: mockUrl }));
    await waitFor(() => expect(result.current.status).toEqual(FETCHED_STATUS));
    expect(result.current.data).toEqual(mockResponse);
  });
});
