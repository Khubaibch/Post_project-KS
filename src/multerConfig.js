// import multer from "multer";

// const storage = multer.memoryStorage(); // Store the file in memory as a buffer

// const upload = multer({ storage: storage });

// export default upload;
import multer from "multer"; //Multer library, which is a middleware for handling multipart/form-data,
// primarily used for file uploads.
import { fileURLToPath } from "url"; //convert kry gy file URL (Uniform Resource Locator) to a file path.
import { dirname, join } from "path"; //dirname returns the dir name of a path means path to certain file,
//join joins path segments into a single path.
const __filename = fileURLToPath(import.meta.url); //it gives you the absolute file path of the module where this line is written convert url to path.
const __dirname = dirname(__filename); //path to that file
console.log(__filename); // Absolute path inccluding file of the current module's file
console.log(__dirname);

//multer.diskStorage function takes an object with two functions, destination and filename,
//which define how multer should store the uploaded files on disk.
const storage = multer.diskStorage({
  //destination: This function determines the destination folder for the uploaded files. It receives a callback function (cb) that needs to
  // be called with two arguments: null (to indicate no errors) and the destination path.
  destination: (req, file, cb) => {
    //store on my server to send it db through model
    // Specify the destination folder for uploaded files
    const destinationPath = join(__dirname, "images");
    cb(null, destinationPath);
  },
  filename: (req, file, cb) => {
    // Specify how file names should be generated
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9); //round random no generated from 1-9
    cb(null, file.fieldname + "-" + uniqueSuffix + file.originalname); //filename //unique and identifiable name
    //input type="file" name="avatar">, then file.fieldname would be "avatar."
  },
});
//multer({ storage: storage }), it returns a function that acts as middleware and is assigned to the upload variable.
// This function, when used in
//your routes, handles file uploads according to the specified storage settings.
const upload = multer({ storage: storage });
export default upload;
