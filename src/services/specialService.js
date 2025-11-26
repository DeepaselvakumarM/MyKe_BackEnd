const axios=require("axios")


async function getTodayHistory() {
  const today = new Date();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  const url = `https://en.wikipedia.org/api/rest_v1/feed/onthisday/events/${month}/${day}`;

  const response = await axios.get(url);
  const events = response.data.events;

  const main = events[0]; // pick highlight event

  return {
    date: `${month}-${day}`,
    year: main.year,
    title: main.pages[0]?.title || "Historical Event",
    description: main.text,
    image: main.pages[0]?.thumbnail?.source || null,
  };
}

module.exports=getTodayHistory