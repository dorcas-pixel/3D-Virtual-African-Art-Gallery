"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkExt = void 0;
const path = require('path');
const checkExt = function (file, cb, type = 'std') {
    let allowed = std();
    if (type == 'multi')
        allowed = multi();
    else if (type == 'images')
        allowed = images();
    else if (type == 'video')
        allowed = video();
    else if (type == 'model')
        allowed = model();
    else if (type == 'zip')
        allowed = zip();
    let fileExt = path.extname(file.originalname);
    let ext = allowed.test(fileExt.toLowerCase());
    let mimetype = allowed.test(file.mimetype);
    if (!mimetype || !ext) {
        const err = new Error(fileExt + ' is not allowed!');
        err['code'] = 'FILE_TYPE_NOT_ALLOWED';
        return cb(err);
    }
    cb(null, true);
};
exports.checkExt = checkExt;
const images = () => {
    return /jpg|jpeg|png/;
};
const std = () => {
    return /jpg|jpeg|png|pdf|doc|docx|zip|zar|7z|ppt|pptx/;
};
const multi = () => {
    return /jpg|jpeg|png|pdf|doc|docx|zip|zar|7z|ppt|pptx|mp3|mp4|avi|mkv|ts/;
};
const video = () => {
    return /mp4|avi|mkv|ts/;
};
const model = () => {
    return /gltf/;
};
const zip = () => {
    return /zip|rar|7zip/;
};
//# sourceMappingURL=filetypes.js.map