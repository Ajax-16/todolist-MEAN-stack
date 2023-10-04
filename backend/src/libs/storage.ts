import multer from "multer";
import { RequestPayload } from "../interfaces/payload";

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, "./storage/imgs");
    },
    filename: async function(req: RequestPayload, file, cb){
        const authName = await req.user;
        cb(null, `profile-pic-${authName}.png`);
    }
})

const upload = multer({
     storage
});

export { upload };