import React from 'react';
import { TailSpin } from 'react-loader-spinner';

import styles from './Loader.module.css'

export const Loader = () => {
  return (
    <div className={styles.loader_wrapper}>
    <TailSpin
      visible={true}
      height="80"
      width="80"
      color="#e44848"
      ariaLabel="tail-spin-loading"
      radius="1"
      wrapperStyle={{}}
      wrapperClass=""
  />
    </div>
  );
};


