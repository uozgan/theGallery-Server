const { Router } = require("express");
const auth = require("../auth/middleware");
const Artwork = require("../models").artwork;
const Bid = require("../models").bid;

const router = new Router();

router.patch("/:id", async (req, res) => {
  const artwork = await Artwork.findByPk(req.params.id);

  //console.log("Artwork-Database", artwork);

  const { hearts } = req.body;

  //console.log("Req Body", req.body.hearts);

  await artwork.update({ hearts });

  return res.status(200).send({ artwork });
});

router.post("/:id/bids", auth, async (req, res) => {
  const artwork = await Artwork.findByPk(req.params.id, { include: [Bid] });
  console.log("Artwork bids", artwork.bids);

  if (artwork === null) {
    return res.status(404).send({ message: "This artwork does not exist" });
  }

  const { amount, email, artworkId } = req.body;

  const highestAmount = Math.max(...artwork.bids.map(bid => bid.amount));

  console.log("Highest Amount", highestAmount);

  if (amount <= highestAmount) {
    return res.status(400).send({ message: "Please enter a higher amount!" });
  }

  const bid = await Bid.create({
    email,
    amount,
    artworkId
  });

  return res.status(201).send({ message: "New bid created", bid });
});

router.post("/auction", auth, async (req, res) => {
  const { title, minimumBid, imageUrl, userId } = req.body;

  if (!title) {
    return res.status(400).send({ message: "An artwork must have a title" });
  }

  if (!userId) {
    return res.status(400).send({ message: "User not found" });
  }

  const artwork = await Artwork.create(
    {
      title,
      minimumBid,
      imageUrl,
      userId
    },
    { include: [Bid] }
  );

  console.log("Artwork db", artwork);

  return res
    .status(201)
    .send({ message: "Artwork successfully created", artwork });
});

router.get("/", async (req, res) => {
  const limit = req.query.limit || 10;
  const offset = req.query.offset || 0;
  const artworks = await Artwork.findAndCountAll({
    limit,
    offset,
    include: [Bid]
  });
  console.log("artworks", artworks);

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

module.exports = router;
