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
        spotId: 2,
        url: 'https://cdn.discordapp.com/attachments/1096834476564295755/1107356424448782427/640.png',
        preview: true,
      },
      {
        spotId: 2,
        url: 'https://cdn.discordapp.com/attachments/1096834476564295755/1107356424767553606/1280.png',
        preview: true,
      },
      {
        spotId: 2,
        url: 'https://cdn.discordapp.com/attachments/1096834476564295755/1107357011026382988/MV5BYmYxY2QyOGYtMDUyNS00ZmM3LWFjODMtOTg0ZmI5OWVkMmU2XkEyXkFqcGdeQXVyNzgxMzc3OTc.png',
        preview: true,
      },
      {
        spotId: 3,
        url: 'https://cdn.discordapp.com/attachments/1096834476564295755/1105240149203365949/latest.png',
        preview: true,
      },
      {
        spotId: 3,
        url: 'https://cdn.discordapp.com/attachments/1096834476564295755/1107357433627680848/KJdGgKi92ubVrZaGb3Jpo2eZiYn5q5S_QH-9BLSq4HCuGX1vb2UO6B6ddPto_0duiEDzYko4qv3fekn8cwD6IsQqpgyxcY_8jqPRiUOJfJk_LxE7IomuRMqbnq_8D6iNZFck7NI4Y7_LeMDi1VoE2LOHFPS3Rq-nFIF6m1bJKVJBVAfOltHVg0smaoGbgw.png',
        preview: true,
      },
      {
        spotId: 3,
        url: 'https://cdn.discordapp.com/attachments/1096834476564295755/1107357433925472346/MV5BOGZiZDE2MjYtNmQ3My00ZTcwLTgyMWEtZGViMWNiZDc4M2I4XkEyXkFqcGdeQXVyMjA0NzcwMjI.png',
        preview: true,
      },
      {
        spotId: 3,
        url: 'https://cdn.discordapp.com/attachments/1096834476564295755/1107357434244255804/rH_6nLdYxKMMoqMu3zMdJ4vyjmpOeQ9gWqg3vWsHYlJ6q7Xho2cMUciWZN2vhXPdebq5RDERZUDK4-lCYXCaiv9XCDX3kD01HeiQqPogCHqivZwUzy7oc_QBTq55mgxMBpVzQstnagu70maPmf6_ukQ_lLivDjq4GSXaL18Dn6LqSIvxC1ZlMBF8gHrstA.png',
        preview: true,
      },
      {
        spotId: 4,
        url: 'https://cdn.discordapp.com/attachments/1096834476564295755/1105240671058677810/latest.png',
        preview: true,
      },
      {
        spotId: 4,
        url: 'https://cdn.discordapp.com/attachments/1096834476564295755/1107358498586628207/Netflix-One-Piece-Baratie.png',
        preview: true,
      },
      {
        spotId: 4,
        url: 'https://cdn.discordapp.com/attachments/1096834476564295755/1107358498972499988/one-piece-concept-art-4-baratie-bar.png',
        preview: true,
      },
      {
        spotId: 4,
        url: 'https://cdn.discordapp.com/attachments/1096834476564295755/1107358499513573386/maxresdefault.png',
        preview: true,
      },
      {
        spotId: 5,
        url: 'https://cdn.discordapp.com/attachments/1096834476564295755/1105240822800207992/latest.png',
        preview: true,
      },
      {
        spotId: 5,
        url: 'https://cdn.discordapp.com/attachments/1096834476564295755/1107359653052043354/4ef676d45e07307c9651f3bf0aebfe62.png',
        preview: true,
      },
      {
        spotId: 5,
        url: 'https://cdn.discordapp.com/attachments/1096834476564295755/1107359653324660837/latest.png',
        preview: true,
      },
      {
        spotId: 5,
        url: 'https://cdn.discordapp.com/attachments/1096834476564295755/1107359653593088041/images.png',
        preview: true,
      },
      {
        spotId: 6,
        url: 'https://cdn.discordapp.com/attachments/1096834476564295755/1107360227038347284/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f776174747061642d6d656469612d736572766963652f53746f7279496d6167652f6c4f474e754758522d4750595f413d3d2d313231383737393834352e313732326338613936326366666463663939373235303334323138332e6a7067.png',
        preview: true,
      },
      {
        spotId: 6,
        url: 'https://cdn.discordapp.com/attachments/1096834476564295755/1107360226753138761/1661a413b45f60cfe5ec7b65f3950e3b4cd24053.png',
        preview: true,
      },
      {
        spotId: 6,
        url: 'https://cdn.discordapp.com/attachments/1096834476564295755/1107360227696852992/MV5BMDU5MmM3MmUtNjJjZS00N2UxLTkxYzctYzdkN2JiYzFjYTczXkEyXkFqcGdeQXVyNzgxMzc3OTc.png',
        preview: true,
      },
      {
        spotId: 6,
        url: 'https://cdn.discordapp.com/attachments/1096834476564295755/1107360227365494824/6d0bb15e04f854958bcbfadfdc9d869fb612aa26.png',
        preview: true,
      },
      {
        spotId: 7,
        url: 'https://cdn.discordapp.com/attachments/1096834476564295755/1105242858862166086/latest.png',
        preview: true,
      },
      {
        spotId: 7,
        url: 'https://cdn.discordapp.com/attachments/1096834476564295755/1107360921287933982/latest.png',
        preview: true,
      },
      {
        spotId: 7,
        url: 'https://cdn.discordapp.com/attachments/1096834476564295755/1107360921665413200/f23cb8dd0812bcb9b4c228d4b9610cbeb4436d90r1-959-539v2_hq640x360.png',
        preview: true,
      },
      {
        spotId: 7,
        url: 'https://cdn.discordapp.com/attachments/1096834476564295755/1107360922105827408/tumblr_inline_p7z6fiVOiu1s2yta0_500.png',
        preview: true,
      },
      {
        spotId: 8,
        url: 'https://cdn.discordapp.com/attachments/1096834476564295755/1105243894616162314/latest.png',
        preview: true,
      },
      {
        spotId: 8,
        url: 'https://cdn.discordapp.com/attachments/1096834476564295755/1107362095797903360/latest.png',
        preview: true,
      },
      {
        spotId: 8,
        url: 'https://cdn.discordapp.com/attachments/1096834476564295755/1107362096213151845/latest.png',
        preview: true,
      },
      {
        spotId: 8,
        url: 'https://cdn.discordapp.com/attachments/1096834476564295755/1107362096594829382/latest.png',
        preview: true,
      },
      {
        spotId: 9,
        url: 'https://64.media.tumblr.com/fda4f7ae6ceb4481375a64ed067a4509/c47cb09521daa121-d5/s1280x1920/045260871c76ff451ac7d0d4f58d54929578b2a2.jpg',
        preview: true,
      },
      {
        spotId: 9,
        url: 'https://cdn.discordapp.com/attachments/1096834476564295755/1107362710951309322/latest.png',
        preview: true,
      },
      {
        spotId: 9,
        url: 'https://cdn.discordapp.com/attachments/1096834476564295755/1107362711265878137/latest.png',
        preview: true,
      },
      {
        spotId: 9,
        url: 'https://cdn.discordapp.com/attachments/1096834476564295755/1107362711622389821/35dc44c497a823d20c878848613ba961.png',
        preview: true,
      },
      {
        spotId: 10,
        url: 'https://cdn.discordapp.com/attachments/1096834476564295755/1105244249743700060/latest.png',
        preview: true,
      },
      {
        spotId: 10,
        url: 'https://cdn.discordapp.com/attachments/1096834476564295755/1107363465242353714/ndhu76ghnu381.png',
        preview: true,
      },
      {
        spotId: 10,
        url: 'https://cdn.discordapp.com/attachments/1096834476564295755/1107363465603059803/latest.png',
        preview: true,
      },
      {
        spotId: 10,
        url: 'https://cdn.discordapp.com/attachments/1096834476564295755/1107363465934426182/latest.png',
        preview: true,
      },
      {
        spotId: 11,
        url: 'https://cdn.discordapp.com/attachments/1096834476564295755/1105244387287502939/MV5BOTMyMjI1YTQtOThhNC00ODI2LWI5OTEtYWFiMGUzMTg5OWE4XkEyXkFqcGdeQXVyNzgxMzc3OTc.png',
        preview: true,
      },
      {
        spotId: 11,
        url: 'https://cdn.discordapp.com/attachments/1096834476564295755/1107363965681537104/FTcBVL3XoAAb2S6.png',
        preview: true,
      },
      {
        spotId: 11,
        url: 'https://cdn.discordapp.com/attachments/1096834476564295755/1107363966050639952/latest.png',
        preview: true,
      },
      {
        spotId: 11,
        url: 'https://cdn.discordapp.com/attachments/1096834476564295755/1107363966461689997/latest.png',
        preview: true,
      },
      {
        spotId: 12,
        url: 'https://cdn.discordapp.com/attachments/1096834476564295755/1105244512516845568/CEOnxY7WrZCvQevePA07Z2M8pHo6MSSnvOcQ42hLZDCsmjB0mjs4PPH_bkCxbTxy6Y9tJ4dGhJFBFzCQNteNZO2zm_NKwRzt5tN8epp2_EZ-vFeSE1yaqY3fcxfbI5T6ZdIlRq_R2YEGTURESdJW4ZN6NkdDPi38wc7nU7QLIVzuVWnxrjIM41PBqXaZ-A.png',
        preview: true,
      },
      {
        spotId: 12,
        url: 'https://cdn.discordapp.com/attachments/1096834476564295755/1107364432876687440/MV5BMjgwNzFjZGYtNTRhNC00YzA0LTliNmYtNTUyYjZiMWM1MDEwXkEyXkFqcGdeQXVyNzgxMzc3OTc.png',
        preview: true,
      },
      {
        spotId: 12,
        url: 'https://cdn.discordapp.com/attachments/1096834476564295755/1107364433384185907/latest.png',
        preview: true,
      },
      {
        spotId: 12,
        url: 'https://cdn.discordapp.com/attachments/1096834476564295755/1107364434030104646/latest.png',
        preview: true,
      }

    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1,2,3,4,5,6,7,8,9,10,11,12] }
    }, {});
  }
};
