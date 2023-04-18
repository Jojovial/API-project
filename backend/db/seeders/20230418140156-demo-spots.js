'use strict';

/** @type {import('sequelize-cli').Migration} */
let options = {};
if(process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}
module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Spots';
    return queryInterface.bulkInsert(options, [
      {
        ownerId: 1,
        address:'204 Borking Way',
        city: 'Dressrosa',
        state:'VA',
        country:'USA',
        lat:40.1283,
        lng: -10.2839,
        name: 'Toy Palace',
        description: 'If you stay here, you may turn into a toy!',
        price: 40,
      },
      {
        ownerId: 2,
        address:'3203 Le Road',
        city:'Water Seven',
        state:'GA',
        country:'USA',
        lat: 20.28,
        lng: -50.2984,
        name: 'Galley Le Works',
        description: 'Toughest of toughest work here',
        price: 5000,
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      ownerId: { [Op.in]: [1,2] }
    }, {});
  }
};
