const express=require("express")
const cors =require("cors")
const dotenv=require("dotenv")
dotenv.config();
const authRoutes=require("./routes/authRoute")

const noteRoutes=require("./routes/noteRoute")

const specialRoutes=require("./routes/specialRoute")

const historyRoutes=require("./routes/specialRoute")

require("./cron/dailySpecialCron")

const app = express();
app.use(cors());
app.use(express.json());


app.use("/api/auth", authRoutes);
app.use("/api/notes", noteRoutes);
app.use("/api/special", specialRoutes);
app.use("/api/history", historyRoutes);

const PORT = process.env.PORT ;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

