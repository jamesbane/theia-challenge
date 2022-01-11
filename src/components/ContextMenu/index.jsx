import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Popconfirm } from 'antd';
import style from './ContextMenu.module.scss';
import {UseTrackItemMethods} from '../../hooks/projects';
import {TRACK_ITEM_MENU_USER_OPTIONS} from '../Track/constants';
import Button from '../Button';
import {setConnectModalVisible} from '../../store/modules/App/actions';

import Panel from '../Panel';

export default function ContextMenu(props) {
    const dispatch = useDispatch();
    const { onGetTrackSongItem } = UseTrackItemMethods();
    const address = useSelector(state => state.user?.userAccount?.accounts[0] ?? '');
    const {onClick, items, trackInfo, scroll, onHideTrackOwned, onCancelHideTrackOwner} = props;

    const downloading = (item, i) => (
        <li
            key={i}
            className={style.itemDownload}
            onClick={() => {
                onClick(item)
                onGetTrackSongItem(trackInfo)
            }}
        >
            <a href={trackInfo.audio} download>{item}</a>
        </li>
    )

    return (
        <Panel wrapperClass={style.container} scroll={scroll}>
            {
                !address ? (
                    <Button
                        wrapperClass={style.button}
                        text={'Connect Wallet'}
                        small
                        outline
                        gradient
                        onClick={() => dispatch(setConnectModalVisible(true))}
                    />
                ) : (
                    <ul className={style.items}>
                        {items && items.map((item, i) => (
                            item === TRACK_ITEM_MENU_USER_OPTIONS.HIDE_FROM_OWNED ? (
                                <li
                                    className={style.itemPopconfirm}
                                    key={i}
                                    onClick={() => {
                                        onClick(item)
                                        onGetTrackSongItem(trackInfo)
                                    }}
                                >
                                    <Popconfirm
                                        title="Are you sure？"
                                        okText="Yes"
                                        placement="bottomLeft"
                                        onCancel={onCancelHideTrackOwner}
                                        onConfirm={onHideTrackOwned}
                                    >
                                        {TRACK_ITEM_MENU_USER_OPTIONS.HIDE_FROM_OWNED}
                                    </Popconfirm>
                                </li>
                            ) : (
                                item === TRACK_ITEM_MENU_USER_OPTIONS.DOWNLOAD ? (
                                    downloading(item, i)
                                ) : (
                                    <li
                                        className={style.item}
                                        key={i}
                                        onClick={() => {
                                            onClick(item)
                                            onGetTrackSongItem(trackInfo)
                                        }}
                                    >
                                        {item}
                                    </li>
                                )
                            )
                        ))}
                    </ul>
                )
            }
        </Panel>
    )
}