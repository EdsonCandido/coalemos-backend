declare namespace Express {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    export interface Request {
        usuario: {
            cod_usuario: number,
        };
        file: {
            fieldname: string,
            originalname: string,
            encoding: string,
            mimetype: string,
            buffer: Buffer,
            size: number
        } | Express.Multer.File;
        files?: {
            [fieldname: string]: Express.Multer.File[];
        };
    }
}