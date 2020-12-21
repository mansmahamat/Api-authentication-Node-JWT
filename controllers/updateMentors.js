const Mentor = require("../models/Mentor");

exports.update = upload.single('avatar'), (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Remplissez les champs pour une modification"
    });
  }

  const id = req.params.id;
  

  Mentor.findByIdAndUpdate(id, {
    $set: {
      firstName: req.body.firstName,
    lastName: req.body.lastName,
    avatar: req.file.filename,
    //avatar: req.body.avatar,
    title: req.body.title,
    disponible: req.body.disponible,
    presentation: req.body.presentation,
    technos: req.body.technos,
    socials: req.body.socials,
    userId: req.body.userId
    }
  }, { useFindAndModify: false })
    .then(result => {
      if (!result) {
        res.status(404).send({
          message: `Ce Mentor n'existe pas`
        });
      } else res.send({ message: "Profil mis à jour" });
    })
    .catch(err => {
      res.status(500).send({
        err
      });
    });
  };