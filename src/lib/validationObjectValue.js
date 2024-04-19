export function ValidationObjectValue(myObject) {
    if (!myObject) return false;

    for (const key in myObject) {
        if (!isValidValue(myObject[key])) {
            return false
        }
    }

    return true
}

function isValidValue(value) {
    return value !== null && value !== '' && value !== 0;
}