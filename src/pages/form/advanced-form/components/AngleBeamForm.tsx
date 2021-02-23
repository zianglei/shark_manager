import { InputNumber, Table, message, Select } from 'antd';
import React, { FC, useState } from 'react';

import styles from '../style.less';

const { Option } = Select;

interface AngleBeamFormDateType {
  key: string;
  sendAngle: string;
  sendBeam: string;
  recvAngle: string;
  recvBeam: string;
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
  const [data, setData] = useState(value);

  const getRowByKey = (key: string, newData?: AngleBeamFormDateType[]) =>
    (newData || data)?.filter((item) => item.key === key)[0];

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
    const newData = [...(data as AngleBeamFormDateType[])];
    const target = getRowByKey(key, newData);
    if (target) {
      target[fieldName] = e;
      setData(newData);
    }
  };

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
      title: '节点编号',
      dataIndex: 'nodeIndex',
      key: 'nodeIndex',
      width: '10%',
      render: (text: string, record: AngleBeamFormDateType) => {
        return text;
      },
    },
    {
      title: '发送角度',
      dataIndex: 'senderAngle',
      key: 'senderAngle',
      width: '20%',
      render: (text: string, record: AngleBeamFormDateType) => {
          return (
            <InputNumber step={0.5} max={60} min={-60}
            onChange={(e) => handleFieldChange(e, 'sendAngle', record.key)}
            style={{ width: '80%' }}/>
          );
      },
    },
    {
      title: '发送波束',
      dataIndex: 'senderBeam',
      key: 'senderBeam',
      width: '20%',
      render: (text: string, record: AngleBeamFormDateType) => {
        return (
          <Select 
            style={{ width: '80%' }}
            onSelect={(e, option) => handleFieldChange(e, 'sendBeam', record.key)}>
            <Option value={1}>00</Option>
            <Option value={2}>01</Option>
            <Option value={3}>10</Option>
            <Option value={4}>11</Option>
          </Select>
        );
      },
    },
    {
        title: '接收角度',
        dataIndex: 'receiverAngle',
        key: 'receiverAngle',
        width: '20%',
        render: (text: string, record: AngleBeamFormDateType) => {
            return (
                <InputNumber step={0.5} max={60} min={-60}
                onChange={(value)=>{handleFieldChange(value, 'recvAngle', record.key)}}
                style={{ width: '80%' }}/>
              );
        },
      },
      {
        title: '接收波束',
        dataIndex: 'receiverBeam',
        key: 'receiverBeam',
        width: '20%',
        render: (text: string, record: AngleBeamFormDateType) => {
          return (
            <Select 
              style={{ width: '80%' }}
              onSelect={(e, option) => handleFieldChange(e, 'recvBeam', record.key)}>
              <Option value={1}>00</Option>
              <Option value={2}>01</Option>
              <Option value={3}>10</Option>
              <Option value={4}>11</Option>
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
        dataSource={data}
        pagination={false}
        rowClassName={(record) => (record.editable ? styles.editable : '')}
      />
    </>
  );
};

export default AngleBeamForm;
