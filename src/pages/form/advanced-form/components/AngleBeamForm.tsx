import { InputNumber, Table, message, Select } from 'antd';
import React, { FC, useState } from 'react';

import styles from '../style.less';

const { Option } = Select;

interface AngleBeamFormDateType {
  key: string;
  sendAngle: number;
  sendBeam: number;
  recvAngle: number;
  recvBeam: number;
}
interface AngleBeamFormProps {
  value?: AngleBeamFormDateType[];
  onChange?: (value: AngleBeamFormDateType[]) => void;
}

const AngleBeamForm: FC<AngleBeamFormProps> = ({ value, onChange }) => {
  // const [clickedCancel, setClickedCancel] = useState(false);
  // const [loading, setLoading] = useState(false);
  // const [index, setIndex] = useState(0);
  // const [cacheOriginData, setCacheOriginData] = useState({});

  const getRowByKey = (key: string, newData?: AngleBeamFormDateType[]) =>
    (newData || value)?.filter((item) => item.key === key)[0];

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

  const handleFieldChange = (
    e: string | number | LabeledValue,
    fieldName: string,
    key: string,
  ) => {
    const newData = [...(value as AngleBeamFormDateType[])];
    const target = getRowByKey(key, newData);
    if (target) {
      target[fieldName] = e;
      if (onChange) {
          onChange(newData);
      }
    }
  };

  const columns = [
    {
      title: '节点编号',
      dataIndex: 'key',
      key: 'nodeIndex',
      width: '10%',
      render: (text: string, record: AngleBeamFormDateType) => {
        return text;
      },
    },
    {
      title: '发送角度',
      dataIndex: 'sendAngle',
      key: 'sendAngle',
      width: '20%',
      render: (text: string, record: AngleBeamFormDateType) => {
          return (
            <InputNumber step={0.5} max={60} min={-60}
            value={record.sendAngle}
            onChange={(e) => handleFieldChange(e, 'sendAngle', record.key)}
            style={{ width: '80%' }}/>
          );
      },
    },
    {
      title: '发送波束',
      dataIndex: 'sendBeam',
      key: 'senderBeam',
      width: '20%',
      render: (text: string, record: AngleBeamFormDateType) => {
        return (
          <Select 
            style={{ width: '80%' }}
            value={record.sendBeam}
            onSelect={(e, option) => handleFieldChange(e, 'sendBeam', record.key)}>
            <Option value={0}>00</Option>
            <Option value={1}>01</Option>
            <Option value={2}>10</Option>
            <Option value={3}>11</Option>
          </Select>
        );
      },
    },
    {
        title: '接收角度',
        dataIndex: 'recvAngle',
        key: 'recvAngle',
        width: '20%',
        render: (text: string, record: AngleBeamFormDateType) => {
            return (
                <InputNumber step={0.5} max={60} min={-60}
                value={record.recvAngle}
                onChange={(value)=>{handleFieldChange(value, 'recvAngle', record.key)}}
                style={{ width: '80%' }}/>
              );
        },
      },
      {
        title: '接收波束',
        dataIndex: 'recvBeam',
        key: 'recvBeam',
        width: '20%',
        render: (text: string, record: AngleBeamFormDateType) => {
          return (
            <Select 
              style={{ width: '80%' }}
              value={record.recvBeam}
              onSelect={(e, option) => handleFieldChange(e, 'recvBeam', record.key)}>
              <Option value={0}>00</Option>
              <Option value={1}>01</Option>
              <Option value={2}>10</Option>
              <Option value={3}>11</Option>
            </Select>
          );
        },
      },
  ];

  return (
    <>
      <Table<AngleBeamFormDateType>
        // loading={loading}
        columns={columns}
        dataSource={value}
        pagination={false}
        rowClassName={(record) => (record.editable ? styles.editable : '')}
      />
    </>
  );
};

export default AngleBeamForm;
