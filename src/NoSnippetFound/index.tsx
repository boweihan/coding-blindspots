import React from 'react';
import styles from './styles.css';

const NoSnippetFound = () => (
  <div className={styles.container}>
    <b>Sorry, this snippet doesn't seem to exist.</b>
    <br />
    <br />
    If you just created this snippet, try visiting this page again in a few
    minutes.
  </div>
);

export default NoSnippetFound;
