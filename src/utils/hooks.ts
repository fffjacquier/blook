import { RefObject, useEffect, useLayoutEffect, useRef, useState } from 'react';

export type MousePosition = {
  x: number;
  y: number;
  elementX: number;
  elementY: number;
  elementPosX: number;
  elementPosY: number;
};

export const useMousePosition = <T>(
  ref: RefObject<T>,
  initialX = 0,
  initialY = 0
): [MousePosition] => {
  const [state, setState] = useState<MousePosition>({
    x: initialX,
    y: initialY,
    elementX: 0,
    elementY: 0,
    elementPosX: 0,
    elementPosY: 0,
  });

  useLayoutEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      let newState: MousePosition = {
        x: event.pageX,
        y: event.pageY,
        elementX: 0,
        elementY: 0,
        elementPosX: 0,
        elementPosY: 0,
      };

      if (ref.current instanceof HTMLDivElement) {
        const { left, top } = ref.current.getBoundingClientRect();

        const eltPosX = left + window.scrollX;
        const eltPosY = top + window.scrollY;
        const eltX = event.pageX - eltPosX;
        const eltY = event.pageY - eltPosY;
        newState.elementX = eltX;
        newState.elementY = eltY;
        newState.elementPosX = eltPosX;
        newState.elementPosY = eltPosY;

        //console.log(ref.current.getBoundingClientRect());
        //console.log(newState.elementX, newState.elementY);
      }

      setState((s) => {
        return {
          ...s,
          ...newState,
        };
      });
    };
    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [ref]);

  return [state];
};

export const useContainerDimensions = (ref: RefObject<HTMLDivElement>) => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useLayoutEffect(() => {
    const handleResize = () => {
      if (ref.current instanceof HTMLDivElement) {
        setDimensions({
          width: ref.current.offsetWidth || 0,
          height: ref.current.offsetHeight || 0,
        });
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [ref]);

  return dimensions;
};

function useOnClickOutside(ref: RefObject<HTMLElement>, callback: () => void) {
  useEffect(() => {
    function handleClick(event: any) {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    }

    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('click', handleClick);
    };
  }, [ref, callback]);
}
