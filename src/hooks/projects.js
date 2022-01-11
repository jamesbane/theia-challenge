import {PAGE_PROJECT_PATH} from '../router/constants';
import {setActiveItem} from '../store/modules/Bidding/actions';
import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {clearSearch, setSearchProfile} from '../store/modules/Search/actions';
import {setTrackItemDropdown, getTrackSongItem} from '../store/modules/Common/actions';

export function UseTrackItemMethods() {
    const history = useHistory();
    const dispatch = useDispatch();

    const onSelect = (item) => {
        dispatch(clearSearch());

        item && history.push(`${PAGE_PROJECT_PATH}/${item.id}/${item.owner.id}`, { ownerId: item.owner?.id, trackOwnerId: item.trackOwner?.id });
    };

    const onPlaceBid = (item) => dispatch(setActiveItem(item));

    const onDropdownTrackItem = (value) => dispatch(setTrackItemDropdown(value));

    const onGetTrackSongItem = (item) => dispatch(getTrackSongItem(item));

    return {
        onSelect,
        onPlaceBid,
        onDropdownTrackItem,
        onGetTrackSongItem
    }
}

export function UseWalletItemMethods() {
    // TODO: implement
    const history = useHistory();
    const dispatch = useDispatch();    
    const onSelect = (item) => {
        dispatch(clearSearch());
        dispatch(setSearchProfile(true));
        const ownerId = item?.id;
        if (ownerId) {
            item && history.push(`/profile/${ownerId}`);
        }
    };

    return {
        onSelect
    }
}

export function UseCollectionItemMethods() {
    // TODO: implement
    // const history = useHistory();
    // const dispatch = useDispatch();
    const onSelect = (
        // item
    ) => {};

    return {
        onSelect
    }
}

