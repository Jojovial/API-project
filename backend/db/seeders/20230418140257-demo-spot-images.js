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
        url: 'https://cdn.discordapp.com/attachments/1096834476564295755/1105233163300642888/SkypieaIslands.webp',
        preview: true
      },
      {
        spotId: 1,
        url: 'https://cdn.discordapp.com/attachments/1096834476564295755/1105513856706551889/FOxqKH4XoAUwtgS.png',
        preview: true
      },
      {
        spotId: 1,
        url: 'https://cdn.discordapp.com/attachments/1096834476564295755/1105513857146961950/CZko2lkUUAACl7v.png',
        preview: true
      },
      {
        spotId: 1,
        url: 'https://cdn.discordapp.com/attachments/1096834476564295755/1105513857637687416/latest.png',
        preview: true
      },
      {
        spotId: 2,
        url: 'https://cdn.discordapp.com/attachments/1096834476564295755/1105233683276898385/5b14903a339c68dd4010289dbdfdada4.jpg',
        preview: true,
      },
      {
        spotId: 3,
        url: 'https://cdn.discordapp.com/attachments/1096834476564295755/1105240149203365949/latest.png',
        preview: true,
      },
      {
        spotId: 4,
        url: 'https://cdn.discordapp.com/attachments/1096834476564295755/1105240671058677810/latest.png',
        preview: true,
      },
      {
        spotId: 5,
        url: 'https://cdn.discordapp.com/attachments/1096834476564295755/1105240822800207992/latest.png',
        preview: true,
      },
      {
        spotId: 6,
        url: 'https://cdn.discordapp.com/attachments/1096834476564295755/1105241001288802355/latest.png',
        preview: true,
      },
      {
        spotId: 7,
        url: 'https://cdn.discordapp.com/attachments/1096834476564295755/1105242858862166086/latest.png',
        preview: true,
      },
      {
        spotId: 8,
        url: 'https://cdn.discordapp.com/attachments/1096834476564295755/1105243894616162314/latest.png',
        preview: true,
      },
      {
        spotId: 9,
        url: 'https://64.media.tumblr.com/fda4f7ae6ceb4481375a64ed067a4509/c47cb09521daa121-d5/s1280x1920/045260871c76ff451ac7d0d4f58d54929578b2a2.jpg',
        preview: true,
      },
      {
        spotId: 10,
        url: 'https://cdn.discordapp.com/attachments/1096834476564295755/1105244249743700060/latest.png',
        preview: true,
      },
      {
        spotId: 11,
        url: 'https://cdn.discordapp.com/attachments/1096834476564295755/1105244387287502939/MV5BOTMyMjI1YTQtOThhNC00ODI2LWI5OTEtYWFiMGUzMTg5OWE4XkEyXkFqcGdeQXVyNzgxMzc3OTc.png',
        preview: true,
      },
      {
        spotId: 12,
        url: 'https://cdn.discordapp.com/attachments/1096834476564295755/1105244512516845568/CEOnxY7WrZCvQevePA07Z2M8pHo6MSSnvOcQ42hLZDCsmjB0mjs4PPH_bkCxbTxy6Y9tJ4dGhJFBFzCQNteNZO2zm_NKwRzt5tN8epp2_EZ-vFeSE1yaqY3fcxfbI5T6ZdIlRq_R2YEGTURESdJW4ZN6NkdDPi38wc7nU7QLIVzuVWnxrjIM41PBqXaZ-A.png',
        preview: true,
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
