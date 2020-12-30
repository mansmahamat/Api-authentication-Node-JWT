import { Document, Error } from "mongoose";
import { Request, Response } from 'express';

const Mentor = require("../models/Mentor");

const getOneMentors = (req: Request, res: Response) => {
    const id = req.params.id;
  
    Mentor.findById(id)
      .then((data: Document) => {
        if (!data)
          res.status(404).send({ message: "Not found Tutorial with id " + id });
        else res.send(data);
      })
      .catch((err : Error) => {
        res
          .status(500)
          .send({ message: "Error retrieving Tutorial with id=" + id });
      });

  };

  export default getOneMentors;
