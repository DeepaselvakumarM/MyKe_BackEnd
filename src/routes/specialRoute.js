const express=require("express")
const{getTodaySpecial}=require("../controllers/specialController")

const{fetchTodayHistory}=require("../controllers/specialController")

const router = express.Router();

router.get("/today-history", fetchTodayHistory);

module.exports=router