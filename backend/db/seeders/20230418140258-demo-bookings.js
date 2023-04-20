'use strict';

/** @type {import('sequelize-cli').Migration} */
let options = {};
if(process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}
module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Bookings';
    return queryInterface.bulkInsert(options, [
      {
        spotId:1,
        userId:1,
        startDate: new Date('2023-07-01'),
        endDate: new Date('2023-07-10'),
      },
      {
        spotId:2,
        userId:2,
        startDate: new Date('2023-07-01'),
        endDate: new Date('2023-07-10'),
      },
    ], {});
  },

  down: async(queryInterface, Sequelize) => {
    options.tableName = 'Bookings';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      startDate: { [Op.in]: ['2023-07-01'] }
    }, {});
  }
};
