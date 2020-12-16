import { Request, Response } from 'express';
import { Document, Error } from 'mongoose';
const Mentor = require("../models/Mentor");

const updateMentors =  (req: Request, res: Response) => {
    if (!req.body) {
      return res.status(400).send({
        message: "Remplissez les champs pour une modification"
      });
    }
  
    const id = req.params.id;
  
    Mentor.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then((data: Document) => {
        if (!data) {
          res.status(404).send({
            message: `Ce Mentor n'existe pas`
          });
        } else res.send({ message: "Profil mis à jour" });
      })
      .catch((err: Error )=> {
        res.status(500).send({
          message: "Erreur" + id
        });
      });
  };

  export default  updateMentors;