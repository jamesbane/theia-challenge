import React, {useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Footer from './Footer';
import Loader from './Loader';
import ConnectToWalletModal from './ConnectToWalletModal';
import {setConnectModalVisible} from '../../store/modules/App/actions';
import WrongNetworkModal from './WrongNetworkModal';
import {HeaderContainer} from './Header';
import cn from 'classnames';
import {LAYOUT_TYPES} from './constants';

import style from './Layout.module.scss';
import {AppState, State, UserState} from '../../store/types';

export default function Layout(props) {
    const dispatch = useDispatch();
    const {type=LAYOUT_TYPES.PAGE} = props;
    const {connectModalVisible, load:{loaded}} = useSelector<State, AppState>(state => state.app);
    const {wrongNetwork} = useSelector<State, UserState>(state => state.user);
    const [isOpen, setIsOpen] = useState(false);

    const isDashboard = type === LAYOUT_TYPES.DASHBOARD;

    return (
        <div id={'scrollArea'} className={cn(style.container, {
            [style.dashboard]: isDashboard
        })}>
            <div className={cn(style.fade, {[style.fadeActive]: isOpen})} onClick={() => setIsOpen(false)}/>
            <HeaderContainer
                fullWidth={isDashboard}
                menuOpen={isOpen}
                onHamburgerClick={() => setIsOpen(!isOpen)}
            />
            <main className={style.main}>{props.children}</main>
            {!isDashboard && (
                <Footer/>
            )}
            <Loader isVisible={!loaded}/>
            <ConnectToWalletModal
                visible={connectModalVisible}
                onCancel={() => dispatch(setConnectModalVisible(false))}
            />
            <WrongNetworkModal visible={wrongNetwork}/>
        </div>
    )
}