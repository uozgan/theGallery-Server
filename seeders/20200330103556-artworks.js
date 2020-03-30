"use strict";

const Artwork = require("../models").artwork;

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const artworks = await Promise.all([
      Artwork.upsert({
        id: 1,
        title: "Hot and Cold",
        imageUrl:
          "https://missbeavis.edublogs.org/files/2018/10/7ea231e828047d31ba160b54522175ae-2fchfzq-sfxt2u.jpg",
        hearts: 15,
        minimumBid: 100,
        userId: 1
      }),
      Artwork.upsert({
        id: 2,
        title: "Thief",
        imageUrl:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQlS47SFg1ffHusw71o-GTGjWHbfEyekTamY7xB3qQj6FhUzfLe",
        hearts: 6,
        minimumBid: 40,
        userId: 2
      }),
      Artwork.upsert({
        id: 3,
        title: "Astronaut",
        imageUrl:
          "https://cdn.vox-cdn.com/thumbor/MX1Xb3D8jBrCwgqdaRMQqiS3mEI=/0x107:393x369/1200x800/filters:focal(0x107:393x369)/cdn.vox-cdn.com/uploads/chorus_image/image/51203987/IRB_003.0.jpg",
        hearts: 12,
        minimumBid: 70,
        userId: 1
      })
    ]);

    console.log(`SEEDED: ${artworks.length} artworks`);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("artworks", null, {});
  }
};
