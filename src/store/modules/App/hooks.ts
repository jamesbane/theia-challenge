import {useDispatch, useSelector} from 'react-redux';
import {useCallback, useEffect} from 'react';
import {BREAKPOINTS} from './constants';
import {loadApp, setIsDesktop, setIsMobile, setIsTablet} from './actions';
import {AppState, State} from "../../types";

export function UseAppInit() {
    /*
        Basic initialization logic for the module:
        init scripts, event listeners, etc...
    */

    const dispatch = useDispatch();
    const {isMobile, isTablet, isDesktop} = useSelector<State, AppState>(state => state.app);

    // RESIZE LOGIC

    const onResize = useCallback(() => {
        if ((window.innerWidth < BREAKPOINTS.MD_MIN) && !isMobile) {
            dispatch(setIsMobile())
        } else if ((window.innerWidth > BREAKPOINTS.SM_MAX) && (window.innerWidth < BREAKPOINTS.LG_MIN) && !isTablet) {
            dispatch(setIsTablet())
        } else if ((window.innerWidth > BREAKPOINTS.MD_MAX) && !isDesktop) {
            dispatch(setIsDesktop())
        }
    }, [dispatch, isMobile, isTablet, isDesktop]);

    useEffect(() => {
        onResize();
        window.addEventListener('resize', onResize);

        return () => {
            window.removeEventListener('resize', onResize);
        }
    }, [onResize]);

    // LOADER LOGIC

    useEffect(() => {
        dispatch(loadApp());
    }, [dispatch]);
}