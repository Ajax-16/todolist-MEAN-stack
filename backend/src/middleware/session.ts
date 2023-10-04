import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/jwt.handle";
import { RequestPayload } from "../interfaces/payload";

const checkJWT = (req: RequestPayload, res: Response, next: NextFunction) => {
    if(!req.headers.authorization) {
        return res.status(401).json('UNAUTHORIZED REQUEST');
    }
    const jwtUser = req.headers.authorization
    const jwt = jwtUser.split(' ').pop();
    if (jwt === 'null'){
        return res.status(401).json('UNAUTHORIZED REQUEST');
    }
    
    const payload = verifyToken(`${jwt}`)

    if (!payload){
        return res.status(401).json('INVALID SESSION TOKEN');
    }else{
        req.user = payload;
        next();
    }

}

export { checkJWT }  