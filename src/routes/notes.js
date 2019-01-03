const router = require("express").Router();
const Note = require("../models/Note");
const { estaAutenticado } = require('../helpers/auth');

router.get("/add", estaAutenticado, (req, res) => {
  res.render("notes/add-notes");
});

router.post("/add", estaAutenticado, async (req, res) => {
  const { title, description } = req.body;

  const errors = [];

  if (!title) {
    errors.push({ mensaje: "Escriba un título" });
  }
  if (!description) {
    errors.push({ mensaje: "Escriba una descripción" });
  }

  if (errors.length > 0) {
    res.render("notes/add-notes", {
      errors,
      title,
      description
    });
  } else {
    const notaNueva = new Note({ title, description, usuario_id: req.user._id });
    await notaNueva.save();

    req.flash('exito_msg', '¡La nota fue agrada con éxito!');

    res.redirect("/notes");
  }
});

router.get("/", estaAutenticado, async (req, res) => {
  const notas = await Note.find({ usuario_id : req.user._id}).sort({ date: "desc" });

  res.render("notes/list-notes", { notas });
});

router.get('/edit/:id', estaAutenticado, async (req, res) => {

    const nota = await Note.findById(req.params.id);

    console.log(nota);

    res.render('notes/edit-notes', { nota });

});

router.put('/edit-note/:id', estaAutenticado, async (req, res) => {
    const { title, description } = req.body;

    const notaUpdate = await Note.findByIdAndUpdate(req.params.id, { title, description });

    req.flash('exito_msg', '¡La nota fue editada con éxito!');

    res.redirect('/notes');

});

router.delete('/delete/:id', estaAutenticado, async (req, res) => {
    await Note.findByIdAndDelete(req.params.id);

    req.flash('error_msg', '¡La nota fue eliminada exitosamente!');

    res.redirect('/notes');
});

module.exports = router;
