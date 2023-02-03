import { useState, useEffect, useRef } from 'react';

export const NO_TOTAL_PAGES_ERROR =
  'The UsePagination hook must receive a totalPages argument for it to work';

const usePagination = ({
  totalPages,
  initialCursor,
  onChange,
}: {
  totalPages: number;
  initialCursor?: number;
  onChange?: (cursor: number) => null;
}) => {
  const [cursor, setCursor] = useState(initialCursor || 0);

  const isHookInitialising = useRef(true);

  useEffect(() => {
    if (isHookInitialising.current) {
      isHookInitialising.current = false;
    } else {
      onChange?.(cursor);
    }
  }, [cursor]);

  const goNext = () =>
    setCursor((cursor) => {
      if (cursor < totalPages) return cursor + 1;
      return cursor;
    });

  const goPrev = () =>
    setCursor((cursor) => {
      if (cursor > 1) return cursor - 1;
      return 1;
    });

  const setCursorValidated = (position: number) => {
    if (position < 1 || position > totalPages) return;
    setCursor(position);
  };

  return {
    totalPages,
    cursor,
    goNext,
    goPrev,
    setCursor: setCursorValidated,
  };
};

export default usePagination;

// goNext() method for getting to the next page
// A goPrev() method for getting to the previous page
// A setCursor() method to set the cursor to a specific index
