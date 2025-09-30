import React from 'react';
import { Skeleton } from 'antd';

export default function Loading() {
  // Or a custom loading skeleton component
  return (
    <div className='!px-12 '>
        <div className="!p-4 !bg-white !rounded-md !min-h-[calc(100vh-120px)]">
          <Skeleton />
        </div>
      </div>
      )
}