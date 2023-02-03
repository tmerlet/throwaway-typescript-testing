import { renderHook, act } from '@testing-library/react';
import usePagination, { NO_TOTAL_PAGES_ERROR } from '../lib/usePagination';

describe('usePagination hook', () => {
  it('should exist', () => {
    const { result } = renderHook(() => usePagination({ totalPages: 10 }));
    expect(result).toBeDefined();
  });

  it('should return the totalPages that was given to it', () => {
    const { result } = renderHook(() => usePagination({ totalPages: 10 }));
    expect(result.current.totalPages).toEqual(10);
  });

  it('should return 0 for the cursor position if none were passed in', () => {
    const { result } = renderHook(() => usePagination({ totalPages: 10 }));
    expect(result.current.cursor).toEqual(0);
  });

  it('should return the cursor position if passed in to the hook', () => {
    const { result } = renderHook(() =>
      usePagination({ totalPages: 10, initialCursor: 5 })
    );
    expect(result.current.cursor).toEqual(5);
  });

  it('should return the hooks methods', () => {
    const { result } = renderHook(() =>
      usePagination({ totalPages: 10, initialCursor: 5 })
    );

    expect(typeof result.current.goNext).toBe('function');
    expect(typeof result.current.goPrev).toBe('function');
    expect(typeof result.current.setCursor).toBe('function');
  });

  describe('setCursor method', () => {
    it('should set the hooks cursor to the given value', async () => {
      const { result } = renderHook(() =>
        usePagination({ totalPages: 10, initialCursor: 5 })
      );

      act(() => {
        result.current.setCursor(1);
      });

      expect(result.current.cursor).toBe(1);
    });

    it('should not set the hooks cursor if the given value is above the total pages', () => {
      const { result } = renderHook(() => usePagination({ totalPages: 10 }));

      act(() => {
        result.current.setCursor(15);
      });

      expect(result.current.cursor).toEqual(0);
    });

    it('should not set the hooks cursor if the given value is lower than 0', () => {
      const { result } = renderHook(() => usePagination({ totalPages: 10 }));

      act(() => {
        result.current.setCursor(-3);
      });

      expect(result.current.cursor).toEqual(0);
    });
  });

  describe('go next', () => {
    it('should go to next', async () => {
      const { result } = renderHook(() =>
        usePagination({ totalPages: 10, initialCursor: 9 })
      );

      act(() => {
        result.current.goNext();
      });

      expect(result.current.cursor).toBe(10);
    });

    it('should not go next if cursor is equal to totalPages', async () => {
      const { result } = renderHook(() =>
        usePagination({ totalPages: 10, initialCursor: 10 })
      );

      act(() => {
        result.current.goNext();
      });

      expect(result.current.cursor).toBe(10);
    });
  });
  describe('goPref method', () => {
    it('should go to previous page if bigger than 1', async () => {
      const { result } = renderHook(() =>
        usePagination({ totalPages: 10, initialCursor: 5 })
      );

      act(() => {
        result.current.goPrev();
      });

      expect(result.current.cursor).toBe(4);
    });
  });

  describe('onChange callback handler', () => {
    it('should be invoked when the cursor changes by setCursor method', () => {
      const onChangeSpy = jest.fn();
      const { result } = renderHook(() =>
        usePagination({ totalPages: 5, onChange: onChangeSpy })
      );

      act(() => {
        result.current.setCursor(3);
      });

      expect(onChangeSpy).toHaveBeenCalledWith(3);
    });

    it('should not be invoked when the hook is initialized', () => {
      const onChangeSpy = jest.fn();
      renderHook(() => usePagination({ totalPages: 5, onChange: onChangeSpy }));

      expect(onChangeSpy).not.toHaveBeenCalled();
    });
  });
});
