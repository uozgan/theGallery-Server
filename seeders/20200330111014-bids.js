"use strict";

const Bid = require("../models").bid;

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const bids = await Promise.all([
      Bid.upsert({
        id: 1,
        email: "a@a.com",
        amount: 120,
        artworkId: 1
      }),
      Bid.upsert({
        id: 2,
        email: "b@b.com",
        amount: 90,
        artworkId: 2
      }),
      Bid.upsert({
        id: 3,
        email: "c@c.com",
        amount: 70,
        artworkId: 3
      }),
      Bid.upsert({
        id: 4,
        email: "d@d.com",
        amount: 135,
        artworkId: 1
      }),
      Bid.upsert({
        id: 5,
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
