const { Router } = require("express");
const auth = require("../auth/middleware");
const Artwork = require("../models").artwork;
const Bid = require("../models").bid;

const router = new Router();

router.get("/", async (req, res) => {
  const limit = req.query.limit || 10;
  const offset = req.query.offset || 0;
  const artworks = await Artwork.findAndCountAll({
    limit,
    offset,
    include: [Bid]
  });
  res.status(200).send({ message: "ok", artworks });
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  console.log(id);
  if (isNaN(parseInt(id))) {
    return res.status(400).send({ message: "Artwork id is not a number" });
  }

  const artwork = await Artwork.findByPk(id, {
    include: [Bid],
    order: [[Bid, "createdAt", "DESC"]]
  });

  if (artwork === null) {
    return res.status(404).send({ message: "Artwork not found" });
  }

  res.status(200).send({ message: "ok", artwork });
});

router.patch("/:id", async (req, res) => {
  const artwork = await Artwork.findByPk(req.params.id);

  //console.log("Artwork-Database", artwork);

  const { hearts } = req.body;

  //console.log("Req Body", req.body.hearts);

  await artwork.update({ hearts });

  return res.status(200).send({ artwork });
});

module.exports = router;
