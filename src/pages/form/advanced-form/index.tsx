import { CloseCircleOutlined } from '@ant-design/icons';
import { Button, Card, Col, DatePicker, Form, Input, Popover, Row, Select, TimePicker, Checkbox,
         InputNumber} from 'antd';
import React, { FC, useState } from 'react';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import { connect, Dispatch } from 'umi';
import TableForm from './components/TableForm';
import styles from './style.less';

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
  name: '仓库名',
  url: '仓库域名',
  owner: '仓库管理员',
  approver: '审批人',
  dateRange: '生效日期',
  type: '仓库类型',
  name2: '任务名',
  url2: '任务描述',
  owner2: '执行人',
  approver2: '责任人',
  dateRange2: '生效日期',
  type2: '任务类型',
};

const tableData = [
  {
    key: '1',
    slotIndex: '1',
    workId: '00001',
    name: 'John Brown',
    department: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    slotIndex: '2',
    workId: '00002',
    name: 'Jim Green',
    department: 'London No. 1 Lake Park',
  },
  {
    key: '3',
    slotIndex: '3',
    workId: '00003',
    name: 'Joe Black',
    department: 'Sidney No. 1 Lake Park',
  },
  {
    key: '4',
    slotIndex: '4',
    workId: '00003',
    name: 'Joe Black',
    department: 'Sidney No. 1 Lake Park',
  },
  {
    key: '5',
    slotIndex: '5',
    workId: '00003',
    name: 'Joe Black',
    department: 'Sidney No. 1 Lake Park',
  },
];

interface AdvancedFormProps {
  dispatch: Dispatch<any>;
  submitting: boolean;
}

interface ErrorField {
  name: InternalNamePath;
  errors: string[];
}

const AdvancedForm: FC<AdvancedFormProps> = ({ submitting, dispatch }) => {
  const [form] = Form.useForm();
  const [error, setError] = useState<ErrorField[]>([]);
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
      type: 'formAndadvancedForm/submitAdvancedForm',
      payload: values,
    });
  };

  const onFinishFailed = (errorInfo: any) => {
    setError(errorInfo.errorFields);
  };

  return (
    <Form
      form={form}
      layout="vertical"
      hideRequiredMark
      initialValues={{ members: tableData }}
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
                  <Option value="1">1</Option>
                  <Option value="2">2</Option>
                  <Option value="3">3</Option>
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
                  <Option value="2">V段速率测试</Option>
                  <Option value="3">V段报文测试</Option>
                  <Option value="6">绘制冲激响应</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xl={{ span: 5, offset: 1 }} lg={{ span: 4 }} md={{ span: 24 }} sm={24}>
              <Form.Item
                label={fieldLabels.role}
                name="role"
                rules={[{ required: true, message: '请选择角色' }]}
              >
                <Select placeholder="请选择角色">
                  <Option value="0">双向通信</Option>
                  <Option value="1">单向发送</Option>
                  <Option value="2">单向接收</Option>
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
                  <Option value="1">窄波束</Option>
                  <Option value="2">宽波束</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col lg={5} md={12} sm={24}>
              <Form.Item
                label={fieldLabels.testPacketNum}
                name="testPacketNum"
                rules={[{ required: true, message: '请输入' }]}
              > 
                <InputNumber 
                  placeholder="请输入测试报文数量" size="middle" step={1}
                  style={{ width: '100%' }}
                />
              </Form.Item>
            </Col>
          </Row>
        </Card>
        <Card title="选项配置" className={styles.card} bordered={false}>
          <Row gutter={16}>
            <Col lg={4} md={12} sm={24}>
              <Form.Item name="bigAntennaEnable">
                <Checkbox>{fieldLabels.bigAntennaEnable}</Checkbox>
              </Form.Item>
            </Col>
            <Col xl={{ span: 4 }} lg={{ span: 4 }} md={{ span: 12 }} sm={24}>
              <Form.Item name="continuousTransceiveEnable">
                <Checkbox>{fieldLabels.continuousTransceiveEnable}</Checkbox>
              </Form.Item>
            </Col>
            <Col xl={{ span: 4 }} lg={{ span: 4 }} md={{ span: 12 }} sm={24}>
              <Form.Item name="costasLoopEnable">
                <Checkbox>{fieldLabels.costasEnable}</Checkbox>
              </Form.Item>
            </Col>
            <Col xl={{ span: 4 }} lg={{ span: 4 }} md={{ span: 12 }} sm={24}>
              <Form.Item name="impulseEnable">
                <Checkbox>{fieldLabels.impulseEnable}</Checkbox>
              </Form.Item>
            </Col>
            <Col xl={{ span: 4 }} lg={{ span: 4 }} md={{ span: 12 }} sm={24}>
              <Form.Item name="bitErrorEnable">
                <Checkbox>{fieldLabels.bitErrorEnable}</Checkbox>
              </Form.Item>
            </Col>
            <Col xl={{ span: 4 }} lg={{ span: 4 }} md={{ span: 12 }} sm={24}>
              <Form.Item name="checkGPIOEnable">
                <Checkbox>{fieldLabels.checkGPIOEnable}</Checkbox>
              </Form.Item>
            </Col>
          </Row>
        </Card>
        <Card title="时隙管理" bordered={false}>
          <Form.Item name="members">
            <TableForm />
          </Form.Item>
        </Card>
      </PageContainer>
      <FooterToolbar>
        {getErrorInfo(error)}
        <Button type="primary" style={{background: 'green'}} onClick={()=>{}}>
          读取配置
        </Button>
        <Button type="primary" onClick={() => form?.submit()} loading={submitting}>
          更新配置
        </Button>
      </FooterToolbar>
    </Form>
  );
};

export default connect(({ loading }: { loading: { effects: { [key: string]: boolean } } }) => ({
  submitting: loading.effects['formAndadvancedForm/submitAdvancedForm'],
}))(AdvancedForm);
