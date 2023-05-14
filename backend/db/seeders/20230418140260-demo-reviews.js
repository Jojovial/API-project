'use strict';

/** @type {import('sequelize-cli').Migration} */
let options = {};
if(process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Reviews';
    return queryInterface.bulkInsert(options, [
      {
        spotId:1,
        userId:1,
        review:'This place would be amazing if you could actually get to an island in the sky',
        stars:1,
      },
      {
        spotId:2,
        userId:2,
        review:'The water-water meat is amazing!',
        stars:5,
      },
      {
        spotId:3,
        userId:1,
        review: 'Not my favorite cake.',
        stars: 1,
      },
      {
        spotId:4,
        userId:2,
        review: 'Awful service, but amazing food.',
        stars: 2,
      },
       {
        spotId:5,
        userId:3,
        review: 'Really enjoyed the sights!',
        stars: 5,
      },
      {
        spotId:7,
        userId:2,
        review: 'Holy dinosaurs!',
        stars: 5,
      },
      {
        spotId:8,
        userId:1,
        review: 'My problems were healed, but at what cost.',
        stars: 3,
      },
      {
        spotId:9,
        userId:2,
        review: 'Water is wet.',
        stars: 1,
      },
      {
        spotId:10,
        userId:2,
        review: 'Lawless land but fun!',
        stars: 4,
      },


    ], {})
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Reviews';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      userId: { [Op.in]: [1,2,3] }
    }, {});
  }
};
