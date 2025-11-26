const cron=require("node-cron")
const db=require("../config/db")

const { getTodayHistory }=require("../services/specialService")


cron.schedule("0 0 * * *", async () => {
  const h = await getTodayHistory();

  await db.query(
    "INSERT INTO daily_specials(date, year, title, description, image) VALUES ($1,$2,$3,$4,$5)",
    [h.date, h.year, h.title, h.description, h.image]
  );

  console.log("Daily history saved");
});