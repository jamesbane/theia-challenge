import React from 'react';
import {FORM_FIELD_TYPES} from '../../constants';

import TextInput from './TextInput';
import TextArea from './TextArea';
import DropDownInput from './DropDownInput';
import DateInput from './DateInput';
import RangeInput from './RangeInput';
import NumberInput from './NumberInput';
import ExchangeInput from './ExchangeInput';
import LinkInput from './LinkInput';
import SwitchInput from './SwitchInput';

export default function Input (props) {
    const {type} = props;

    switch (type) {
    case FORM_FIELD_TYPES.AREA: return <TextArea {...props} />;
    case FORM_FIELD_TYPES.TEXT: return <TextInput {...props} />;
    case FORM_FIELD_TYPES.SELECT: return <DropDownInput {...props}/>;
    case FORM_FIELD_TYPES.DROPDOWN: return <DropDownInput {...props} iconDropdown/>;
    case FORM_FIELD_TYPES.DATE: return <DateInput {...props}/>;
    case FORM_FIELD_TYPES.RANGE: return <RangeInput {...props}/>;
    case FORM_FIELD_TYPES.NUMBER:
    case FORM_FIELD_TYPES.INTEGER:
        return <NumberInput {...props}/>;
    case FORM_FIELD_TYPES.EXCHANGE: return <ExchangeInput {...props}/>;
    case FORM_FIELD_TYPES.LINK: return <LinkInput {...props}/>;
    case FORM_FIELD_TYPES.SWITCH: return <SwitchInput {...props}/>;
    default:
        return <TextInput {...props} />
    }
}