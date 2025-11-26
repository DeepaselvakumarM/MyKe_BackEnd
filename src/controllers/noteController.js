const {pool}=require("../config/db")

// const cloudinary=require("../middleware/uploadMiddleware")
const cloudinary = require("../config/cloudinaryConfig");
const upload = require("../middleware/uploadMiddleware");

// const addNote = async (req, res) => {
//   let image_url = null;

//   // Upload image to Cloudinary
//   if (req.file) {
//     const streamUpload = () => {
//       return new Promise((resolve, reject) => {
//         const stream = cloudinary.uploader.upload_stream(
//           { folder: "notes" },
//           (error, result) => {
//             if (result) resolve(result);
//             else reject(error);
//           }
//         );
//         stream.end(req.file.buffer);
//       });
//     };

//     const uploadResult = await streamUpload();
//     image_url = uploadResult.secure_url;
//   }

//   // Extract other fields
//   const { title, description, reference_link } = req.body;

//   const newNote = await pool.query(
//     `INSERT INTO notes (user_id, title, description, image_url, reference_link)
//      VALUES ($1,$2,$3,$4,$5) RETURNING *`,
//     [req.user.id, title, description, image_url, reference_link]
//   );

//   res.json(newNote.rows[0]);
// };




const addNote = async (req, res) => {

  const { title, description, reference_link } = req.body;

  const newNote = await pool.query(
    `INSERT INTO notes (user_id, title, description, reference_link)
     VALUES ($1,$2,$3,$4)
     RETURNING *`,
    [req.user.id, title, description, reference_link]
  );

  res.json(newNote.rows[0]);
};


    






const getNote=async(req,res)=>{
    const notes=await pool.query("SELECT * FROM notes WHERE user_id=$1 ORDER BY created_at DESC",
    [req.user.id])
    res.json(notes.rows)
}


const getById=async(req,res)=>{
    const note=await pool.query(
        "SELECT * FROM notes WHERE id=$1 AND user_id=$2",
    [req.params.id, req.user.id]
    )
    res.json(note.rows[0])
}


const deleteNote = async (req, res) => {
  await pool.query("DELETE FROM notes WHERE id=$1 AND user_id=$2", [
    req.params.id,
    req.user.id,
  ]);
  res.json({ message: "Note deleted" });
};



const editNote = async (req, res) => {
  try {
    const { title, description,reference_link } = req.body;
    const { id } = req.params;

    if (!title || !description || ! reference_link) {
      return res.status(400).json({ message: "Title and Description required" });
    }

    const result = await pool.query(
      `UPDATE notes 
       SET title = $1, description = $2 , reference_link=$3
       WHERE id = $4
       RETURNING *`,
      [title, description,reference_link, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.json(result.rows[0]);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};




module.exports={deleteNote,getById,getNote,addNote,editNote}
