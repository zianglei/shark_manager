import { CloseCircleOutlined } from '@ant-design/icons';
import { Button, Card, Col, DatePicker, Form, Popover, Row, Select, Checkbox,
         InputNumber, Spin} from 'antd';
import React, { FC, useEffect, useState } from 'react';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import { connect, Dispatch } from 'umi';
import TableForm from './components/TableForm';
import AngleBeamForm from './components/AngleBeamForm';

import styles from './style.less';
import { ConfigData } from './model'
import BoardOption from './components/BoardOption';

type InternalNamePath = (string | number)[];

const { Option } = Select;
const { RangePicker } = DatePicker;

const fieldLabels = {
  address: '节点地址',
  mode: '模式',
  role: '角色',
  antennaMode: '天线波束',
  continuousTransceiveEnable: '启用中频连发',
  gpsEnable: '启用秒脉冲同步',
  costasEnable: '启用costa环路',
  impulseEnable: '启用冲激响应',
  bigAntennaEnable: '启用大天线',
  bitErrorEnable: '启用误码率统计',
  checkGPIOEnable: '启用引脚状态检测',
  testPacketNum: '测试报文数量',
  vbandAttenuation: 'V段衰减'

};

const tableData = [
  {
    key: '1',
    slotIndex: '1',
  },
  {
    key: '2',
    slotIndex: '2',
  },
  {
    key: '3',
    slotIndex: '3',
  },
  {
    key: '4',
    slotIndex: '4',
  },
  {
    key: '5',
    slotIndex: '5',
  },
];

const angleBeamData = [
  {
    key: '1',
    nodeIndex: '1',
  },
  {
    key: '2',
    nodeIndex: '2',
  },
  {
    key: '3',
    nodeIndex: '3'
  }
];

interface AdvancedFormProps {
  configForm: ConfigData,
  dispatch: Dispatch<any>;
  getting: boolean;
  submitting: boolean;
}

interface ErrorField {
  name: InternalNamePath;
  errors: string[];
}

