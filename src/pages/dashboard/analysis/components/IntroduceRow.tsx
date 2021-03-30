import { InfoCircleOutlined } from '@ant-design/icons';
import { Col, Row, Card, Statistic } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';


import { FormattedMessage } from 'umi';
import React from 'react';
import numeral from 'numeral';
import { ChartCard, MiniArea, MiniBar, MiniProgress, Field } from './Charts';
import { VisitDataType } from '../data.d';
import Celsius from '../utils/celsius';
import styles from '../style.less';
import NumberInfo from './NumberInfo'

const topColResponsiveProps = {
  xs: 24,
  sm: 12,
  md: 12,
  lg: 12,
  xl: 6,
  style: { marginBottom: 24 },
};

const IntroduceRow = ({ loading, temperature, packetSent, packetRecv, packetErr }: 
    { loading: boolean; 
      temperature: number; 
      packetSent: number; 
      packetRecv: number;
      packetErr: number
    }) => (
  <Row gutter={24} type="flex">
    <Col {...topColResponsiveProps}>
      <NumberInfo
        loading={loading}
        title={
          <FormattedMessage
              id="dashboardandanalysis.analysis.temperature"
              defaultMessage="温度"
          />
        }
        value={()=><Celsius>{temperature}</Celsius>}
        bordered={false}
      >
      </NumberInfo>
    </Col>
    <Col {...topColResponsiveProps}>
      <NumberInfo
        bordered={false}
        loading={loading}
        title={
          <FormattedMessage id="dashboardandanalysis.analysis.packet-sent" defaultMessage="发送报文个数" />
        }
        value={numeral(packetSent).format('0,0')}
      >
      </NumberInfo>
    </Col>
    <Col {...topColResponsiveProps}>
      <NumberInfo
        loading={loading}
        bordered={false}
        title={
          <FormattedMessage
            id="dashboardandanalysis.analysis.packet-recv"
            defaultMessage="Operational Effect"
          />
        }
        value={numeral(packetRecv).format('0,0')}
      >
      </NumberInfo>
    </Col>
    <Col {...topColResponsiveProps}>
      <NumberInfo
        loading={loading}
        bordered={false}
        title={
          <FormattedMessage
            id="dashboardandanalysis.analysis.packet-error"
            defaultMessage="Operational Effect"
          />
        }
        value={numeral(packetErr).format('0,0')}
      >
      </NumberInfo>
    </Col>
  </Row>
);

export default IntroduceRow;
