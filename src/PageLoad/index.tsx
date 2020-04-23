import React from 'react';
import HashLoader from 'react-spinners/HashLoader';
import styles from './styles.css';

interface PageLoadProps {
  text: string;
}

const PageLoad = ({ text }: PageLoadProps) => (
  <div className={styles.loaderContainer}>
    <HashLoader size={100} />
    <p className={styles.loaderText}>{text}</p>
  </div>
);

export default PageLoad;
