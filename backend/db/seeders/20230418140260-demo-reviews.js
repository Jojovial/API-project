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
        review:'I do not want to be a toy!',
        stars:1,
      },
      {
        spotId:2,
        userId:2,
        review:'The water-water meat is amazing!',
        stars:5,
      },
    ], {})
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Reviews';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      userId: { [Op.in]: [1,2] }
    }, {});
  }
};
