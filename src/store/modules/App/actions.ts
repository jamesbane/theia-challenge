import { createActions, createAction } from 'redux-actions';
import {
    LOADING_REQUEST,
    LOADING_SUCCESS,
    SET_AUTOPLAY,
    SET_CONNECT_MODAL_VISIBLE,
    SET_DARK_MODE,
    SET_IS_DESKTOP,
    SET_IS_MOBILE,
    SET_IS_TABLET
} from './reducer';

export const setAutoplay = createAction(SET_AUTOPLAY);
export const setDarkMode = createAction(SET_DARK_MODE);
export const setIsMobile = createAction(SET_IS_MOBILE);
export const setIsTablet = createAction(SET_IS_TABLET);
export const setIsDesktop = createAction(SET_IS_DESKTOP);
export const setConnectModalVisible = createAction(SET_CONNECT_MODAL_VISIBLE);

const { loadingRequest, loadingSuccess } = createActions({
    [LOADING_REQUEST]: () => { },
    [LOADING_SUCCESS]: () => { }
});

export const loadApp = () => dispatch => {
    dispatch(loadingRequest());
    setTimeout(() => dispatch(loadingSuccess()), 2000)
};