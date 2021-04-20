import { Effect, Reducer } from 'umi';
import { message } from 'antd';
import { getConfigRequest, submitConfigRequest } from './service';

export interface SlotData {
  key: number,
  sender: number,
  receiver: number
}

export interface AngleBeamData {
  key: number,
  nodeIndex: number,
  sendBeam: number,
  sendAngle: number,
  recvBeam: number,
  recvAngle: number
}

export interface ConfigData {
  address: number,
  mode: number,
  role: number,
  antennaMode: number,
  antennaFreq: number,
  continuousTransceiveEnable: boolean,
  gpsEnable: boolean,
  costasEnable: boolean,
  impulseEnable: boolean,
  bigAntennaEnable: boolean, 
  bitErrorEnable: boolean,
  checkGPIOEnable: boolean,
  testPacketNum: number,
  vbandSendAttenuation: number,
  vbandRecvAttenuation: number,
  slots: SlotData[],
  angleBeams: AngleBeamData[]
}

export interface ModelType {
  namespace: string;
  state: {};
  reducers: {
    loadConfig : Reducer<ConfigData>;
  };
  effects: {
    getConfig: Effect;
    submitConfig: Effect;
  };
}

const Model: ModelType = {
  namespace: 'configForm',

  state: {},

  reducers: {
    loadConfig(state, {payload}) {
      console.log(payload);
      return {
        ...payload,
        state
      }
    }
  },

  effects: {
    *getConfig(_, { call, put }) {
      // 获取现在的配置信息
      const {response, error} = yield call(getConfigRequest);
      if (error) {
        message.error("读取配置失败");
        return;
      }
      const status = {
        address: response.stack.address,
        mode: response.stack.mode,
        role: response.stack.role,
        antennaMode: response.stack.antenna_mode,
        antennaFreq: response.stack.antenna_freq,
        continuousTransceiveEnable: response.stack.continuous_transceive,
        gpsEnable: response.stack.gps_enable,
        costasEnable: response.stack.costas_loop_enable,
        impulseEnable: response.stack.impulse_response_enable,
        bigAntennaEnable: response.stack.big_antenna_enable, 
        bitErrorEnable: response.stack.bit_err_count_enable,
        checkGPIOEnable: response.stack.check_fpga_enable,
        testPacketNum: response.test.packet_num,
        vbandSendAttenuation: response.stack.vband_send_attenuation,
        vbandRecvAttenuation: response.stack.vband_recv_attenuation,
        // vband
        slots: [
          {
            key: 1, 
            sender: (response.vband.slot0) >> 4,
            receiver: (response.vband.slot0) & 0xf
          },
          {
            key: 2, 
            sender: (response.vband.slot1) >> 4,
            receiver: (response.vband.slot1) & 0xf
          },
          {
            key: 3, 
            sender: (response.vband.slot2) >> 4,
            receiver: (response.vband.slot2) & 0xf
          },
          {
            key: 4, 
            sender: (response.vband.slot3) >> 4,
            receiver: (response.vband.slot3) & 0xf
          },
          {
            key: 5, 
            sender: (response.vband.slot4) >> 4,
            receiver: (response.vband.slot4) & 0xf
          },
        ],
        angleBeams: [
          {
            key: 1,
            sendAngle: response.vband.node1_send_angle,
            sendBeam: response.vband.node1_send_beam,
            recvAngle: response.vband.node1_recv_angle,
            recvBeam: response.vband.node1_recv_beam
          },
          {
            key: 2,
            sendAngle: response.vband.node2_send_angle,
            sendBeam: response.vband.node2_send_beam,
            recvAngle: response.vband.node2_recv_angle,
            recvBeam: response.vband.node2_recv_beam
          },
          {
            key: 3,
            sendAngle: response.vband.node3_send_angle,
            sendBeam: response.vband.node3_send_beam,
            recvAngle: response.vband.node3_recv_angle,
            recvBeam: response.vband.node3_recv_beam
          }
        ]
      }
      message.success("读取配置成功");
      console.log(status);
      yield put({
        type: 'loadConfig',
        payload: status
      });
    },
    *submitConfig({ payload }, { call }) {
      const {error} = yield call(submitConfigRequest, payload);
      if (error) {
        message.error('提交配置失败');
      } else {
        message.success('提交配置成功, 已启动服务');
      }
    },
  },
};

export default Model;
