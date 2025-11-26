const {pool}=require("../config/db")

const{getTodayHistory }=require("../services/specialService")

async function fetchTodayHistory(req, res) {
  try {
    const data = await getTodayHistory();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to load history" });
  }
}


module.exports={fetchTodayHistory}