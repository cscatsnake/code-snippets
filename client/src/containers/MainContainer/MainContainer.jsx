import React from 'react';
import Sidebar from '../Sidebar/Sidebar.jsx';
import styles from './MainContainer.module.scss';

const MainContainer = () => {
  return (
    <div className={styles.container}>
      <Sidebar />
    </div>
  );
};

export default MainContainer;
