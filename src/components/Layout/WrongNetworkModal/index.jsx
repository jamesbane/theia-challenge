import React from 'react';
import Modal from '../../Modal';
import loading from '../../../assets/img/loading.png';

import style from './WrongNetworkModal.module.scss';

export default function WrongNetworkModal(props) {
    const { wrapperClass, ...restProps } = props;

    return (
        <Modal
            wrapperClass={wrapperClass}
            title={'Connect to a wallet'}
            width={390}
            closable={false}
            {...restProps}
        >
            <img src={loading} alt="" className={style.loading}/>
            <h3 className={style.title}>
                Wrong network
            </h3>
            <p className={style.text}>
                Change network to ETH
            </p>
        </Modal>
    );
}
