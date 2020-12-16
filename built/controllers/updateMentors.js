"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Mentor = require("../models/Mentor");
const updateMentors = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Remplissez les champs pour une modification"
        });
    }
    const id = req.params.id;
    Mentor.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then((data) => {
        if (!data) {
            res.status(404).send({
                message: `Ce Mentor n'existe pas`
            });
        }
        else
            res.send({ message: "Profil mis à jour" });
    })
        .catch((err) => {
        res.status(500).send({
            message: "Erreur" + id
        });
    });
};
exports.default = updateMentors;
//# sourceMappingURL=updateMentors.js.map