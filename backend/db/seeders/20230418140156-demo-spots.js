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
        address:'100 The Sky',
        city: 'Skypiea',
        state:'VA',
        country:'USA',
        lat:40.1283,
        lng: -10.2839,
        name: 'Upper Yard',
        description: 'If you can get here from the ground, a fun time awaits you.',
        price: 40000000,
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
      },
      {
        ownerId: 3,
        address:'3243 The Most Delicious Cake Rd',
        city:'Whole Cake Island',
        state:'GA',
        country:'USA',
        lat: 32.32,
        lng: 80.89,
        name: 'Whole Cake Chateau',
        description: 'You are allowed to be here ONLY if you bring SWEETS or YOUR LIFE',
        price: 300,
      },
      {
        ownerId: 1,
        address:'4504 Restaurant Le Crap',
        city:'East Blue',
        state:'MA',
        country:'USA',
        lat: -13.16,
        lng: -90.29,
        name: 'Baratie',
        description: 'Enjoy our finest meals! Just be sure to tip or else.',
        price: 1000,
      },
      {
        ownerId: 2,
        address:'404 Plug Lane',
        city:'LogueTown',
        state:'AK',
        country:'USA',
        lat: 88.33,
        lng: -18.9,
        name: 'The Gallows',
        description: 'Our rooms are to DIE for, enjoy the breath taking sight of where the Pirate King once was.',
        price: 60000,
      },
      {
        ownerId: 3,
        address:'1234 Some Ocean',
        city:'Thriller Bark',
        state:'FL',
        country:'USA',
        lat: 18.88,
        lng: -6.66,
        name: 'Zombie Parade Ball',
        description: 'ALL EXPENSES PAID: We just ask for 1 beri on arrival for island upkeep! Enjoy our TOTALLY free of charge vacation!',
        price: 1,
      },
      {
        ownerId: 1,
        address:'888 Dinosaur Lane',
        city:'Little Garden',
        state:'FL',
        country:'USA',
        lat: 13.33,
        lng: -20.98,
        name: 'Dinosaur Heaven',
        description: 'Gawr, roar, mawr(?). Sorry our owner is a dinosaur, I would advise coming here but the food is nice.',
        price: 404,
      },
      {
        ownerId: 2,
        address:'777 Lucky Lane',
        city:'Drum Island',
        state:'AL',
        country:'USA',
        lat: 10.10,
        lng: 30.24,
        name: 'Sakura Kingdom',
        description: 'The healthiest kingdom! We will take care of any health problem you have! Please do not disobey the Witch, however.',
        price: 100,
      },
      {
        ownerId: 3,
        address:'100 Leagues Under the Sea',
        city:'Fish-Man Island',
        state:'MA',
        country:'USA',
        lat: -50.50,
        lng: -70.70,
        name: 'Mermaid Cove',
        description: 'Clams, CLAMS CLAMS!!!!!',
        price: 350,
      },
      {
        ownerId: 1,
        address:'The Middle of the Ocean',
        city:'Sabaody',
        state:'WA',
        country:'USA',
        lat: 70.77,
        lng: -24.24,
        name: 'Saboady Archipelago',
        description: 'Come all and come have fun! Or get caught!',
        price: 5,
      },
      {
        ownerId: 2,
        address:'904 Cove Road',
        city:'Dressrosa',
        state:'HI',
        country:'USA',
        lat: 17.77,
        lng: -90.24,
        name: 'Toy Palace',
        description: 'Do not get turned into a toy.',
        price: 5009,
      },
      {
        ownerId: 3,
        address:'A WaterFall Lane',
        city:'Wano',
        state:'OR',
        country:'USA',
        lat: 60.60,
        lng: -30.2409,
        name: 'Onigashima',
        description: 'Please enjoy our red bean soup!',
        price: 505,
      },

    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      ownerId: { [Op.in]: [1,2,3] }
    }, {});
  }
};
