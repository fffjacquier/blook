import { useContainerDimensions, useMousePosition } from '@/utils/hooks';
import styles from './HueWheel.module.css';
import { useEffect, useRef, useState } from 'react';

type HueWheelProps = {
  hue: number;
  handleForm: (event: any) => void;
};

export default function HueWheel({ hue, handleForm }: HueWheelProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [mouse] = useMousePosition(ref);
  const { width, height } = useContainerDimensions(ref);
  // console.log({ width, height });
  const centerX = width / 2;
  const centerY = height / 2;
  const [btnDragged, setBtnDragged] = useState(false);

  useEffect(() => {
    if (!btnDragged) {
      return;
    }
  }, [btnDragged]);

  return (
    <div className={styles.hueWrapper} ref={ref}>
      <div className={styles.hue}></div>
      <div className={styles.hueValue}>
        <label htmlFor="hue">Hue</label>
        <input
          type="range"
          min={0}
          max={360}
          id="hue"
          value={hue}
          onChange={handleForm}
        />
        {hue}
      </div>
      <button
        style={
          {
            '--x': '125px',
            '--y': '15px',
            '--rotation': '0deg',
          } as React.CSSProperties
        }
        onMouseDown={() => setBtnDragged(true)}
      ></button>
    </div>
  );
}
