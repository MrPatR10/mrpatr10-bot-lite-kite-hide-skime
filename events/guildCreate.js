const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('../ayarlar.json');

var prefix = ayarlar.prefix;

const girismesaj = [
  'Botumuzun özelliklerini öğrenmek için m!yardım komutunu kullanabilirsin.',
  '**ÖNEMLİ:** Botun kullanması için mod-log kanalı açın ve deneme için',
  'm!uyarı komutunu kullanın.',
  '',
  `MrNYKS resmi sunucusu : https://discord.gg/xEzmWsA`,
  `**MrNYKS sunucusu** https://discord.gg/xEzmWsA`
]

client.on('guildCreate', guild => {
    const generalChannel = guild.defaultChannel
    generalChannel.sendMessage(girismesaj)
	client.user.setGame(prefix + 'yardım | ' + client.guilds.size + ' sunucu | ' + client.guilds.reduce((a, b) => a + b.memberCount, 0).toLocaleString() + ' kullanıcı');
})
