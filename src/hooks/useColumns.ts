import { useEffect, useState } from 'react';

const BREAKPOINTS: Array<[number, number]> = [
  [1200, 7],
  [1040, 6],
  [880, 5],
  [700, 4],
  [540, 3],
  [0, 2],
];

function columnsFor(width: number): number {
  for (const [min, cols] of BREAKPOINTS) {
    if (width >= min) return cols;
  }
  return 2;
}

/** Number of cards shown per row, responsive to the viewport width. */
export function useColumns(): number {
  const [cols, setCols] = useState(() =>
    typeof window === 'undefined' ? 7 : columnsFor(window.innerWidth)
  );

  useEffect(() => {
    const onResize = () => setCols(columnsFor(window.innerWidth));
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return cols;
}
