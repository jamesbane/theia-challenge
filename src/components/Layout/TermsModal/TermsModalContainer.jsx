import React from 'react';
import TermsModal from './TermsModal';
import {useDispatch} from 'react-redux';
import {setAppliedTermsOfService} from '../../../store/modules/User/actions';

const isHideTermsOfService = process.env.REACT_APP_HIDE_POPUP_TERMS_OF_SERVICE === 'true';

export default function TermsModalContainer(props) {
    const dispatch = useDispatch();

    const data = window.localStorage.getItem('appliedTerms');

    const onApply = () => {
        dispatch(setAppliedTermsOfService(true));
        window.localStorage.setItem('appliedTerms', true);
    }

    return (
        <TermsModal
            visible={isHideTermsOfService ? false : (data !== 'true')}
            onCancel={onApply}
            {...props}
            {...{onApply}}
        />
    );
}
