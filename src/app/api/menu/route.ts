import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    // 读取mock文件夹中的菜单数据
    const filePath = path.join(process.cwd(), 'mock', 'menu.json');
    const jsonData = fs.readFileSync(filePath, 'utf8');
    const menuItems = JSON.parse(jsonData);

    return NextResponse.json(menuItems);
  } catch (error) {
    console.error('Error reading menu data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch menu items' },
      { status: 500 }
    );
  }
}