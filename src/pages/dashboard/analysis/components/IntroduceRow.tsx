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

const topColResponsiveProps = {
  xs: 24,
  sm: 12,
  md: 12,
  lg: 12,
  xl: 8,
  style: { marginBottom: 24 },
};

const IntroduceRow = ({ loading, visitData }: { loading: boolean; visitData: VisitDataType[] }) => (
  <Row gutter={24} type="flex">
    <Col {...topColResponsiveProps}>
      <ChartCard
        bordered={false}
        loading={loading}
        title={
          <FormattedMessage
              id="dashboardandanalysis.analysis.temperature"
              defaultMessage="温度"
          />
        }
        total={()=><Celsius>1234</Celsius>}
        contentHeight={46}
      >
        <MiniArea line height={45} data={visitData} />
      </ChartCard>
    </Col>
    <Col {...topColResponsiveProps}>
      <ChartCard
        bordered={false}
        loading={loading}
        title={
          <FormattedMessage id="dashboardandanalysis.analysis.packet-sent" defaultMessage="发送报文个数" />
        }
        total={numeral(6560).format('0,0')}
        contentHeight={46}
      >
        <MiniBar data={visitData} />
      </ChartCard>
    </Col>
    <Col {...topColResponsiveProps}>
      <ChartCard
        loading={loading}
        bordered={false}
        title={
          <FormattedMessage
            id="dashboardandanalysis.analysis.packet-recv"
            defaultMessage="Operational Effect"
          />
        }
        total="32"
        contentHeight={46}
      >
        <MiniBar data={visitData} />
      </ChartCard>
    </Col>
  </Row>
);

export default IntroduceRow;
