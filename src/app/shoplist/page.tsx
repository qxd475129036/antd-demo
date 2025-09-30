"use client";
import React, { useState } from 'react';
import { redirect } from 'next/navigation';
import { DownOutlined } from '@ant-design/icons';
import type { AutoCompleteProps, GetProp, RadioChangeEvent, TableProps } from 'antd';
import { AutoComplete, Form, Radio, Space, Switch, Table, Button, Input,Select, Flex } from 'antd';
import { SearchOutlined, CloseSquareFilled } from '@ant-design/icons';


type SizeType = TableProps['size'];
type ColumnsType<T extends object> = GetProp<TableProps<T>, 'columns'>;
type TablePagination<T extends object> = NonNullable<Exclude<TableProps<T>['pagination'], boolean>>;
type TablePaginationPosition = NonNullable<TablePagination<any>['position']>[number];
type ExpandableConfig<T extends object> = TableProps<T>['expandable'];
type TableRowSelection<T extends object> = TableProps<T>['rowSelection'];


interface DataType {
  key: number;
  name: string;
  age: number;
  address: string;
  description: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Age',
    dataIndex: 'age',
    sorter: (a, b) => a.age - b.age,
  },
  {
    title: 'Address',
    dataIndex: 'address',
    filters: [
      {
        text: 'London',
        value: 'London',
      },
      {
        text: 'New York',
        value: 'New York',
      },
    ],
    onFilter: (value, record) => record.address.indexOf(value as string) === 0,
  },
  {
    title: 'Action',
    key: 'action',
    sorter: true,
    render: () => (
      <Space size="middle">
        <a>Delete</a>
        <a>
          <Space>
            More actions
            <DownOutlined />
          </Space>
        </a>
      </Space>
    ),
  },
];

const data = Array.from({ length: 20 }).map<DataType>((_, i) => ({
  key: i,
  name: 'John Brown',
  age: Number(`${i}2`),
  address: `New York No. ${i} Lake Park`,
  description: `My name is John Brown, I am ${i}2 years old, living in New York No. ${i} Lake Park.`,
}));

const defaultExpandable: ExpandableConfig<DataType> = {
  expandedRowRender: (record: DataType) => <p>{record.description}</p>,
};

const defaultTitle = () => {

  const [form] = Form.useForm();

  const [formLayout, setFormLayout] = useState<LayoutType>('horizontal');

  const onFormLayoutChange = ({ layout }: { layout: LayoutType }) => {
    setFormLayout(layout);
  };

  const mockVal = (str: string, repeat = 1) => ({
    value: str.repeat(repeat),
  });
  const [options, setOptions] = useState<AutoCompleteProps['options']>([]);
  const getPanelValue = (searchText: string) =>
      !searchText ? [] : [mockVal(searchText), mockVal(searchText, 2), mockVal(searchText, 3)];

  return (
  <Form
      layout="inline"
      form={form}
      initialValues={{ layout: 'inline' }}
      onValuesChange={onFormLayoutChange}
      size={"default" as FormSizeType}
      className="flex gap-2"
    >

      <Form.Item
        label="入力検索条件"
        name="searchCondition"
        rules={[{ max: 255, message: '最大255文字まで入力可能です' }]}
      >
        <Space.Compact >
          <AutoComplete
            options={options}
            style={{ width: 240 }}
            onSearch={(text) => setOptions(getPanelValue(text))}
            placeholder="店舗コード、会社名"
            allowClear={{ clearIcon: <CloseSquareFilled /> }}
          />
        </Space.Compact>
      </Form.Item>
      <Form.Item
        label="LOB区分"
        name="lobCd"
      >
        <Select options={[{label:'全部',value:'0'},{label:'RSL',value:'10'}]} style={{width:120}}/>
      </Form.Item>
      <Form.Item 
        label="サービス利用状態"
        name="serviceCd">
        <Select options={[{label:'全部',value:'0'},{label:'稼働中',value:'8'}]} style={{width:120}}/>
      </Form.Item>
      <Form.Item>
        <Button onClick={()=>form.resetFields()}>クリア</Button>
      </Form.Item>
      <Form.Item>
        <Button type="primary">検索</Button>
      </Form.Item>
    </Form>
    )
  }
;

type LayoutType = Parameters<typeof Form>[0]['layout'];
type FormSizeType = Parameters<typeof Form>[0]['size'];

const Page: React.FC = () => {
  
  const [bordered, setBordered] = useState(true);
  const [loading, setLoading] = useState(false);
  const [size, setSize] = useState<SizeType>('middle');
  const [expandable, setExpandable] = useState<ExpandableConfig<DataType>>(defaultExpandable);
  const [showTitle, setShowTitle] = useState(true);
  const [showHeader, setShowHeader] = useState(true);
  const [hasData, setHasData] = useState(true);
  const [tableLayout, setTableLayout] = useState<string>('unset');
  const [top, setTop] = useState<TablePaginationPosition>('none');
  const [bottom, setBottom] = useState<TablePaginationPosition>('bottomRight');
  const [ellipsis, setEllipsis] = useState(false);
  const [yScroll, setYScroll] = useState(true);
  const [xScroll, setXScroll] = useState<string>('unset');

  const scroll: { x?: number | string; y?: number | string } = {};
  if (yScroll) {
    scroll.y = '100vh';
  }
  if (xScroll !== 'unset') {
    scroll.x = '100vw';
  }

  const tableColumns = columns.map((item) => ({ ...item, ellipsis }));
  if (xScroll === 'fixed') {
    tableColumns[0].fixed = true;
    tableColumns[tableColumns.length - 1].fixed = 'right';
  }

  const tableProps: TableProps<DataType> = {
    bordered,
    loading,
    size,
    expandable,
    title: showTitle ? defaultTitle : undefined,
    showHeader,
    scroll,
    tableLayout: tableLayout === 'unset' ? undefined : (tableLayout as TableProps['tableLayout']),
  };
  return (
    <>
    <div className="!p-4 !bg-white !rounded-md !min-h-[calc(100vh-220px)]">
      <Table<DataType>
        {...tableProps}
        pagination={{ position: [top, bottom] }}
        columns={tableColumns}
        dataSource={hasData ? data : []}
        scroll={scroll}
      />
        </div>
    </>
  );
};

export default Page;