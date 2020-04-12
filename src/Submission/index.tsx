import React from 'react';
import { Tooltip } from 'antd';
import { QuestionCircleTwoTone } from '@ant-design/icons';
import Ace from '../Ace';
import styles from './styles.css';

const Submission = () => (
  <div className={styles.container}>
    <h2 className={styles.heading}>
      Submit Question and Code
      <Tooltip
        title="
        In order for us to give you feedback on your code, please ensure that you submit the complete
        question along with your solution. Submissions with inadequate context will be ignored.
        "
      >
        <QuestionCircleTwoTone className={styles.tooltip} />
      </Tooltip>
    </h2>
    <Ace />
  </div>
);

export default Submission;
