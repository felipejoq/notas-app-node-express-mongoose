const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const Usuario = require('../models/User');

passport.use(new LocalStrategy({
    usernameField: 'email'
}, async (email, password, done) => {
    const usuario = await Usuario.findOne({email: email});
    if(!usuario){
        // Si falla el email:
        return done(null, false, { message: 'Datos incorrectos'});
    }else{
        const contrasenaOk = await usuario.comparePassword(password);
        if(contrasenaOk){
            return done(null, usuario);
        }else{
            // Si falla la contraseña:
            return done(null, false,{ message: 'Datos incorrectos' })
        }
    }
}));

passport.serializeUser((user, done) => {
    console.log('Passport Serialize User ID: ', user.id);
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    console.log('Passport DesSerialize User ID: ', id);
    Usuario.findById(id, (err, userDB) => {
        done(err, userDB);
    });
});

module.exports = passport;