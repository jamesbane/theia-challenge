import React, { Component } from 'react';
import {
    Upload,
    message
} from 'antd';
import http from '../../../../services/http';
import Button from '../../../Button';

import style from './UploadAvatar.module.scss';

class UploadAvatar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            imageUrl: null,
            error: false,
            loading: false,
            fileList: props.defaultFileList,
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

    uploadImage = async options => {
        const { uploadUrl, getProgress, getLoading } = this.props;
        const { onSuccess, onError, file, onProgress } = options;

        const fmData = new FormData();
        const config = {
            headers: { 'content-type': 'multipart/form-data'},
            onUploadProgress: event => {
                const percent = Math.floor((event.loaded / event.total) * 100);
                getProgress(percent);
                this.setState({
                    progress: percent,
                    loading: true
                }, () => getLoading(this.state.loading));
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
                fileList: [res.data],
                loading: false
            }, () => getLoading(this.state.loading));

            this.props.onChange(false)(res.data);
        } catch (err) {
            onError({ err });
            this.setState({
                imageUrl: null,
                error: true,
                fileList: [],
                loading: false
            }, getLoading(this.state.loading));
            this.props.onChange(true)();
        }
    };

    render() {
        const { error, fileList, loading} = this.state;

        return (
            <Upload
                name="file"
                className={style.container}
                fileList={fileList}
                showUploadList={!error}
                accept={'.png, .jpg, .jpeg, .svg, .gif'}
                customRequest={this.uploadImage}
            >
                <Button
                    wrapperClass={style.uploadBtn}
                    text={'Upload'}
                    blue
                    compact
                    onClick={() => {}}
                    disabled={loading}
                    // loading={loading}
                />
            </Upload>
        )
    }
}

export default UploadAvatar;

