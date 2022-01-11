export default function formatNumber(value, prefix='', fixed_amount=2, thousands_separator=',') {
    const newValue = normalizeValue(value);

    if (isNaN(value)) {
        return 'NaN';
    }

    return prefix + separateThousands(newValue.toFixed(fixed_amount), thousands_separator)
}

function normalizeValue(value) {
    if (typeof value === 'string') {
        return parseFloat(value)
    }

    return value;
}

function separateThousands(x, s) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, s);
}

export function formatBlockchainAddress(address, precision=4, precisionEnd) {
    if (!address) {
        return ''
    }

    return `${address.slice(0, precision+2)}...${address.slice(precisionEnd ? -precisionEnd : -precision)}`
}

export function isEmail(email) {
    //eslint-disable-next-line
    const re = /^([a-zA-Z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?)$/
    return !(re.test(email));
}

export function verifyUserName(username) {
    return ((!(/^[a-z0-9_-]{3,15}$/i.test(username))) || (/[A-Z]/).test(username));
}

export function verifyLink(account) {
    return !(account.charAt(0) === '@');
}

export function isLinkCustom(link) {
    const re =  new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return !(re.test(link));
}
export const getQueryParam = (name, defaultData = '') => {
    const q = window.location.search.match(new RegExp('[?&]' + name + '=([^&#]*)'));
    return q ? q[1] : defaultData;
};

export const PATTERN='[0-9]*'
export const INPUTMODE='numeric'