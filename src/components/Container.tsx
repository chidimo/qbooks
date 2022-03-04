import {Outlet} from 'react-router-dom';

import styles from './container.module.scss';
import {Navbar} from './Navbar';

export const Container = () => {
  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <Outlet />
      </div>
    </>
  );
};
