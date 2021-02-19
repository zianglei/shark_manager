import { Effect, Reducer } from 'umi';
import { message } from 'antd';
import { getConfigRequest, submitConfigRequest } from './service';

export interface ConfigData {
  address: number,
  mode: number,
  role: number,
  antennaMode: number,
  continuousTransceiveEnable: boolean,
  gpsEnable: boolean,
  costasEnable: boolean,
  impulseEnable: boolean,
  bigAntennaEnable: boolean, 
  bitErrorEnable: boolean,
  checkGPIOEnable: boolean,
  testPacketNum: number
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
    loadConfig(state, { payload }) {
      return {
        ...payload
      }
    }
  },

  effects: {
    *getConfig(_, { call, put }) {
      // 获取现在的配置信息
      const response = yield call(getConfigRequest);
      console.log(response)
      const status = {
        address: response.stack.address,
        mode: response.stack.mode,
        role: response.stack.role,
        antennaMode: response.stack.antennaMode,
        continuousTransceiveEnable: response.stack.continuous_transceive,
        gpsEnable: response.stack.gps_enable,
        costasEnable: response.stack.costas_loop_enable,
        impulseEnable: response.stack.impulse_response_enable,
        bigAntennaEnable: response.stack.big_antenna_enable, 
        bitErrorEnable: response.stack.bit_err_count_enable,
        checkGPIOEnable: response.stack.check_fpga_enable,
        testPacketNum: response.test.packet_num
      }
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
        message.success('提交配置成功');
      }
    },
  },
};

export default Model;
