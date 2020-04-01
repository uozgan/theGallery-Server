"use strict";

const Bid = require("../models").bid;

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const bids = await Promise.all([
      Bid.upsert({
        email: "a@a.com",
        amount: 120,
        artworkId: 1
      }),
      Bid.upsert({
        email: "b@b.com",
        amount: 90,
        artworkId: 2
      }),
      Bid.upsert({
        email: "c@c.com",
        amount: 70,
        artworkId: 3
      }),
      Bid.upsert({
        email: "d@d.com",
        amount: 135,
        artworkId: 1
      }),
      Bid.upsert({
        email: "e@e.com",
        amount: 99,
        artworkId: 3
      })
    ]);

    console.log(`SEEDED: ${bids.length} bids`);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("bids", null, {});
  }
};
