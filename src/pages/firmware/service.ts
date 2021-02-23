import request from 'umi-request';

export async function uploadZynqService({chunk, filename, offset}) {
    return request.post('/api/firmware/zynq?name=' + filename + "&offset=" + offset, {
        data: chunk
    }).catch((error) => ({error}));
}

export async function uploadUltrascaleService({chunk, filename, offset}) {
    return request.post('/api/firmware/fpga?name=' + filename + "&offset=" + offset, {
        data: chunk
    }).catch((error) => ({error})); 
}

export async function downloadLogService() {
    window.open('/api/firmware/log');
}

export async function downloadImpulseService() {
    window.open('/api/firmware/impulse');
}