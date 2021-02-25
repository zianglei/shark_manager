import { PlusOutlined } from '@ant-design/icons';
import { Button, Divider, Input, Popconfirm, Table, message, Select } from 'antd';
import React, { FC, useState } from 'react';

import styles from '../style.less';

const { Option } = Select;

interface TableFormDateType {
  key: string;
  sender: string;
  receiver: string;
}
interface TableFormProps {
  value?: TableFormDateType[];
  onChange?: (value: TableFormDateType[]) => void;
}

const TableForm: FC<TableFormProps> = ({ value, onChange }) => {
  // const [clickedCancel, setClickedCancel] = useState(false);
  // const [loading, setLoading] = useState(false);
  // const [index, setIndex] = useState(0);
  // const [cacheOriginData, setCacheOriginData] = useState({});

  const getRowByKey = (key: string, newData?: TableFormDateType[]) =>
    (newData || value)?.filter((item) => item.key === key)[0];

  const handleFieldChange = (
    e: string | number,
    fieldName: string,
    key: string,
  ) => {
    const newData = [...(value as TableFormDateType[])];
    const target = getRowByKey(key, newData);
    if (target) {
      target[fieldName] = e;
      if (onChange)
        onChange(newData);  
    }
  };

  const columns = [
    {
      title: '时隙编号',
      dataIndex: 'key',
      key: 'slotIndex',
      width: '10%',
      render: (text: string, record: TableFormDateType) => {
        return text;
      },
    },
    {
      title: '发送节点',
      dataIndex: 'sender',
      key: 'sender',
      width: '20%',
      render: (text: string, record: TableFormDateType) => {
          return (
            <Select style={{ width: '80%' }} 
                    value={record.sender}
                    onSelect={(e, option) => handleFieldChange(e, 'sender', record.key)}>
              <Option value={0}>不发送</Option>
              <Option value={1}>节点1</Option>
              <Option value={2}>节点2</Option>
              <Option value={3}>节点3</Option>
            </Select>
          );
      },
    },
    {
      title: '接收节点',
      dataIndex: 'receiver',
      key: 'receiver',
      width: '20%',
      render: (text: string, record: TableFormDateType) => {
        return (
          <Select 
            style={{ width: '80%' }}
            value={record.receiver}
            onSelect={(e, option) => handleFieldChange(e, 'receiver', record.key)}>
            <Option value={0}>不接收</Option>
            <Option value={1}>节点1</Option>
            <Option value={2}>节点2</Option>
            <Option value={3}>节点3</Option>
          </Select>
        );
      },
    },
  ];

  return (
    <>
      <Table<TableFormDateType>
        // loading={loading}
        columns={columns}
        dataSource={value}
        pagination={false}
        rowClassName={(record) => (record.editable ? styles.editable : '')}
      />
    </>
  );
};

export default TableForm;
