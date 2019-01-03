const router = require('express').Router();
const Usuario = require('../models/User');

const passport = require('passport');

router.get("/ingresar", (req, res) => {
  res.render("users/ingresar");
});

router.post('/ingresar', passport.authenticate('local',{
  successRedirect: '/notes',
  failureRedirect: '/users/ingresar',
  failureFlash: true
}));

router.get("/registrarse", (req, res) => {
  res.render("users/registrarse");
});

router.post("/registrarse", async (req, res) => {
  const { name, email, password, password2 } = req.body;

  const errors = [];

  if(name.trim().length <= 0){
    errors.push({
        mensaje: 'Debe incluir su nombre en el formulario.'
    });
  }

  if (password !== password2) {
    errors.push({
        mensaje: "Las contraseñas no coinciden"
    });
  }
  if (password.length < 3) {
    errors.push({
      mensaje: "La contraseña al menos debe tener más de 3 caracteres."
    });
  }

  if(errors.length > 0){
      res.render('users/registrarse', { errors, name, email });
  }else{
    
    const existeUsuario = await Usuario.findOne({email: email});

    if(existeUsuario){
        req.flash('error_msg', '¡Correo ya registrado!');

        res.redirect('/users/registrarse');
    }else{
        const nuevoUser = new Usuario({name, email, password});
        nuevoUser.password = await nuevoUser.encryptPassword(password);
        await nuevoUser.save();
    
        req.flash('exito_msg', '¡Te has registrado con éxito!');
    
        res.redirect('/users/ingresar');
    }

  }

});

router.get('/salir', (req, res) => {
  req.logOut();
  res.redirect('/');
});

module.exports = router;
