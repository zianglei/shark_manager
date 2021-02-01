import { PlusOutlined } from '@ant-design/icons';
import { Button, Divider, Input, Popconfirm, Table, message, Select } from 'antd';
import React, { FC, useState } from 'react';

import styles from '../style.less';

const { Option } = Select;

interface TableFormDateType {
  key: string;
  workId?: string;
  name?: string;
  department?: string;
  isNew?: boolean;
  editable?: boolean;
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
  const [data, setData] = useState(value);

  // const getRowByKey = (key: string, newData?: TableFormDateType[]) =>
  //   (newData || data)?.filter((item) => item.key === key)[0];

  // const toggleEditable = (e: React.MouseEvent | React.KeyboardEvent, key: string) => {
  //   e.preventDefault();
  //   const newData = data?.map((item) => ({ ...item }));
  //   const target = getRowByKey(key, newData);
  //   if (target) {
  //     // 进入编辑状态时保存原始数据
  //     if (!target.editable) {
  //       cacheOriginData[key] = { ...target };
  //       setCacheOriginData(cacheOriginData);
  //     }
  //     target.editable = !target.editable;
  //     setData(newData);
  //   }
  // };
  // const newMember = () => {
  //   const newData = data?.map((item) => ({ ...item })) || [];

  //   newData.push({
  //     key: `NEW_TEMP_ID_${index}`,
  //     workId: '',
  //     name: '',
  //     department: '',
  //     editable: true,
  //     isNew: true,
  //   });

  //   setIndex(index + 1);
  //   setData(newData);
  // };

  // const remove = (key: string) => {
  //   const newData = data?.filter((item) => item.key !== key) as TableFormDateType[];
  //   setData(newData);
  //   if (onChange) {
  //     onChange(newData);
  //   }
  // };

  // const handleFieldChange = (
  //   e: React.ChangeEvent<HTMLInputElement>,
  //   fieldName: string,
  //   key: string,
  // ) => {
  //   const newData = [...(data as TableFormDateType[])];
  //   const target = getRowByKey(key, newData);
  //   if (target) {
  //     target[fieldName] = e.target.value;
  //     setData(newData);
  //   }
  // };

  // const saveRow = (e: React.MouseEvent | React.KeyboardEvent, key: string) => {
  //   e.persist();
  //   setLoading(true);
  //   setTimeout(() => {
  //     if (clickedCancel) {
  //       setClickedCancel(false);
  //       return;
  //     }
  //     const target = getRowByKey(key) || ({} as any);
  //     if (!target.workId || !target.name || !target.department) {
  //       message.error('请填写完整成员信息。');
  //       (e.target as HTMLInputElement).focus();
  //       setLoading(false);
  //       return;
  //     }
  //     delete target.isNew;
  //     toggleEditable(e, key);
  //     if (onChange) {
  //       onChange(data as TableFormDateType[]);
  //     }
  //     setLoading(false);
  //   }, 500);
  // };

  // const handleKeyPress = (e: React.KeyboardEvent, key: string) => {
  //   if (e.key === 'Enter') {
  //     saveRow(e, key);
  //   }
  // };

  // const cancel = (e: React.MouseEvent, key: string) => {
  //   setClickedCancel(true);
  //   e.preventDefault();
  //   const newData = [...(data as TableFormDateType[])];
  //   // 编辑前的原始数据
  //   let cacheData = [];
  //   cacheData = newData.map((item) => {
  //     if (item.key === key) {
  //       if (cacheOriginData[key]) {
  //         const originItem = {
  //           ...item,
  //           ...cacheOriginData[key],
  //           editable: false,
  //         };
  //         delete cacheOriginData[key];
  //         setCacheOriginData(cacheOriginData);
  //         return originItem;
  //       }
  //     }
  //     return item;
  //   });
  //   setData(cacheData);
  //   setClickedCancel(false);
  // };

  const columns = [
    {
      title: '时隙编号',
      dataIndex: 'slotIndex',
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
            <Select style={{ width: '80%' }}>
              <Option value="1">节点1</Option>
              <Option value="2">节点2</Option>
              <Option value="3">节点3</Option>
            </Select>
            // <Input
            //   value={text}
            //   onChange={(e) => handleFieldChange(e, 'workId', record.key)}
            //   onKeyPress={(e) => handleKeyPress(e, record.key)}
            //   placeholder="工号"
            // />
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
          <Select style={{ width: '80%' }}>
            <Option value="1">节点1</Option>
            <Option value="2">节点2</Option>
            <Option value="3">节点3</Option>
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
        dataSource={data}
        pagination={false}
        rowClassName={(record) => (record.editable ? styles.editable : '')}
      />
    </>
  );
};

export default TableForm;
