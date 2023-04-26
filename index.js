const express = require("express");
const { PrismaClient } = require("@prisma/client");
const cors = require('cors');
const prisma = new PrismaClient();
const morgan = require("morgan");
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(morgan("dev"));
app.get("/animes", async (req, res) => {
  try {
    const animes = await prisma.anime.findMany();
    res.json(animes);
    console.log(animes.length)
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong." });
  }
});
// Endpoint to get an anime by ID
app.get("/animes/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const anime = await prisma.anime.findUnique({
        where: { id: parseInt(id) },
      });
      if (!anime) {
        return res.status(404).json({ error: "Anime not found" });
      }
      res.json(anime);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
