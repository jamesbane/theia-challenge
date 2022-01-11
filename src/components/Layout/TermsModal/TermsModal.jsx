import React, {useState} from 'react';
import Modal from '../../Modal';
import {Checkbox} from 'antd';
import Button from '../../Button';

import style from './TermsOfServiceModal.module.scss';

export default function TermsModal(props) {
    const { wrapperClass, onApply, ...restProps } = props;
    const [checked, setChecked] = useState(false);

    return (
        <Modal
            wrapperClass={wrapperClass}
            width={390}
            simple
            {...restProps}
        >
            <h2 className={style.heading}>
                Nifter Terms of Service
            </h2>
            <p className={style.text}>
                Lorem ipsum dolor sit amet, consectetur adip
                iscing elit, sed do eiusmod tempor incididuntai
                ut labore et dolor incididunt ut labore et dolor
                e magna aliqua.
            </p>
            <label className={style.checkboxContainer}>
                <Checkbox
                    className={style.checkbox}
                    checked={checked}
                    onChange={() => setChecked(!checked)}
                />
                I accept the Nifter Terms of Service
            </label>
            <Button
                wrapperClass={style.button}
                text={'Proceed'}
                primary
                blue
                disabled={!checked}
                onClick={onApply}
            />
        </Modal>
    );
}
