const auth = {};

auth.estaAutenticado = (req, res, next) => {
    if(req.isAuthenticated()){
        console.log('Usuario logeado: ', req.isAuthenticated());
        return next();
    }
    req.flash('error_msg', 'Usted no está autorizado');
    res.redirect('/users/ingresar');
}

module.exports = auth;