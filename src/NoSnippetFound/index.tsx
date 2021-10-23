import React from 'react';
import styles from './styles.css';

  console.log("inside src/NoSnippetFound/index.tsx");
const NoSnippetFound = () => (
  <div className={styles.container}>
    <b>Sorry, this snippet doesn't seem to exist.</b>
    <br />
    <br />
    If you just created this snippet, try visiting this page again in a few
    minutes. Meanwhile, you can visit http://localhost:8080/public to see browse through all code reviews and become better at interviewing.
  </div>
);

export default NoSnippetFound;
