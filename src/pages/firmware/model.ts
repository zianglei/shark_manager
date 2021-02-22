import { chunk } from 'lodash';
import { Effect } from 'umi';
import { uploadZynqService, uploadUltrascaleService} from './service';

export interface ModelType {
    namespace: string;
    state: {
        zynqFileisUploading: boolean;
        fpgaFileisUploading: boolean;
    };
    effects: {
        uploadZynqFirmware: Effect;
        uploadUltrascaleFirmware: Effect;
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
        }
    }
}

export default Model;