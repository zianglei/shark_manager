import request from 'umi-request';

export async function uploadService({chunk, filename, offset}) {
    return request.post('/api/firmware/fpga?name=' + filename + "&offset=" + offset, {
        data: chunk
    }).catch((error) => ({error}));
}