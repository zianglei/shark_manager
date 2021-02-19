import request from 'umi-request';

export async function getConfigRequest() {
  return request.get('/api/config/get')
    .then((response) => (response));
}

export async function submitConfigRequest(payload: any) {
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
  return request.post('/api/config/set', {
    data: jsonPayload 
  }).catch((error) => ({error}));
}
