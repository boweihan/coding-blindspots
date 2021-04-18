import React from 'react';
import GridLoader from 'react-spinners/GridLoader';
import styles from './styles.css';

interface PageLoadProps {
  text: string;
}

const PageLoad = ({ text }: PageLoadProps) => (
  <div className={styles.loaderContainer}>
    <GridLoader size={8} margin={3} />
    <p className={styles.loaderText}>{text}</p>
  </div>
);

export default PageLoad;
