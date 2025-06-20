import multer from "multer";
import uploadConfig from "../configs/uploadConfig";
const upload = multer(uploadConfig);

export default upload;