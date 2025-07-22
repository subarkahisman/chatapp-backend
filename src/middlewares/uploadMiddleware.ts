import multer from "multer";
import path from "path";

const storage = multer.memoryStorage();

const fileFilter = (req: any, file: any, cb: any) => {
  const ext = path.extname(file.originalname).toLowerCase();

  if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
    return cb(new Error("Hanya menerima file .jpg, .jpeg, .png saja !"));
  }

  cb(null, true);
};

const upload = multer({ storage, fileFilter });

export default upload;
