
import { auth } from "@/auth";
import { redirect } from 'next/navigation';
import { Breadcrumb, theme } from 'antd';
export default async function Layout({ children }: { children: React.ReactNode }) {


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
            title: 'マスター'
          },
          {
            title: '店舗管理',
          }
        ]}
      />
      {children}  
      </div>
  );
}
