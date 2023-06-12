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
        spotId: 1,
        url: "https://media.discordapp.net/attachments/379865870916255744/1117609670685757540/latest.png",
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
        spotId: 2,
        url: 'https://media.discordapp.net/attachments/379865870916255744/1117609670916456538/latest.png?width=1202&height=676',
        preview: true,
      },
      {
        spotId: 3,
        url: 'https://cdn.discordapp.com/attachments/1096834476564295755/1105240149203365949/latest.png',
        preview: true,
      },
      {
        spotId: 3,
        url: 'https://cdn.discordapp.com/attachments/1096834476564295755/1107458062303887380/latest.png',
        preview: true,
      },
      {
        spotId: 3,
        url: 'https://cdn.discordapp.com/attachments/1096834476564295755/1107357433925472346/MV5BOGZiZDE2MjYtNmQ3My00ZTcwLTgyMWEtZGViMWNiZDc4M2I4XkEyXkFqcGdeQXVyMjA0NzcwMjI.png',
        preview: true,
      },
      {
        spotId: 3,
        url: 'https://cdn.discordapp.com/attachments/1096834476564295755/1107458062693969940/latest.png',
        preview: true,
      },
      {
        spotId: 3,
        url: 'https://cdn.discordapp.com/attachments/379865870916255744/1117610800958427237/3147783.png',
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
        spotId: 4,
        url: 'https://media.discordapp.net/attachments/379865870916255744/1117609671239405619/latest.png?width=1220&height=676',
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
        spotId: 5,
        url: 'https://cdn.discordapp.com/attachments/379865870916255744/1117613766494912562/latest.png',
        preview: true,
      },
      {
        spotId: 6,
        url: 'https://cdn.discordapp.com/attachments/1096834476564295755/1107458061964161124/352.png',
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
        spotId: 6,
        url: 'https://media.discordapp.net/attachments/379865870916255744/1117609746325852170/a03c98b1479927ffe08e648c3966b43ac56d5216.png?width=1202&height=676',
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
        spotId: 7,
        url: 'https://media.discordapp.net/attachments/379865870916255744/1117609746028044368/f23cb8dd0812bcb9b4c228d4b9610cbeb4436d90r1-959-539v2_hq640x360.png',
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
        spotId: 8,
        url: 'https://media.discordapp.net/attachments/379865870916255744/1117609745516331018/259.png',
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
        spotId: 9,
        url: 'https://media.discordapp.net/attachments/379865870916255744/1117609812772016238/-1YuQBUw6-nuAkY2GOwPi3fP-391PlQzmvzP0DpZKBQ.png?width=1202&height=676',
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
        spotId: 10,
        url: 'https://media.discordapp.net/attachments/379865870916255744/1117609812520345621/dad87bc105f0e0bfcc7952ef7398f459601f8683_hq.png',
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
        spotId: 11,
        url: 'https://media.discordapp.net/attachments/379865870916255744/1117609812272889856/1447003959-69dc457b09bff4ad37aff077c62fa94a.png',
        preview: true,
      },
      {
        spotId: 12,
        url: 'https://cdn.discordapp.com/attachments/1096834476564295755/1107458063188902008/latest.png',
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
      },
      {
        spotId: 12,
        url: 'https://media.discordapp.net/attachments/379865870916255744/1117609811949932624/a9129cdacbc1fda63b758120a4056549.png',
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
