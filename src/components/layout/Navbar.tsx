"use client";

import { Layout, Menu, Spin, Divider, Dropdown, Avatar } from 'antd';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
// 导入Ant Design图标
import {
  HomeOutlined, DatabaseOutlined, FileTextOutlined, CreditCardOutlined, CheckCircleOutlined,
  UserOutlined, TagOutlined, CiOutlined, PlusOutlined, LogoutOutlined,
 ShopOutlined, TeamOutlined, TableOutlined, FormOutlined, EditOutlined,
 PrinterOutlined, CalculatorOutlined, DownloadOutlined, TruckOutlined,
 ImportOutlined, SearchOutlined, HistoryOutlined, CalendarOutlined
} from '@ant-design/icons';

import { signOut } from 'next-auth/react';
import { getSession } from 'next-auth/react';

const { Header } = Layout;

// 扩展菜单接口，支持图标和分隔符类型
interface MenuItem {
  key: string;
  label: string;
  path?: string;
  icon?: string; // 图标名称
  type?: 'divider' | 'group'; // 支持分隔符类型
  children?: MenuItem[];
}

// 图标映射表
const IconMap: Record<string, React.ReactNode> = {
  home: <HomeOutlined className="!text-blue-600" />,
  database: <DatabaseOutlined className="!text-blue-600" />,
  fileText: <FileTextOutlined className="!text-blue-600" />,
  creditCard: <CreditCardOutlined className="!text-blue-600" />,
  checkCircle: <CheckCircleOutlined className="!text-blue-600" />,
  user: <UserOutlined className="!text-blue-600" />,
  tag: <TagOutlined className="!text-blue-600" />,
  ci: <CiOutlined className="!text-blue-600" />,
  list: <CiOutlined className="!text-blue-600" />,
  plus: <PlusOutlined className="!text-blue-600" />,
shop: <ShopOutlined className="!text-blue-600" />,
team: <TeamOutlined className="!text-blue-600" />,
table: <TableOutlined className="!text-blue-600" />,
form: <FormOutlined className="!text-blue-600" />,
edit: <EditOutlined className="!text-blue-600" />,
printer: <PrinterOutlined className="!text-blue-600" />,
calculator: <CalculatorOutlined className="!text-blue-600" />,
download: <DownloadOutlined className="!text-blue-600" />,
truck: <TruckOutlined className="!text-blue-600" />,
import: <ImportOutlined className="!text-blue-600" />,
search: <SearchOutlined className="!text-blue-600" />,
history: <HistoryOutlined className="!text-blue-600" />,
 calendar: <CalendarOutlined className="!text-blue-600" />
};


// 扩展菜单接口，支持图标和分隔符类型
interface MenuItem {
  key: string;
  label: string;
  path?: string;
  icon?: string; // 图标名称
  type?: 'divider' | 'group'; // 支持分隔符类型
  children?: MenuItem[];
}

const Navbar: React.FC = () => {

  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  // 由于 await 不能在组件顶层使用，需要调整代码逻辑，假设 auth 是异步函数
  // 这里先定义 session 状态，在 useEffect 中获取 session
  const [session, setSession] = useState<any>(null);


  useEffect(() => {
    const fetchSession = async () => {
      try {
        // 假设 auth 函数存在
        // 由于 auth 未定义，推测可能是要使用 next-auth 的 getSession
        const authSession = await getSession();
        setSession(authSession);
      } catch (error) {
        console.error('获取 session 失败:', error);
      }
    };
    fetchSession();
  }, []);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await axios.get('/api/menu');
        setMenuItems(response.data);
      } catch (error) {
        console.error('Failed to fetch menu items:', error);
        setMenuItems([
          { key: 'default', label: '菜单加载失败' }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchMenuItems();
  }, []);

  // 递归查找菜单项（支持多级菜单）
  const findMenuItem = (items: MenuItem[], key: string): MenuItem | undefined => {
    for (const item of items) {
      if (item.key === key) {
        return item;
      }
      if (item.children) {
        const found = findMenuItem(item.children, key);
        if (found) return found;
      }
    }
    return undefined;
  };

  const handleMenuClick = (e: { key: string }) => {
    const selectedItem = findMenuItem(menuItems, e.key);
    if (selectedItem?.path) {
      router.push(selectedItem.path);
    }
  };

  // 处理菜单渲染（支持图标和分隔符）
  const renderMenuItems = (items: MenuItem[]): any[] => {
    return items.map(item => {
      // 分隔符项
      if (item.type === 'divider') {
        return {
          type: 'divider',
          // 添加边框图标分隔符
          label: <Divider dashed><TagOutlined style={{ margin: '0 8px' }} /></Divider>
        };
      }

      // 普通菜单项
      return {
        key: item.key,
        label: item.label,
        path: item.path,
        icon: item.icon ? IconMap[item.icon] : null,
        // 递归处理子菜单
        children: item.children ? renderMenuItems(item.children) : undefined
      };
    });
  };

  const items = [
    {
      key: 'profile',
      label: 'プロフィール',
      icon: <UserOutlined />,
    },
    {
      key: 'logout',
      label: 'ログアウト',
      icon: <LogoutOutlined />,
      onClick: () => signOut(),
    },
  ];

  return (
    <Header className="sticky top-0 z-50 w-full !bg-white/60 backdrop-blur-sm shadow-md px-6" >
      <div className="flex justify-between items-center h-full">
        <div className="text-blue-600 text-xl font-bold mr-10">
          RABBIT 請求システム
        </div>
        {loading ? <Spin className="w-200 mx-4" /> : <Menu
          theme="light"
          mode="horizontal"
          items={renderMenuItems(menuItems)}
          className="border-b-0 items-center custom-menu"
          onClick={handleMenuClick}
          style={{ minWidth: 0, flex: "auto" }}
        />}
        {session?.user && (
            <Dropdown menu={{ items }} placement="bottomRight">
              <div className="flex items-center ml-4 cursor-pointer">
                <Avatar icon={<UserOutlined />} />
                <span className="ml-2">{session.user.name}</span>
              </div>
            </Dropdown>
          )}
      </div>
    </Header>
  );
};

export default Navbar;