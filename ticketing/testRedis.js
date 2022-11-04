const express = require("express");
const PORT = 2000;
const server = express();
const axios = require("axios");
const ioredis = require("ioredis");
const client = ioredis.createClient(6379);
client.on("connect", () => console.log("Connected to Redis"));

server.get("/dogs/:breed", async (req, res) => {
  try {
    const { breed } = req.params;

    client.get(breed, async (err, result) => {
      if (result) return res.status(200).send(result);

      const { data } = await axios.get(
        `https://dog.ceo/api/breed/${breed}/images`
      );

      client.setex(breed, 240, JSON.stringify(data));

      res.status(200).send(data);
    });
  } catch (err) {
    res.status(400).send(err);
  }
});

server.listen(PORT, () => console.log(`Server Running at PORT: ${PORT}`));
