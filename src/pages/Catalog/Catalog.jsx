import React, { useEffect, useState } from 'react';

import { NavList } from '../../components/NavList/NavList';
import { Filter } from '../../components/Filter/Filter';
import { CardInfo } from '../../components/CardInfo/CardInfo';
import { Loader } from '../../components/Loader/Loader';

import styles from './Catalog.module.css';

const Catalog = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false); 
    }, 800);
  }, []);

  return (
    <div>
      <NavList/> 
      {loading ? (
        <Loader />
      ) : (
      <div className={styles.catalog_wrapper}>
      <Filter/>
      <CardInfo/>
      </div>
    )}
    </div>
  );
};
  
export default Catalog;