import React from 'react';
import styles from './styles.css';

console.log("inside src/AppFooter/index.tsx");
const AppFooter = () => (
  <div className={styles.footer}>
    <div className={styles.footerColumn}>
      <div className={styles.secondaryHeading}>Learn more</div>
      <ul className={styles.footerList}>
        <li>
          <a href="/about">About</a>
        </li>
        <li>
          <a href="/about">Blog</a>
        </li>
        <li>
          <a href="/about">Team</a>
        </li>
        <li>
          <a href="/about">Interview</a>
        </li>
        <li>
          <a href="/about">Resources</a>
        </li>
      </ul>
    </div>

    <div className={styles.footerColumn}>
      <div className={styles.secondaryHeading}>Featured</div>
      <ul className={styles.footerList}>
        <li>
          <a href="/public">Reviewers</a>
        </li>
        <li>
          <a href="/public">Reviews</a>
        </li>
      </ul>
    </div>

    Coding Blindspots &copy; 2021
  </div>
);

export default AppFooter;
