import { handleActions } from 'redux-actions';
import {persistReducer} from 'redux-persist';
import localForage from 'localforage';
import {AppState} from '../../types';
import {PayloadAction} from "@reduxjs/toolkit";

const initialState: AppState = {
    isMobile: false,
    isTablet: false,
    isDesktop: false,
    connectModalVisible: false,
    load: {
        requesting: false,
        loaded: false
    },
    isAutoplay: false,
    isDarkMode: false,
    scrollIsLocked: false,
};

export const SET_IS_MOBILE = 'SET_IS_MOBILE';
export const SET_IS_TABLET = 'SET_IS_TABLET';
export const SET_IS_DESKTOP = 'SET_IS_DESKTOP';
export const SET_CONNECT_MODAL_VISIBLE = 'SET_CONNECT_MODAL_VISIBLE';
export const LOADING_REQUEST = 'LOADING_REQUEST';
export const LOADING_SUCCESS = 'LOADING_SUCCESS';
export const SET_AUTOPLAY = 'SET_AUTOPLAY';
export const SET_DARK_MODE = 'SET_DARK_MODE';
export const SET_SCROLL_IS_LOCKED = 'SET_SCROLL_IS_LOCKED';

let appActions = handleActions<AppState, {payload: boolean}>({
    [SET_SCROLL_IS_LOCKED]: (state, action: PayloadAction<any>) => ({
        ...state,
        scrollIsLocked: action.payload,
    }),
    [SET_DARK_MODE]: (state: AppState, action: PayloadAction<any>) => ({
        ...state,
        isDarkMode: action.payload,
    }),
    [SET_AUTOPLAY]: (state, action: PayloadAction<any>) => ({
        ...state,
        isAutoplay: action.payload,
    }),
    [SET_CONNECT_MODAL_VISIBLE]: (state, action: PayloadAction<any>) => ({
        ...state,
        connectModalVisible: action.payload,
    }),
    [SET_IS_MOBILE]: (state) => ({
        ...state,
        isMobile: true,
        isTablet: false,
        isDesktop: false
    }),
    [SET_IS_TABLET]: (state) => ({
        ...state,
        isMobile: false,
        isTablet: true,
        isDesktop: false
    }),
    [SET_IS_DESKTOP]: (state) => ({
        ...state,
        isMobile: false,
        isTablet: false,
        isDesktop: true
    }),
    [LOADING_REQUEST]: (state) => ({
        ...state,
        load: {
            ...state.load,
            requesting: true
        }
    }),
    [LOADING_SUCCESS]: (state) => ({
        ...state,
        load: {
            ...state.load,
            requesting: false,
            loaded: true
        }
    }),
}, initialState);

let appReducer = persistReducer({
    key: 'app',
    storage: localForage,
    whitelist: ['isDarkMode', 'isAutoplay']
}, appActions);

export default appReducer;
