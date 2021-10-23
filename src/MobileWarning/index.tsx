import React, { useState, useEffect } from 'react';
import { Modal } from 'antd';
import styles from './styles.css';
// @ts-ignore
import Warning from '../assets/warning.png';


type Props = {
    setShowMobileWarning: (val: boolean) => void;
}

export const MobileWarning = ({setShowMobileWarning = () => {}}: Props) => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    setShowMobileWarning(false);
    sessionStorage.setItem('isNewSession', 'true');
  };

  useEffect (() => {
    showModal();
  }, [])

  return (
      <div className = {styles.container}>
      <Modal 
      keyboard={true} 
      visible={isModalVisible} 
      closable={false} 
      onOk={handleOk}
      okText='Continue'
      okType={'danger'}       
      cancelButtonProps={{ style: { display: 'none' } }}>
          <div className={styles.header}>
          <img
           src={Warning} 
           className = {styles.warning} 
           alt="warning sign" />
          </div>
        <p className = {styles.text}>CodingBlindspots is not optimized for mobile. Reviewing code on mobile is tough. Are you sure you want to proceed?</p>

      </Modal> 
      </div>
  );
};

