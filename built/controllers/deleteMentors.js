"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Mentor_1 = __importDefault(require("../models/Mentor"));
const deleteMentors = (req, res) => {
    const id = req.params.id;
    Mentor_1.default.findByIdAndRemove(id)
        .then(data => {
        if (!data) {
            res.status(404).send({
                message: `Ce Mentor n'existe pas`
            });
        }
        else {
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
exports.default = deleteMentors;
//# sourceMappingURL=deleteMentors.js.map