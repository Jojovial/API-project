'use strict';

/** @type {import('sequelize-cli').Migration} */
let options = {};
if(process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'SpotImages';
    return queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        url: 'www.url/theonepieceisreal.com',
        preview: true
      },
      {
        spotId: 2,
        url: 'www.url/skypeia.com',
        preview: false,
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1,2] }
    }, {});
  }
};