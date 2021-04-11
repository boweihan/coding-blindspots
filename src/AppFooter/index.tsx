import React from 'react';
import styles from './styles.css';

const AppFooter = () => (
  <div className={styles.footer}>
    <div className={styles.footerColumn}>
      <div>Learn more</div>
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
      <div>Featured</div>
      <ul className={styles.footerList}>
        <li>
          <a href="/public">Reviewers</a>
        </li>
        <li>
          <a href="/public">Reviews</a>
        </li>
      </ul>
    </div>

    &copy; 2021 Coding Blindspots
  </div>
);

export default AppFooter;
