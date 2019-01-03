const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const morgan = require('morgan');
const bodyParser  = require('body-parser');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');

// Inicializaciones
const app = express();
require('./database');
require('./config/passport');

// Configuraciones
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    helpers: require('./helpers/helpers-hbs'),
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

// Middlewares
app.use(session({
    secret: 'bZdhL4ZUcAWYUJRcKXqdHTAn',
    resave: true,
    saveUninitialized: true
}));
app.use(morgan('dev'));
app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Variables globales
app.use((req, res, next) =>{

    res.locals.exito_msg = req.flash('exito_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    app.locals.user = req.user;

    next();
});

// Rutas
app.use(require('./routes/index'));
app.use('/notes', require('./routes/notes'));
app.use('/users', require('./routes/users'));

// Path público
app.use(express.static(path.join(__dirname, 'public')));

// Inicia Servidor
app.listen(app.get('port'), (err) => {
    console.log('Servidor trabajando en http://localhost:' + app.get('port'));
});