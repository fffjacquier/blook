'use client';

import { DARK_COLORS, LIGHT_COLORS } from '@/constants';
import Cookie from 'js-cookie';
import React, { CSSProperties } from 'react';
import styles from './icons.module.css';

function DarkModeToggle({ initialTheme }: { initialTheme: string }) {
  const [theme, setTheme] = React.useState(initialTheme);

  const toggleMode = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';

    setTheme(nextTheme);
    Cookie.set('theme', nextTheme, {
      expires: 100,
    });

    const root = document.documentElement;
    const colors =
      nextTheme === 'light'
        ? (LIGHT_COLORS as CSSProperties)
        : (DARK_COLORS as CSSProperties);
    root.setAttribute('data-theme', nextTheme);

    Object.entries(colors).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });
  };

  return (
    <button onClick={toggleMode} className={styles.btn}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="24"
        viewBox="0 -960 960 960"
        width="24"
      >
        <path d="M480-120q-150 0-255-105T120-480q0-150 105-255t255-105q14 0 27.5 1t26.5 3q-41 29-65.5 75.5T444-660q0 90 63 153t153 63q55 0 101-24.5t75-65.5q2 13 3 26.5t1 27.5q0 150-105 255T480-120Zm0-80q88 0 158-48.5T740-375q-20 5-40 8t-40 3q-123 0-209.5-86.5T364-660q0-20 3-40t8-40q-78 32-126.5 102T200-480q0 116 82 198t198 82Zm-10-270Z" />
      </svg>
    </button>
  );
}

export default DarkModeToggle;
