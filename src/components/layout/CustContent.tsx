"use client";

import { Layout } from 'antd';
import React from 'react';

const { Content } = Layout;

const CustContent: React.FC<{ children: React.ReactNode }> = ({ children }) => {

  return (
    <Content >
      {children}
    </Content>
  );
};

export default CustContent;