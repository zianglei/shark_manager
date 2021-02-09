import request from 'umi-request';

export async function submitConfigRequest(payload: any) {
  return request.post('/api/config/set', {
    data: payload
  });
}
