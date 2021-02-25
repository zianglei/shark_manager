import { Effect, Reducer } from 'umi';
import { message } from 'antd';
import { uploadZynqService, uploadUltrascaleService} from './service';
import { downloadLogService, downloadImpulseService} from './service';
import { restartDeviceService, restartProgramService } from './service'; 
import { getConfigRequest } from '../form/advanced-form/service';

export interface StateType {
    zynqFileisUploading: boolean;
    fpgaFileisUploading: boolean;
    spinning: boolean;
    zynqFileList: [];
    fpgaFileList: [];
}

export interface ModelType {
    namespace: string;
    state: StateType
    reducers: {
        updateSpinState: Reducer<StateType>;
        updateZynqFileList: Reducer<StateType>;
        updateFpgaFileList: Reducer<StateType>;
    };
    effects: {
        uploadZynqFirmware: Effect;
        uploadUltrascaleFirmware: Effect;
        downloadLog: Effect;
        downloadImpulse: Effect;
        restartProgram: Effect;
        restartDevice: Effect;
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
        fpgaFileisUploading: false,
        spinning: false,
        zynqFileList: [],
        fpgaFileList: []
    },
    reducers: {
        updateSpinState(state, { payload }) {
            return {
                ...state,
                spinning: payload.spinning,
            }
        },
        updateZynqFileList(state, { payload }) {
            return {
                ...state,
                zynqFileList: payload
            }
        },
        updateFpgaFileList(state, { payload }) {
            return {
                ...state,
                fpgaFileList: payload
            }
        }

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
        },

        *restartProgram(_, {call}) {
            const {error} = yield call(restartProgramService);
            if (error) {
                message.error("重启失败")
            } else {
                message.success("重启成功");
            }
        },

        *restartDevice(_, {call, put}) {
            const { error } = yield call(restartDeviceService);
            
            yield put({
                type: 'firmware/updateSpinState',
                payload: { spinning: true}
            });

            let checkDeviceStatus = async () => {
                const { response, error } = await getConfigRequest();
                if (error) {
                    await ((ms) => new Promise(resolve => setTimeout(resolve, ms)))(1000);
                    checkDeviceStatus();
                }
            }
                        
            yield call(checkDeviceStatus);

            yield put({
                type: 'firmware/updateSpinState',
                payload: { spinning: false }
            });

        }


    }
}

export default Model;