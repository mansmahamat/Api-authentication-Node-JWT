import {  Request, Response } from 'express';
import Mentor from "../models/Mentor";

const deleteMentors = (req : Request, res : Response) => {
    const id: String = req.params.id;
  
    Mentor.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Ce Mentor n'existe pas`
          });
        } else {
          res.send({
            message: "Mentor supprimé!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Erreur" + id
        });
      });
  };

  export default deleteMentors;