const { format, register } = require('timeago.js');
const localeFunc = require('../libs/timeago-ES');

const helpers = {};

// Time ago en español
register('mi-format', localeFunc);

helpers.formatDate = (date) => {
    return format(date, 'mi-format');
}

module.exports = helpers;