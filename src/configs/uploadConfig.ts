import multer from "multer";
import path from "path";

const tmpFolder = path.resolve(__dirname, '..', 'tmp');

const storageTypes = {
    inMemory: multer.memoryStorage(),
    local: multer.diskStorage({
        destination: tmpFolder,
        filename(req, file, cb) {
            if (file) {
                const fileHash = crypto.randomUUID();
                const fileName = `${fileHash}-${file.originalname}`;
                return cb(null, fileName);
            }
        }
    })
}

export default {
    directory: tmpFolder,
    storage: storageTypes.inMemory,
    limits: {
        fileSize: 12 * 1024 * 1024,
    },
    fileFilter: (_: any, file: any, cb: (arg0: null, arg1: boolean) => void) => {
        if (file) {
            cb(null, true);
        }
    },
};