import { Effect } from 'umi';
import { message } from 'antd';
import { submitConfigRequest } from './service';

export interface ModelType {
  namespace: string;
  state: {};
  effects: {
    submitConfig: Effect;
  };
}

const Model: ModelType = {
  namespace: 'configForm',

  state: {},

  effects: {
    *submitConfig({ payload }, { call }) {
      // 生成json
      var jsonPayload: any = {
        "stack": {
          "address": payload.address, 
          "mode": payload.mode, 
          "role": payload.role, 
          "antennaMode": payload.mode
        },
        "test": {
          "packet_num": payload.testPacketNum
        },
        "vband": {
          "slot0": (payload.slots[0].sender << 4) | (payload.slots[0].receiver),
          "slot1": (payload.slots[1].sender << 4) | (payload.slots[1].receiver),
          "slot2": (payload.slots[2].sender << 4) | (payload.slots[2].receiver),
          "slot3": (payload.slots[3].sender << 4) | (payload.slots[3].receiver),
          "slot4": (payload.slots[4].sender << 4) | (payload.slots[4].receiver)
        }
      }
      console.log(jsonPayload);
      yield call(submitConfigRequest, jsonPayload);
      message.success('提交配置成功');
    },
  },
};

export default Model;
