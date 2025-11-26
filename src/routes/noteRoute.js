const express=require("express")
const{auth}=require("../middleware/authMiddleware")
const {deleteNote,getById,getNote,addNote,editNote}=require("../controllers/noteController")
const upload=require("../middleware/uploadMiddleware")

const router = express.Router();

// router.post("/add",auth,upload.single("image"),addNote)
router.post("/add", auth,addNote);
router.get("/",auth,getNote)
router.get("/:id",auth,getById)
router.put("/:id", auth, editNote);
router.delete("/:id",auth,deleteNote)

module.exports=router
