import React from 'react';
import styles from './DarkModeToggler.module.scss';
import moon from '../../assets/moon.svg';
import sun from '../../assets/sun.svg';

const DarkModeToggler = () => {
  const handleToggle = () => {
    console.log('toggled');
  };

  return (
    <div className={styles.darkModeContainer}>
      <p>Light</p>
      <label className={styles.switch}>
        <input type='checkbox' onChange={handleToggle} />
        <span className={styles.slider}>
          <img src={sun} className={styles.sun} alt='sun' />
          <img src={moon} className={styles.moon} alt='moon' />
        </span>
      </label>
      <p>Dark</p>
    </div>
  );
};

export default DarkModeToggler;
