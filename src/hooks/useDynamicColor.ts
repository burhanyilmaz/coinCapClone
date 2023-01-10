import { useEffect, useRef, useState } from 'react';

export const useDynamicColor = ({
  value,
  currentColor,
  positiveColor,
  negativeColor,
}: {
  value: string | number;
  currentColor: string;
  positiveColor: string;
  negativeColor: string;
}) => {
  const previousValue = useRef<number | null>(null);
  const [color, setColor] = useState(currentColor);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (previousValue.current !== Number(value) && previousValue.current) {
      setColor(Number(value) > previousValue.current ? positiveColor : negativeColor);
      timeout = setTimeout(() => {
        setColor(currentColor);
      }, 300);
    }
    previousValue.current = Number(value);

    return () => clearTimeout(timeout);
  }, [Number(value)]);

  return color;
};
