import {hash, compare} from "bcryptjs"

const encrypt = async (plainTextPassword:string) => {
    const passwordHash = await hash(plainTextPassword, 8);
    return passwordHash;
};

const verified = async (plainTextPassword:string, hashPassword:string) => {
    const isCorrect = await compare(plainTextPassword, hashPassword);
    return isCorrect;
};

export { encrypt, verified };