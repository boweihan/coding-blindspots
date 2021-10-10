import React, { useState, useEffect } from 'react';
import { Tooltip, Button, Input, Modal, message } from 'antd';
import { QuestionCircleTwoTone } from '@ant-design/icons';
import { Editor, EditorOptions, Language } from '../Editor';
import RestClient from '../shared/rest';
import { Snippet } from '../types';
import styles from './styles.css';
import 'antd/es/button/style';
import 'antd/es/input/style';
import 'antd/es/modal/style';
import 'antd/es/message/style';
// @ts-ignore
import Infographic from '../assets/infographic.png';

const About = () => {
console.log("inside src/About/index.tsx");
  return (
    <>
      <div className={styles.container}>
        <img
          className={styles.infographic}
          src={Infographic}
          alt="CodingBlindspots infographic"
        />
      </div>
    </>
  );
};

export default About;
