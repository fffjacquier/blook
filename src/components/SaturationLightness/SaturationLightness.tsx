import { CSSProperties, useEffect, useRef, useState } from 'react';
import styles from './SaturationLightness.module.css';
import { useMousePosition } from '@/utils/hooks';

type SatLightProps = {
  hue: number;
  sat: number;
  light: number;
  setSat: (s: number) => void;
  setLight: (l: number) => void;
};

type CustomCSS = CSSProperties & Record<`--${string}`, number | string>;

function SaturationLightness({ hue, sat, light, setSat, setLight }: SatLightProps) {
  const [btnDragged, setBtnDragged] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);

  const [mouse] = useMousePosition<HTMLButtonElement>(btnRef);

  useEffect(() => {
    if (!btnDragged) {
      return;
    }
    console.log(mouse.elementX, mouse.elementY);

    //setSat(() => {});
    //setLight(() => {});
  }, [btnDragged, mouse]);

  useEffect(() => {
    function handleMouseUp() {
      setBtnDragged(false);
    }

    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchend', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseUp);

    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchend', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseUp);
    };
  }, [btnDragged]);

  return (
    <div
      className={styles.hslWrapper}
      style={
        {
          '--hue': `${hue}`,
        } as CustomCSS
      }
    >
      <div className={styles.lightness}></div>
      <div className={styles.saturation}></div>
      <button
        ref={btnRef}
        onMouseDown={() => {
          setBtnDragged(true);
        }}
        style={
          {
            '--x': mouse.elementX,
            '--y': mouse.elementY,
          } as React.CSSProperties
        }
      ></button>
    </div>
  );
}

export default SaturationLightness;
