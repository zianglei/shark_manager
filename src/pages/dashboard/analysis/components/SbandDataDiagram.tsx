import { Col, Row, Tooltip } from 'antd';
import { ChartCard, MiniArea, MiniBar} from './Charts';
import { InfoCircleOutlined } from '@ant-design/icons'
import numeral from 'numeral';

const topColResponsiveProps = {
    xs: 24,
    sm: 12,
    md: 12,
    lg: 12,
    xl: 12,
    style: { marginBottom: 24 },
  };

const SbandDataDiagram = ({loading, sbandSpeedData, role, sbandErrorBitrateData}: {
    loading: boolean;
    role: number;
    sbandSpeedData: {x: string, y: number}[];
    sbandErrorBitrateData: {x: string, y: number}[]
}) => {
    return (<Row gutter={24} type="flex">
        <Col {...topColResponsiveProps}>
            <ChartCard
                title="低频段速率"
                action={
                    <Tooltip title="当前低频段的发送速率或接收速率">
                        <InfoCircleOutlined />
                    </Tooltip>
                }
                total={sbandSpeedData.length === 0 ? "暂无数据" : numeral(sbandSpeedData.slice(-1)[0].y).format('0.00') + ' Kbps'}
                contentHeight={46}
            >
                {<MiniArea line height={46} data={sbandSpeedData} />}
            </ChartCard>
        </Col>
        { role === 2 ? <Col {...topColResponsiveProps}>
            <ChartCard
                title="低频段误码率"
                action={
                    <Tooltip title="当前低频段接收误码率">
                        <InfoCircleOutlined />
                    </Tooltip>
                }
                total={sbandErrorBitrateData.length === 0 ? "暂无数据" : 
                    numeral(sbandErrorBitrateData.slice(-1)[0].y).format('0.0e+0')}
                contentHeight={46}
            >
                <MiniBar height={46} data={sbandErrorBitrateData} ></MiniBar>
            </ChartCard>
        </Col> : null
        }
        
    </Row>
    )
}

export default SbandDataDiagram;