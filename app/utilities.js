export function propExistsInArray(array, prop, value) {
    // checks array to see if an object with a specific prop/value exists
    return array.some(function(item) {
        return item[prop] === value;
    });
}

export function sortArrayByObjectProp(array, prop) {
    array.sort(function(a, b) {
        if (a[prop] < b[prop]) return -1;
        if (a[prop] > b[prop]) return 1;
        return 0;
    });
}

export function deleteItemFromArrayById(array, id) {
    for (var i = 0; i < array.length; i++) {
        var obj = array[i];
        if (obj.id === id) {
            array.splice(i, 1);
            return array;
        }
    }
    return array;
}

export function logError(error) {
    console.log('ERROR:', error.name, error);
    let message = '';
    if (error.errors) {
        error.errors.forEach((err) => {
            if (message === '') message = err.message;
            console.log('       type:', err.type);
            console.log('       message:', message);
        });
    }

    let errorString = 'ERROR: ' + error.name;
    if (message) errorString += '\n' + message;

    window.alert(errorString);
}

export function colorLog(message, color, bold = false) {
    // TRY TO WRITE THIS SO THAT YOU CAN PASS MULTIPLE OBJECTS TO PRINT
    
    let style = color ? 'color:' + color : 'color:black';

    if (bold) style += '; font-weight:bold';

    console.log('%c' + message, style);
}

export function getRandomItemFromArray(array) {
    return array[Math.floor(Math.random() * array.length)];
}

export function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}
