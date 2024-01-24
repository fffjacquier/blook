'use client';
import React from 'react';
import Cookies from 'js-cookie';

import styles from './DarkLightToggle.module.css';
import { DARK_COLORS, LIGHT_COLORS, THEME_DARK, THEME_LIGHT } from '@/constants';
import { Moon, Sun } from 'react-feather';

function DarkLightToggle({ initialTheme }: { initialTheme: string }) {
  const [theme, setTheme] = React.useState(initialTheme);

  const handleClick = () => {
    const nextTheme = theme === THEME_LIGHT ? THEME_DARK : THEME_LIGHT;

    setTheme(nextTheme);

    Cookies.set('theme', nextTheme, {
      expires: 28
    });

    const root = document.documentElement;
    const colors = nextTheme === THEME_LIGHT ? LIGHT_COLORS : DARK_COLORS;

    root.setAttribute('data-theme', nextTheme);
    Object.entries(colors).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });
  }

  return (
    <button className={styles.btn} onClick={handleClick}>
      {theme === THEME_LIGHT ?
        <Sun fill='var(--color-text)' />
        :
        <Moon color='var(--color-text)' />
      }

    </button>
  )
}

export default DarkLightToggle;
