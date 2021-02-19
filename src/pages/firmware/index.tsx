import React, { FC, useEffect, useState } from 'react'
import { connect } from 'umi';
import { Upload, Card, Button, Row, Col, message} from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import { UploadOutlined, DownloadOutlined } from '@ant-design/icons';

interface FirmwareProps {

}

const Firmware: FC<FirmwareProps> = ({firmware, dispatch}) => {
    let zynqFileIsUploading = false, fpgaFileisUploading = false;
    const fpgaProps = {
        name: 'ultrascale_baseband_top.bit',
        action: '/api/firmware/fpga',
        onChange: (info) => {
            // if (info.file.status !== 'uploading') {
            //   console.log(info.file, info.fileList);
            // }
            if (info.file.status === 'done') {
              message.success(`${info.file.name} 更新成功`);
            } else if (info.file.status === 'error') {
              message.error(`${info.file.name} 更新失败`);
            }
          },
    }

    const zynqProps = {
        name: 'fpga.bit',
        action: '/api/firmware/zynq',
        onChange(info) {
            if (info.file.status === 'done' && zynqFileIsUploading) {
              message.success(`${info.file.name} 更新成功`);
              zynqFileIsUploading = false;
            } else if (info.file.status === 'error') {
              message.error(`${info.file.name} 更新失败`);
            }
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
            <Card bordered={false} title="固件更新">
                    <Row gutter={[16, 16]} justify="center">
                        <Col >
                            <Upload {...fpgaProps}>
                                <Button icon={<UploadOutlined />}>更新 Ultrascale Bit 文件</Button>
                            </Upload>
                        </Col>
                    </Row>
                    <Row justify="center">
                        <Col>
                            <Upload {...zynqProps}>
                                <Button icon={<UploadOutlined />}>更新 ZYNQ 文件</Button>
                            </Upload>
                        </Col>
                    </Row>
            </Card>
            <Card bordered={false} style={{"marginTop": 24}} title="文件下载">
                    <Row gutter={[16, 16]} justify="center">
                        <Col >
                            <Button icon={<DownloadOutlined />}>下载运行日志</Button>
                        </Col>
                    </Row>
                    <Row justify="center">
                        <Col>
                            <Button icon={<DownloadOutlined />}>下载冲激响应日志</Button>
                        </Col>
                    </Row>
            </Card>
        </PageContainer>
    )
};

export default connect(({ firmware } :
    {
        firmware: any;
    }) => ({
        firmware,
    }
))(Firmware);