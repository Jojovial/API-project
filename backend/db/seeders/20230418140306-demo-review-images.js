'use strict';

/** @type {import('sequelize-cli').Migration} */
let options = {};
if(process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'ReviewImages';
    return queryInterface.bulkInsert(options, [
      {
        reviewId:1,
        url:'www.url/theonepieceisreal.com',
      },
      {
        reviewId:2,
        url:'www.url/skypeia.com',
      },
      {
        reviewId:3,
        url:'www.url/peepee.com',
      },

    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'ReviewImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      reviewId: { [Op.in]: [1,2,3] }
    }, {});
  }
};
