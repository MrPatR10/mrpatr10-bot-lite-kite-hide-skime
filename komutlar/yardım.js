const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');

var prefix = ayarlar.prefix;

exports.run = (client, message, params) => {
  const embedyardim = new Discord.RichEmbed()
  .setTitle("● Komutlar ●")
  .setDescription('')
  .setColor('RANDOM')
  .addField("● m!afk", "● m!ailemiz")
  .addField("● m!anket", "● m!ban")
  .addField("● m!davet", "● m!g-kanal")
  .addField("● m!kick", "● m!küfür-engelle")
  .addField("● m!mod-log-ayarla", "● m!mod-log-sıfırla")
  .addField("● m!bot-mesaj-silici-aç", "● m!bot-mesaj-silici-kapat")
  .addField("● m!otorol", "● m!ping")
  .addField("● m!sayaç-ayarla", "● m!reklam-engelle")
  .addField("● m!sayaç-sıfırla", "● m!seviye")
  .addField("● m!sunucubilgi", "● m!temizle")
  .addField("● m!sustur", "● m!uyar")
  .addField("**» Botun Yardım Sunucusu (Support Server)**", "https://discord.gg/xEzmWsA")
  .addField("**» Botun Davet Linki **", "https://discordapp.com/oauth2/authorize?client_id=610763127461642245&scope=bot&permissions=2146958847")
  .setFooter("MrNYKS Güncel Sürüm [ BETA v0.1  ]")
if (!params[0]) {
    const commandNames = Array.from(client.commands.keys());
    message.channel.send(embedyardim);
  } else {
    let command = params[0];
    if (client.commands.has(command)) {
      command = client.commands.get(command);
      message.author.send(" ", "= ${command.help.name} = \n${command.help.description}\nDoğru kullanım: " + prefix + "${command.help.usage}");
    }
  }
};


exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["h", "halp", "help", "y"],
  permLevel: 0
};

exports.help = {
  name: "yardım",
  description: "Tüm komutları gösterir.",
  usage: "yardım [komut]"
};