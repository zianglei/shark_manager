import { Effect } from 'umi';
import { message } from 'antd';
import { uploadZynqService, uploadUltrascaleService} from './service';
import { downloadLogService, downloadImpulseService} from './service';

export interface ModelType {
    namespace: string;
    state: {
        zynqFileisUploading: boolean;
        fpgaFileisUploading: boolean;
    };
    effects: {
        uploadZynqFirmware: Effect;
        uploadUltrascaleFirmware: Effect;
        downloadLog: Effect;
        downloadImpulse: Effect;
    }
}

let uploadFirmware = ({payload, uploadFunc}, {call}) => {
    const {file, filename, onSuccess, onError, onProgress} = payload;

    var blob = new Blob([file]);
    let chunkSize = Math.floor(file.size / 100);
    if (chunkSize < 4096) chunkSize = 4096;
    if (chunkSize > 1024000) chunkSize = 1024000;
    
    let offset = 0
    let sendChunk = (offset) => {
        blob.slice(offset, offset + chunkSize).arrayBuffer().then(
            async (x) => {
                const {error} = await uploadFunc(
                    {chunk: x, filename: filename, offset: offset}
                );
                if (!error) {
                    if (offset + chunkSize >= file.size) {
                        console.log(offset, chunkSize, offset + chunkSize, file.size);
                        onSuccess(file);
                    } else {
                        onProgress({ percent: ((offset + chunkSize) / file.size) * 100}, file);
                        sendChunk(offset + chunkSize);
                    }
                } else {
                    onError();
                }
            }
        );
    }
    
    sendChunk(0);
}

const Model: ModelType = {
    namespace: "firmware",
    state: {
        zynqFileisUploading: false,
        fpgaFileisUploading: false
    },
    effects: {
        *uploadZynqFirmware({payload}, 
                            {call}) {
            uploadFirmware({payload, uploadFunc: uploadZynqService}, {call});
        },

        *uploadUltrascaleFirmware({payload}, {call}) {
            uploadFirmware({payload, uploadFunc: uploadUltrascaleService}, {call});
        },

        *downloadLog(_, {call}) {
            yield call(downloadLogService);
            // // if (error) {
            // //     message.error("下载运行日志失败");
            // // }
            // window.open("/api/")
        },
        
        *downloadImpulse(_, {call}) {
            const {error} = yield call(downloadImpulseService);
            if (error) {
                message.error("下载冲激响应日志失败");
            }
        }
    }
}

export default Model;