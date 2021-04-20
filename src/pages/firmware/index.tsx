import React, { FC, useEffect, useState } from 'react'
import { connect } from 'umi';
import { Upload, Card, Button, Row, Col, message, Spin} from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import { UploadOutlined, DownloadOutlined, SyncOutlined, PauseOutlined} from '@ant-design/icons';
import { StateType } from './model'

interface FirmwareProps {
    dispatch: Dispatch<any>;
    firmware: StateType
}

const Firmware: FC<FirmwareProps> = ({firmware, dispatch}) => {
    let zynqFileIsUploading = false, fpgaFileIsUploading = false;

    const fpgaProps = {
        name: 'ultrascale_baseband_top.bit',
        onChange(info) {

            let fileList = [...info.fileList];
            
            fileList = fileList.slice(-1);

            if (info.file.status === 'done' && fpgaFileIsUploading) {
              message.success(`${info.file.name} 更新成功`);
              fpgaFileIsUploading = false;
            } else if (info.file.status === 'error') {
              message.error(`${info.file.name} 更新失败`);
            }

            dispatch({
                type: 'firmware/updateFpgaFileList',
                payload: fileList
            })
        },
        customRequest: (options) => {
            fpgaFileIsUploading = true;
            dispatch({
                type: 'firmware/uploadUltrascaleFirmware',
                payload: options
            }) 
        }
    }

    const zynqProps = {
        name: 'fpga.bit',
    
        onChange(info) {
            let fileList = [...info.fileList];
            
            fileList = fileList.slice(-1);

            if (info.file.status === 'done' && zynqFileIsUploading) {
              message.success(`${info.file.name} 更新成功`);
              zynqFileIsUploading = false;
            } else if (info.file.status === 'error') {
              message.error(`${info.file.name} 更新失败`);
            }

            dispatch({
                type: 'firmware/updateZynqFileList',
                payload: fileList
            })
        },
        customRequest: (options) => {
            zynqFileIsUploading = true;
            dispatch({
                type: 'firmware/uploadZynqFirmware',
                payload: options
            })
            // var sendChunk = function(offset) {
            //     var chunk = data.subarray(offset, offset + 4086) || '';
            //     var opts = {method: 'POST', body: chunk};
            //     var url = '/api/firmware/zynq?offset=' + offset + '&name=' + encodeURIComponent(filename);

            //   };
            // sendChunk(0);
        }
    }

    return (
        <PageContainer content="">
            <Spin size="large" spinning={firmware.spinning}>
            <Card bordered={false} title="固件更新">
                    <Row gutter={[16, 16]}>
                        <Col >
                            <Upload {...fpgaProps} fileList={firmware.fpgaFileList}>
                                <Button icon={<UploadOutlined />}>更新 Ultrascale Bit 文件</Button>
                            </Upload>
                        </Col>
                        
                    </Row>
                    <Row gutter={[16, 16]}>
                        <Col>
                            <Upload {...zynqProps} fileList={firmware.zynqFileList}>
                                <Button icon={<UploadOutlined />}>更新 ZYNQ 文件</Button>
                            </Upload>
                        </Col>
                    </Row>
            </Card>
            <Card bordered={false} style={{"marginTop": 24}} title="文件下载">
                    <Row gutter={[16, 16]}>
                        <Col >
                            <Button icon={<DownloadOutlined />} onClick={() => {
                                dispatch({
                                    type: "firmware/downloadLog"
                                });
                            }}>下载运行日志</Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Button icon={<DownloadOutlined />} onClick={() => {
                                dispatch({
                                    type: "firmware/downloadImpulse"
                                });
                            }}>下载冲激响应日志</Button>
                        </Col>
                    </Row>
            </Card>
            <Card bordered={false} style={{"marginTop": 24}} title="设备控制">
                    <Row gutter={[16, 16]}>
                        <Col >
                            <Button icon={<SyncOutlined />} onClick={() => {
                                dispatch({
                                    type: "firmware/restartProgram"
                                });
                            }}>重启控制程序</Button> 
                        </Col>
                        <Col>
                            <Button icon={<PauseOutlined />} onClick={() => {
                                dispatch({
                                    type: "firmware/stopProgram"
                                })
                            }}>停止控制程序</Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col >
                            <Button danger icon={<SyncOutlined />} onClick={() => {
                                dispatch({
                                    type: "firmware/restartDevice"
                                });
                            }}>重启基带板</Button>
                        </Col>
                    </Row>
            </Card>
            </Spin>
        </PageContainer>
    )
};

export default connect(
    ({ firmware} :
    {
        firmware: StateType,
    }) => ({
        firmware,
    }
))(Firmware);