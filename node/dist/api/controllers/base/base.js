"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BaseController {
    resWrap;
    constructor(resWrap) {
        this.resWrap = resWrap;
        this.resWrap = resWrap;
    }
    wrap = (serviceMethod) => (req, res) => {
        this.resWrap(async (response) => {
            return await serviceMethod.call(response, req.body);
        }, res);
    };
    signOut = (req, res) => {
        this.resWrap((response) => {
            res.clearCookie('_gallery_sesh');
            response.successful = true;
            return response;
        }, res);
    };
    wrapWithUser = (serviceMethod) => (req, res) => {
        this.resWrap(async (response) => {
            return await serviceMethod.call(response, req.body, res["locals"]?.userInfo);
        }, res);
    };
    wrapWithRequest = (serviceMethod) => (req, res) => {
        this.resWrap(async (response) => {
            return await serviceMethod.call(response, req.body, req);
        }, res);
    };
}
exports.default = BaseController;
//# sourceMappingURL=base.js.map