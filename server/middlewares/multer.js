

//no need of this file
import multer from 'multer'



const storage = multer.memoryStorage();
const singleUpload = multer({storage}).single("file");

console.log(singleUpload)
export default singleUpload