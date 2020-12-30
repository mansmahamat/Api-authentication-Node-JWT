"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const mentorSchema = new mongoose_1.Schema({
    firstName: {
        type: String,
        required: true,
        min: 3,
        max: 100,
    },
    lastName: {
        type: String,
        required: true,
        max: 100,
        min: 6
    },
    avatar: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
        max: 1024,
        min: 6
    },
    presentation: {
        type: String,
        required: true,
        max: 1024,
        min: 6
    },
    technos: {
        type: Array,
        required: false,
        max: 1024,
        min: 6
    },
    socials: {
        type: Array,
        required: false,
        max: 1024,
        min: 6
    },
    userId: {
        type: String,
        required: false,
        max: 1024,
        min: 6
    },
    disponible: {
        type: String,
        required: false,
        max: 1024,
        min: 6
    },
    cloudinary_id: {
        type: String,
        required: false
    },
    date: {
        type: Date,
        default: Date.now
    }
});
exports.default = mongoose_1.default.model('Mentor', mentorSchema);
//# sourceMappingURL=Mentor.js.map