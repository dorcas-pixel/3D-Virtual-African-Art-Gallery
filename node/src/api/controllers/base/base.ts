import { Request, Response } from "express";
import { IAny, IResponse } from "../../../interfaces";

export default class BaseController {
  constructor(private resWrap: (c: Function, r: Response) => void) {
    this.resWrap = resWrap;
  }

  wrap =
    (serviceMethod: (b: IAny) => Promise<IResponse> | IResponse) =>
    (req: Request, res: Response) => {
      this.resWrap(async (response: IResponse) => {
        return await serviceMethod.call(response, req.body);
      }, res);
    };

  signOut = (req, res) => {
    this.resWrap((response: IResponse) => {
      res.clearCookie('_gallery_sesh');

      response.successful = true;

      return response;
    }, res)
  }

  wrapWithUser =
    (serviceMethod: (b: IAny, u: IAny) => Promise<IResponse> | IResponse) =>
    (req: any, res: Response) => {
      this.resWrap(async (response: IResponse) => {
        return await serviceMethod.call(
          response,
          req.body,
          res["locals"]?.userInfo
        );
      }, res);
    };

  wrapWithRequest =
    (serviceMethod: (b: IAny, q: IAny) => Promise<IResponse> | IResponse) =>
      (req: any, res: Response) => {
        this.resWrap(async (response: IResponse) => {
          return await serviceMethod.call(
            response,
            req.body,
            req
          );
        }, res);
      };
}
