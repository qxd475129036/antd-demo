'use client';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { Button, Form, Input, Card, message } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';

export default function LoginPage() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: any) => {
    setLoading(true);
    try {
      const result = await signIn('credentials', {
        username: values.username,
        password: values.password,
        redirect: false,
      });

      if (result?.error) {
        message.error('メールアドレスまたはパスワードが正しくありません');
      } else {
        message.success('ログイン成功');
        window.location.href = '/';
      }
    } catch (error) {
      message.error('ログイン中にエラーが発生しました');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card title="RABBIT 請求システム" className="w-96">
        <Form name="loginForm" onFinish={handleSubmit} layout="vertical">
          <Form.Item
            name="username"
            label="ユーザー名"
            rules={[{ required: true, message: '有効なメールアドレスを入力してください' }]}
          >
            <Input prefix={<UserOutlined />} placeholder="admin@example.com" />
          </Form.Item>

          <Form.Item
            name="password"
            label="パスワード"
            rules={[{ required: true, message: 'パスワードを入力してください' }]}
          >
            <Input prefix={<LockOutlined />} type="password" placeholder="password" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block>
              ログイン
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}