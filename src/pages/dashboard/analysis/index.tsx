import { Col, Row, Progress } from 'antd';
import React, { Component, Suspense } from 'react';
import { GridContent } from '@ant-design/pro-layout';
import { RadioChangeEvent } from 'antd/es/radio';
import moment from 'moment';
import { connect, Dispatch } from 'umi';

import PageLoading from './components/PageLoading';
import { getTimeDistance } from './utils/utils';
import { AnalysisData } from './data.d';
import styles from './style.less';
import { ChartCard } from './components/Charts';
import { SelectOutlined } from '@ant-design/icons';

const IntroduceRow = React.lazy(() => import('./components/IntroduceRow'));
const SbandDataDiagram = React.lazy(() => import('./components/SbandDataDiagram'))
// const SalesCard = React.lazy(() => import('./components/SalesCard'));
// const TopSearch = React.lazy(() => import('./components/TopSearch'));
// const ProportionSales = React.lazy(() => import('./components/ProportionSales'));
// const OfflineData = React.lazy(() => import('./components/OfflineData'));

const pinWaitingMsg = [
  "等待LMX2592初始化",
  "等待HMC7043启动初始化",
  "等待HMC7043部分初始化",
  "等待Aurora Ready",
  "等待AD6688_1初始化",
  "等待AD6688_2初始化",
  "等待AD9163_1初始化",
  "等待AD9163_2初始化",
  "等待Ultrascale Aurora Lane Up",
  "等待Ultrascale Aurora Channel Up",
  "初始化完成"
];


interface AnalysisProps {
  dashboardAndanalysis: AnalysisData;
  dispatch: Dispatch<any>;
  loading: boolean;
  role: number;
}

interface AnalysisState {
  pinState: number;
  temperature: number;
  packetSent: number,
  packetRecv: number;
  packetErr: number;
  sbandSpeedData: {x: string, y: number}[];
  sbandErrorBitrateData: {x: string, y: number}[];
}

class Analysis extends Component<AnalysisProps, AnalysisState> {
  state: AnalysisState = {
    pinState: 0,
    temperature: 0.0,
    packetSent: 0,
    packetRecv: 0,
    packetErr: 0,
    sbandSpeedData: [],
    sbandErrorBitrateData: [],
  };

  url: string = 'ws://' + window.location.host + '/data';
  // url: string = 'ws://10.211.55.11:8888' + '/data'; 
  ws: WebSocket = new WebSocket(this.url);


  reqRef: number = 0;

  timeoutId: number = 0;

  componentDidMount() {
    const { dispatch } = this.props;
    // this.reqRef = requestAnimationFrame(() => {
    //   dispatch({
    //     type: 'dashboardAndanalysis/fetch',
    //   });
    // });
    this.ws.onmessage = (ev) => {
      const dataJson = JSON.parse(ev.data);
      console.log(dataJson);

      const sbandSpeed = {
        x: moment(new Date().getTime()).format("h:mm:ss"),
        y: this.props.role === 2 ? dataJson.sbandRecvSpeed : dataJson.sbandSendSpeed,
      }

      const sbandErrorBitrate = {
        x: moment(new Date().getTime()).format("h:mm:ss"),
        y: dataJson.sbandErrorBitrate
      }

      if (this.state.sbandSpeedData.length >= 50) {
        this.state.sbandSpeedData.shift();
        this.state.sbandSpeedData.push(sbandSpeed)
      } else {
        this.state.sbandSpeedData.push(sbandSpeed);
      }

      if (this.state.sbandErrorBitrateData.length >= 50) {
        this.state.sbandErrorBitrateData.shift();
        this.state.sbandErrorBitrateData.push(sbandErrorBitrate);
      } else {
        this.state.sbandErrorBitrateData.push(sbandErrorBitrate);
      }
      
      this.setState({
        pinState : dataJson.pinState,
        temperature: dataJson.temperature,
        packetSent: dataJson.packetSent,
        packetRecv: dataJson.packetRecv,
        packetErr: dataJson.packetErr,
      });
    };

    this.ws.onerror = (ev) => {
      // 路由到错误界面
    };

    this.ws.onopen = (ev) => {
      console.log(ev);
    };
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'dashboardAndanalysis/clear',
    });
    cancelAnimationFrame(this.reqRef);
    clearTimeout(this.timeoutId);
    this.ws.close();
  }

  render() {
    const { loading } = this.props;


    return (
      <GridContent>
        <React.Fragment>
          <Suspense fallback={<PageLoading />}>
            <Row gutter={24} type="flex">
              <Col xs={24} style={{marginBottom: 24}}>
                <ChartCard
                title="引脚初始化状态"
                total={pinWaitingMsg[this.state.pinState]}
                contentHeight={32}>
                <Progress strokeWidth={8} percent={this.state.pinState * 10}/>
              </ChartCard>
              </Col>
            </Row>
            <IntroduceRow
              loading={loading}
              temperature={this.state.temperature}
              packetSent={this.state.packetSent}
              packetRecv={this.state.packetRecv}
              packetErr={this.state.packetErr}
            />
            <SbandDataDiagram 
              role = {this.props.role}
              sbandSpeedData={this.state.sbandSpeedData}
              sbandErrorBitrateData={this.state.sbandErrorBitrateData}/>
          </Suspense>
          {/* <Suspense fallback={null}>
            <SalesCard
              rangePickerValue={rangePickerValue}
              salesData={salesData}
              isActive={this.isActive}
              handleRangePickerChange={this.handleRangePickerChange}
              loading={loading}
              selectDate={this.selectDate}
            />
          </Suspense>
          <Row
            gutter={24}
            style={{
              marginTop: 24,
            }}
          >
            <Col xl={12} lg={24} md={24} sm={24} xs={24}>
              <Suspense fallback={null}>
                <TopSearch
                  loading={loading}
                  visitData2={visitData2}
                  searchData={searchData}
                  dropdownGroup={dropdownGroup}
                />
              </Suspense>
            </Col>
            <Col xl={12} lg={24} md={24} sm={24} xs={24}>
              <Suspense fallback={null}>
                <ProportionSales
                  dropdownGroup={dropdownGroup}
                  salesType={salesType}
                  loading={loading}
                  salesPieData={salesPieData}
                  handleChangeSalesType={this.handleChangeSalesType}
                />
              </Suspense>
            </Col>
          </Row>
          <Suspense fallback={null}>
            <OfflineData
              activeKey={activeKey}
              loading={loading}
              offlineData={offlineData}
              offlineChartData={offlineChartData}
              handleTabChange={this.handleTabChange}
            />
          </Suspense> */}
        </React.Fragment>
      </GridContent>
    );
  }
}

export default connect(
  ({
    config,
    dashboardAndanalysis,
    loading,
  }: {
    config: any
    dashboardAndanalysis: any;
    loading: {
      effects: { [key: string]: boolean };
    };
  }) => ({
    role: config.currentRole,
    dashboardAndanalysis,
    loading: loading.effects['dashboardAndanalysis/fetch'],
  }),
)(Analysis);
