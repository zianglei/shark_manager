/**
 * 系统的全局配置
 */

import type { Reducer } from 'umi';

export type ConfigModelState = {
    currentRole: number; // send or receive
};

export type ConfigModelType = {
    namespace: 'config';
    state: ConfigModelState;
    reducers: {
        setCurrentConfigRole: Reducer<ConfigModelState>;
    }
};

const ConfigModel: ConfigModelType = {
    namespace: 'config',
    state: {
        currentRole: 0,
    },
    reducers: {
        setCurrentConfigRole(state, action) {
            return {
                ...state,
                currentRole: action.payload
            }
        }
    }
};

export default ConfigModel;