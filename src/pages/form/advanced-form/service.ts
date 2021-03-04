import request from 'umi-request';

export async function getConfigRequest() {
  return request.get('/api/config/get')
    .then((response) => ({response, error: undefined}))
    .catch(error => ({response: undefined, error}));
}

export async function submitConfigRequest(payload: any) {
        // 生成json
  console.log(payload);
  var jsonPayload: any = {
    "stack": {
      "address": payload.address, 
      "mode": payload.mode, 
      "role": payload.role, 
      "antennaMode": payload.antennaMode,
      "big_antenna_enable": payload.bigAntennaEnable,
      "continuous_transceive": payload.continuousTransceiveEnable,
      "impulse_response_enable": payload.impulseEnable,
      "bit_err_count_enable": payload.bitErrorEnable,
      "check_fpga_enable": payload.checkGPIOEnable,
      "vband_attenuation": payload.vbandAttenuation
    },
    "test": {
      "packet_num": payload.testPacketNum
    },
    "vband": {
      "slot0": (payload.slots[0].sender << 4) | (payload.slots[0].receiver),
      "slot1": (payload.slots[1].sender << 4) | (payload.slots[1].receiver),
      "slot2": (payload.slots[2].sender << 4) | (payload.slots[2].receiver),
      "slot3": (payload.slots[3].sender << 4) | (payload.slots[3].receiver),
      "slot4": (payload.slots[4].sender << 4) | (payload.slots[4].receiver),
      "node1_send_angle": payload.angleBeams[0].sendAngle,
      "node1_send_beam": payload.angleBeams[0].sendBeam,
      "node1_recv_angle": payload.angleBeams[0].recvAngle,
      "node1_recv_beam": payload.angleBeams[0].recvBeam,
      "node2_send_angle": payload.angleBeams[1].sendAngle,
      "node2_send_beam": payload.angleBeams[1].sendBeam,
      "node2_recv_angle": payload.angleBeams[1].recvAngle,
      "node2_recv_beam": payload.angleBeams[1].recvBeam, 
      "node3_send_angle": payload.angleBeams[2].sendAngle,
      "node3_send_beam": payload.angleBeams[2].sendBeam,
      "node3_recv_angle": payload.angleBeams[2].recvAngle,
      "node3_recv_beam": payload.angleBeams[2].recvBeam
    }
  }
  console.log(jsonPayload);
  const { error } = await request.post('/api/config/set', {
    data: jsonPayload 
  }).catch((error) => ({error}));
  if (error) return { error };

  return request.get('/api/control/restart/service')
    .catch((error) => ({error}));
}
