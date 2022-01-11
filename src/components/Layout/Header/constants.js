import {
    PAGE_EXPLORE_PATH,
    PAGE_ABOUT_PATH,
    PAGE_PROFILE_PATH,
    PAGE_CREATE_SONG_PATH
} from '../../../router/constants';

export const HEADER_NAVIGATION_ITEMS = [
    {name: 'Explore', path: PAGE_EXPLORE_PATH},
    {name: 'My Items', path: PAGE_PROFILE_PATH},
    {name: 'About', path: PAGE_ABOUT_PATH},
    {name: 'Create', path: PAGE_CREATE_SONG_PATH},
];

export const USER_MENU_ACTION_TYPES = {
    VIEW_PROFILE: 'view_profile',
    DISCONNECT: 'disconnect',
    TOGGLE_AUTOPLAY: 'toggle_autoplay',
    TOGGLE_DARK_MODE: 'toggle_dark_mode',
    EDIT_PROFILE: 'edit_profile'
};
