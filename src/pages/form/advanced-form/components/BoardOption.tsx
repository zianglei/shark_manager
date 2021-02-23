import {Row, Col, Form, Checkbox} from 'antd';

interface BoardOptionProps {
    role?: number,
    onChange?: (value: number) => void;
}

const BoardOption: React.FC<BoardOptionProps> = (props) => {
    
    return (
        <Row gutter={16}>
            <Col lg={4} md={12} sm={24}>
              <Form.Item name="bigAntennaEnable">
                <Checkbox>使能大天线</Checkbox>
              </Form.Item>
            </Col>
            <Col xl={{ span: 4 }} lg={{ span: 4 }} md={{ span: 12 }} sm={24}>
              <Form.Item name="continuousTransceiveEnable">
                <Checkbox disabled={props.role !== 1}>
                    启用中频连发
                </Checkbox>
              </Form.Item>
            </Col>
            <Col xl={{ span: 4 }} lg={{ span: 4 }} md={{ span: 12 }} sm={24}>
              <Form.Item name="costasLoopEnable">
                <Checkbox>使能costa环路</Checkbox>
              </Form.Item>
            </Col>
            <Col xl={{ span: 4 }} lg={{ span: 4 }} md={{ span: 12 }} sm={24}>
              <Form.Item name="impulseEnable">
                <Checkbox disabled={props.role !== 2}>使能冲击响应</Checkbox>
              </Form.Item>
            </Col>
            <Col xl={{ span: 4 }} lg={{ span: 4 }} md={{ span: 12 }} sm={24}>
              <Form.Item name="bitErrorEnable">
                <Checkbox>使能误码率统计</Checkbox>
              </Form.Item>
            </Col>
            <Col xl={{ span: 4 }} lg={{ span: 4 }} md={{ span: 12 }} sm={24}>
              <Form.Item name="checkGPIOEnable">
                <Checkbox>使能引脚初始状态检测</Checkbox>
              </Form.Item>
            </Col>
          </Row>
    )

}

export default BoardOption;