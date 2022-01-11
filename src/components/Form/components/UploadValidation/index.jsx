import React, { Component } from 'react';

import {
    Upload,
    message,
    Modal
} from 'antd';

import UploadCustom from './CustomUpload';

import style from './UploadValidation.module.scss';
import CustomUploadedItem from './CustomUploadedItem';
import http from '../../../../services/http';
import UploadingProgress from './UploadingProgress';

class UploadValidation extends Component {
    constructor(props) {
        super(props);

        this.state = {
            imageUrl: null,
            error: false,
            loading: false,
            fileList: props.defaultFileList,
            previewVisible: false,
            previewFile: '',
            selectedFile: null,
            progress: 0
        };
    }

    getBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    };

    handleCancel = () => {
        const { type } = this.props;

        if (type === 'audio') {
            const audio = document.getElementsByClassName(style.audioPreview);
            audio[0].pause();
            audio[0].currentTime = 0;
        }

        this.setState({ previewVisible: false });
    }

    handlePreview = async file => {
        if (!file.url && !file.preview) {
            file.preview = await this.getBase64(file.originFileObj);
        }

        this.setState({
            previewFile: file.url || file.preview,
            previewVisible: true
        });
    };

    getUploadFieldProps = () => {
        const uploadProps = {
            onRemove: (
                // file
            ) => {
                this.setState({ imageUrl: null, error: false, fileList: [] });
                this.props.onChange(false)(null);
            },
            beforeUpload: (file) => {
                const isLt10M = file.size / 1024 / 1024 < 10;

                if (!isLt10M) {
                    this.setState({
                        imageUrl: null,
                        error: true,
                        fileList: [file]
                    }, () => this.props.onChange(this.state.error)());

                    return message.error('too large!');
                }

                const reader = new FileReader();
                reader.readAsDataURL(file);

                reader.onloadend = () => {
                    file.url = reader.result;

                    this.setState({
                        imageUrl: file,
                        error: false,
                        fileList: [file]
                    }, () => this.props.onChange(this.state.error)(file));
                };

                return false;
            }
        };

        return { ...uploadProps };
    };

    handleFileInput = (e) => this.setState({ selectedFile: e.target.files[0] });

    renderHeaderCustom = () => (
        <div className={style.header}>
            <p className={style.changeFile}>Change File</p>
        </div>
    );

    uploadImage = async options => {
        const { uploadUrl } = this.props;
        const { onSuccess, onError, file, onProgress } = options;

        const fmData = new FormData();
        const config = {
            headers: { 'content-type': 'multipart/form-data'},
            onUploadProgress: event => {
                const percent = Math.floor((event.loaded / event.total) * 100);
                this.setState({
                    progress: percent
                });
                if (percent === 100) {
                    setTimeout(() => this.setState({ progress: 0}), 1000);
                }
                onProgress({ percent: (event.loaded / event.total) * 100 });
            }
        };
        fmData.append('file', file);
        try {
            const res = await http.post(
                uploadUrl,
                fmData,
                config
            );

            onSuccess('Ok');
            this.setState({
                imageUrl: res.data.url,
                error: false,
                fileList: [res.data]
            });

            this.props.onChange(false)(res.data);
        } catch (err) {
            onError({ err });
            this.setState({
                imageUrl: null,
                error: true,
                fileList: []
            });
            this.props.onChange(true)();
        }
    };

    render() {
        const { error, fileList, previewVisible, previewFile, progress } = this.state;
        const { headerCustom, wrappedClass, type, title, subtitle } = this.props;

        const uploadProps = this.getUploadFieldProps();

        return (
            <div className={style.container}>
                {headerCustom && (
                    <div className={style.headerCustom}>
                        <h2 className={style.preview}>Preview</h2>
                    </div>
                )}

                <div className={style.uploadContainer}>
                    <Upload
                        name="file"
                        listType="picture-card"
                        className={wrappedClass}
                        fileList={fileList}
                        showUploadList={!error}
                        // onPreview={this.handlePreview}
                        accept={type === 'audio' ? '.mp3,.wav,.m4a,.wma' : '.png, .jpg, .svg, pdf/*'}
                        customRequest={this.uploadImage}
                        itemRender={(originNode, file) => {
                            return (
                                <CustomUploadedItem file={file} type={type} uploadProps={uploadProps}/>
                            )
                        }}
                    >
                        {headerCustom ? (
                            this.renderHeaderCustom()
                        ) : progress > 0 ?
                            <UploadingProgress title={title} progress={progress} />
                            : <UploadCustom type={type} fileList={fileList} uploadProps={uploadProps} title={title} subtitle={subtitle}/>
                        }
                    </Upload>

                    <Modal
                        visible={previewVisible}
                        footer={null}
                        onCancel={this.handleCancel}
                        centered
                    >
                        {type === 'image' ? (
                            <img alt="example" className={style.imagePreview} src={previewFile} />
                        ) : (
                            <audio className={style.audioPreview} controls>
                                <source src={previewFile} />
                            </audio>
                        )}
                    </Modal>
                </div>
            </div>
        );
    }
}

export default UploadValidation;
