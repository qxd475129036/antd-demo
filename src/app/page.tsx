
import React from 'react';
import { auth } from "@/auth";
import { redirect } from 'next/navigation';
import { Layout, Breadcrumb, theme } from 'antd';
const { Content } = Layout;


const Page: React.FC = async () => {

  const session = await auth();

  if (!session) {
    redirect('/login');
  }
  
  return (
    <div className='!px-12 '>
        <Breadcrumb
        className="!my-4"
        separator=">"
        items={[
          {
            title: 'Dashboard'
          }
        ]}
      />
        <div className="!p-4 !bg-white !rounded-md !min-h-[calc(100vh-120px)]">
          Content
        </div>
      </div>
  );
};

export default Page;