const AdvancedForm: FC<AdvancedFormProps> = ({ configForm, submitting, getting, dispatch }) => {
  const [form] = Form.useForm();
  const [error, setError] = useState<ErrorField[]>([]);
  const [role, setRole] = useState(0);
  const {
    address
  } = configForm;

  const getErrorInfo = (errors: ErrorField[]) => {
    const errorCount = errors.filter((item) => item.errors.length > 0).length;
    if (!errors || errorCount === 0) {
      return null;
    }
    const scrollToField = (fieldKey: string) => {
      const labelNode = document.querySelector(`label[for="${fieldKey}"]`);
      if (labelNode) {
        labelNode.scrollIntoView(true);
      }
    };
    const errorList = errors.map((err) => {
      if (!err || err.errors.length === 0) {
        return null;
      }
      const key = err.name[0] as string;
      return (
        <li key={key} className={styles.errorListItem} onClick={() => scrollToField(key)}>
          <CloseCircleOutlined className={styles.errorIcon} />
          <div className={styles.errorMessage}>{err.errors[0]}</div>
          <div className={styles.errorField}>{fieldLabels[key]}</div>
        </li>
      );
    });
    return (
      <span className={styles.errorIcon}>
        <Popover
          title="表单校验信息"
          content={errorList}
          overlayClassName={styles.errorPopover}
          trigger="click"
          getPopupContainer={(trigger: HTMLElement) => {
            if (trigger && trigger.parentNode) {
              return trigger.parentNode as HTMLElement;
            }
            return trigger;
          }}
        >
          <CloseCircleOutlined />
        </Popover>
        {errorCount}
      </span>
    );
  };

  const onFinish = (values: { [key: string]: any }) => {
    setError([]);
    dispatch({
      type: 'configForm/loadConfig',
      payload: values,
    });
    dispatch({
      type: 'configForm/submitConfig',
      payload: values,
    });
  };

  const onFinishFailed = (errorInfo: any) => {
    setError(errorInfo.errorFields);
  };

  const onRoleChange = (value: number) => {
    setRole(value);
  }

  useEffect(() => {
    form.setFieldsValue({
      ...configForm
    })
  });

  return (
    <Form
      form={form}
      layout="vertical"
      hideRequiredMark
      initialValues={{ 
        slots: tableData, 
        angleBeams: angleBeamData,
        bigAntennaEnable: false,  
        costasLoopEnable: true,
        impulseEnable: false,
        bitErrorEnable: false,
        checkGPIOEnable: true,
        continuousTransceiveEnable: false
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <PageContainer content="">
        <Card title="协议栈配置" className={styles.card} bordered={false}>
          <Row gutter={16}>
            <Col lg={{ span: 5}} md={12} sm={24}>
              <Form.Item
                label={fieldLabels.address}
                name="address"
                rules={[{ required: true, message: '请选择节点地址' }]}
              >
                <Select placeholder="请选择节点地址">
                  <Option value={1}>1</Option>
                  <Option value={2}>2</Option>
                  <Option value={3}>3</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xl={{ span: 5, offset: 1 }} lg={{ span: 4 }} md={{ span: 12 }} sm={24}>
              <Form.Item
                label={fieldLabels.mode}
                name="mode"
                rules={[{ required: true, message: '请选择' }]}
              >
                <Select placeholder="请选择模式">
                  <Option value={2}>V段速率测试</Option>
                  <Option value={3}>V段报文测试</Option>
                  <Option value={4}>S段测试</Option>
                  <Option value={6}>绘制冲激响应</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xl={{ span: 5, offset: 1 }} lg={{ span: 4 }} md={{ span: 24 }} sm={24}>
              <Form.Item
                label={fieldLabels.role}
                name="role"
                rules={[{ required: true, message: '请选择角色' }]}
              >
                <Select placeholder="请选择角色"                 
                        onChange={onRoleChange}
>
                  <Option value={0}>双向通信</Option>
                  <Option value={1}>单向发送</Option>
                  <Option value={2}>单向接收</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xl={{ span: 5, offset: 1 }} lg={{ span: 4 }} md={{ span: 24 }} sm={24}>
              <Form.Item
                label={fieldLabels.antennaMode}
                name="antennaMode"
                rules={[{ required: true, message: '请选择天线模式' }]}
              >
                <Select placeholder="请选择天线模式">
                  <Option value={1}>窄波束</Option>
                  <Option value={2}>宽波束</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col xl={{ span: 5 }} lg={{ span: 4 }} md={{ span: 24 }} sm={24}>
              <Form.Item
                label={fieldLabels.testPacketNum}
                name="testPacketNum"
                rules={[{ required: true, message: '请输入' }]}
              > 
                <InputNumber 
                  placeholder="请输入测试报文数量" size="middle" step={1}
                  value = {configForm.testPacketNum}
                  style={{ width: '100%' }}
                />
              </Form.Item>
            </Col>
            <Col xl={{ span: 5, offset: 1 }} lg={{ span: 4 }} md={{ span: 24 }} sm={24}>
              <Form.Item
                label={fieldLabels.vbandAttenuation}
                name="vbandAttenuation"
                rules={[{ required: true, message: '请输入' }]}
              > 
                <InputNumber 
                  placeholder="请输入V段衰减" size="middle" step={1}
                  value = {configForm.vbandAttenuation}
                  style={{ width: '100%' }}
                />
              </Form.Item>
            </Col>
          </Row>
        </Card>
        <Card title="选项配置" className={styles.card} bordered={false}>
          <Row gutter={16}>
            <Col lg={4} md={12} sm={24}>
              <Form.Item name="bigAntennaEnable" valuePropName="checked">
                <Checkbox>使能大天线</Checkbox>
              </Form.Item>
            </Col>
            <Col xl={{ span: 4 }} lg={{ span: 4 }} md={{ span: 12 }} sm={24}>
              <Form.Item name="continuousTransceiveEnable" valuePropName="checked">
                <Checkbox disabled={role != 1}>
                    启用中频连发
                </Checkbox>
              </Form.Item>
            </Col>
            <Col xl={{ span: 4 }} lg={{ span: 4 }} md={{ span: 12 }} sm={24}>
              <Form.Item name="costasLoopEnable" valuePropName="checked">
                <Checkbox>使能costa环路</Checkbox>
              </Form.Item>
            </Col>
            <Col xl={{ span: 4 }} lg={{ span: 4 }} md={{ span: 12 }} sm={24}>
              <Form.Item name="impulseEnable" valuePropName="checked">
                <Checkbox disabled={role == 1}>使能冲激响应</Checkbox>
              </Form.Item>
            </Col>
            <Col xl={{ span: 4 }} lg={{ span: 4 }} md={{ span: 12 }} sm={24}>
              <Form.Item name="bitErrorEnable" valuePropName="checked">
                <Checkbox>使能误码率统计</Checkbox>
              </Form.Item>
            </Col>
            <Col xl={{ span: 4 }} lg={{ span: 4 }} md={{ span: 12 }} sm={24}>
              <Form.Item name="checkGPIOEnable" valuePropName="checked">
                <Checkbox>使能引脚初始状态检测</Checkbox>
              </Form.Item>
            </Col>
          </Row>        
        </Card>
        <Card title="时隙管理" className={styles.card} bordered={false}>
          <Form.Item name="slots">
            <TableForm />
          </Form.Item>
        </Card>
        <Card title="角度波束控制" className={styles.card} bordered={false}>
          <Form.Item name="angleBeams">
            <AngleBeamForm />
          </Form.Item>
        </Card>
      </PageContainer>
      <FooterToolbar>
        {getErrorInfo(error)}
        <Button type="primary" style={{background: 'green'}} 
          onClick={()=>{
            dispatch({
              type: 'configForm/getConfig'
            })
          }} 
          loading={getting}>
          读取配置
        </Button>
        <Button type="primary" onClick={() => form?.submit()} loading={submitting}>
          更新配置
        </Button>
      </FooterToolbar>
    </Form>
  );
};

export default connect(({ configForm, loading }: 
  { 
    configForm: any;
    loading: { effects: { [key: string]: boolean } } 
  }) => ({
  configForm,
  getting: loading.effects['configForm/getConfig'],
  submitting: loading.effects['configForm/submitConfig'],
}))(AdvancedForm);
