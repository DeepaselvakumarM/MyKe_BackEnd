const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")
const {pool}=require("../config/db")

const register=async(req,res)=>{
    const{username,email,password}=req.body

    const hashed=await bcrypt.hash(password,10)
 
    const newUser=await pool.query(
         "INSERT INTO users (username, email, password) VALUES ($1,$2,$3) RETURNING *",
    [username, email, hashed]
    )

    // res.json(
    //     {
    //         message: "User registered", user: newUser.rows[0] 
    //     }
    // )

  res.json({
  message: "User registered",
  user: {
    id: newUser.rows[0].id,
    username: newUser.rows[0].username,
    email: newUser.rows[0].email
  }
});
 


}


const login =async(req,res)=>{
    const{email,password}=req.body
    const result=await pool.query("SELECT * FROM users WHERE email=$1", [email])

    if(result.rows.length===0){
        return res.status(400).json({ message: "User not found" });
    }
    const user=result.rows[0]
    const match=await bcrypt.compare(password,user.password)
  
    if (!match) return res.status(400).json({ message: "Wrong password" });

    const token=jwt.sign({id:user.id,email:user.email},process.env.JWT_SECRET)

    // res.json({ message: "Login successful", token });
  
   res.json({
  message: "Login successful",
  token,
  user: {
    id: user.id,
    username: user.username,
    email: user.email
  }
});



}

module.exports={login,register}
