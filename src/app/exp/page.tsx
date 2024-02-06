'use client';
import { useState } from 'react';
import styles from './page.module.css';
import HueWheel from '@/components/HueWheel/HueWheel';
import SaturationLightness from '@/components/SaturationLightness';

export default function ExperimentPage() {
  const [hue, setHue] = useState(0);
  const [saturation, setSaturation] = useState(100);
  const [lightness, setLightness] = useState(50);

  //const mouse = useMousePosition();

  function handleForm(event: any) {
    const val = event.target.value;

    if (event.target.id === 'hue') {
      setHue(val);
    } else if (event.target.id === 'saturation') {
      setSaturation(val);
    } else if (event.target.id === 'lightness') {
      setLightness(val);
    }
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.row}>
        <p>
          <label htmlFor="saturation">Saturation</label>
          <input
            type="range"
            min={0}
            max={100}
            id="saturation"
            value={saturation}
            onChange={handleForm}
          />
        </p>
        <p>
          <label htmlFor="lightness">Lightness</label>
          <input
            type="range"
            min={0}
            max={100}
            id="lightness"
            value={lightness}
            onChange={handleForm}
          />
        </p>
      </div>

      <div className={styles.row}>
        <SaturationLightness
          hue={hue}
          sat={saturation}
          light={lightness}
          setLight={setLightness}
          setSat={setSaturation}
        />
        <HueWheel hue={hue} handleForm={handleForm} />
      </div>
      <div className={styles.row}>
        <div
          className={styles.box}
          style={{
            backgroundColor: `hsl(${hue || 0}deg ${saturation}% ${lightness}%)`,
          }}
        >
          box
        </div>
        <div className={styles.code}>
          <span>
            {`.box {`}
            <br />
            {`background-color: hsl(${hue || 0}deg ${saturation}% ${lightness}%);`}
            <br />
            {`}`}
          </span>
        </div>
      </div>
    </div>
  );
}
