import jwt from "jsonwebtoken";

const SECRET = process.env.SECRET || "secret010101";

const generateToken = async (id:string) =>{
    const token = jwt.sign(id, SECRET);
    return token;
}

const verifyToken = async (token:string) => {
    const isValid = jwt.verify(token, SECRET);
    return isValid;
}

export {generateToken, verifyToken};