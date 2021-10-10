import React from 'react';
import { Row, Col } from 'antd';
import LoginForm from './Forms/LoginForm';
import SignupForm from './Forms/SignupForm';
import styles from './styles.css';

const Login = () => {

  return (
    <div className={styles.container}>
      <Row justify="space-between">
        <Col span={10}>
          <LoginForm />
        </Col>
        <Col span={10}>
          <SignupForm />
        </Col>
      </Row>
    </div>
  );
};

export default Login;
