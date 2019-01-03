const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/notas_app', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false
}).then(db => console.log('La base de datos está Online'))
  .catch(e => console.log('Hubo un error en la base de datos'));

module.exports = mongoose;