import React from 'react';
import Modal from '../Modal';
import Button from '../Button';

import style from './RemoveFromSale.module.scss';
import { useDispatch } from 'react-redux';
import { removeFromSale } from '../../store/modules/TrackOwner/actions';
import { useSelector } from 'react-redux';

export default function RemoveFromSaleModal(props) {
    const {
        wrapperClass,
        item,
        ...restProps
    } = props;

    const dispatch = useDispatch();
    const requesting = useSelector(state => state.trackOwner.trackOwnerRemoveFromSale.requesting);

    const handleRemove = () => {
        dispatch(removeFromSale(item?.tokenId));
    }

    if (!item) {
        return <></>
    }
    return (
        <Modal
            wrapperClass={wrapperClass}
            title={'Take off market'}
            width={390}
            {...restProps}
        >
            <h3 className={style.heading}>
                <span className={style.bold}>Take off market</span><br/>
            </h3>
            <div className={style.purchaseDescription}>
                <span>Are you sure to take off market?</span>
            </div>
            <Button
                wrapperClass={style.button}
                text={'Take off'}
                primary
                blue
                loading={requesting}
                onClick={handleRemove}
            />
        </Modal>
    );
}
