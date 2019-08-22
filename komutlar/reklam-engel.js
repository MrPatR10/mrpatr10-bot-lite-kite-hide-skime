const Discord = require('discord.js');
const fs = require('fs');
const db = require('quick.db');
let kufurEngel = JSON.parse(fs.readFileSync("./jsonlar/reklamEngelle.json", "utf8"));

var ayarlar = require('../ayarlar.json');

exports.run = (client, message) => {
  if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply(`Bu komutu kullanabilmek için **Yönetici** iznine sahip olmalısın!`);
            if(message.channel.type == "dm")  return;
  if(message.channel.type !== "text") return;

	let args = message.content.split(' ').slice(1);
	const secenekler = args.slice(0).join(' ');

	var errembed = new Discord.RichEmbed()
	.setColor("RANDOM")
	.setDescription(`Yanlış Kullanım!`)
	.addField(`Doğru Kullanım:`, `${ayarlar.prefix}reklam-engelle aç veya kapat`)
	if(secenekler.length < 1) return message.channel.send(errembed);
	//if(secenekler === "aç" || "kapat") return message.channel.send(errembed);
  	if(secenekler.length < 1) return message.reply("Reklam Engelleme Açmak İçin `m!reklam-engelle aç` kapatmak için `m!reklam-engelle kapat`").then(m => m.delete(10000));

    message.delete();

			if (secenekler === "aç") {
		message.channel.send(`Küfür engelleme sistemi başarı ile **açıldı** !`).then(m => m.delete(5000))
		db.set(`re_${message.guild.id}`, 'ac');
		kufurEngel[message.guild.id] = {
			kufurEngel: "ac"
		  };

		  fs.writeFile("./jsonlar/reklamEngelle.json", JSON.stringify(kufurEngel), (err) => {
			if (err) console.log(err)
		  });
	};

	if (secenekler === "kapat") {
		message.channel.send(`Küfür engelleme sistemi başarı ile **kapatıldı** !`).then(m => m.delete(5000))
		db.set(`re_${message.guild.id}`, 'kapat');
		kufurEngel[message.guild.id] = {
			kufurEngel: "kapali"
		  };

		fs.writeFile("./jsonlar/reklamEngelle.json", JSON.stringify(kufurEngel), (err) => {
			if (err) console.log(err)
		  });
	};
}
	exports.conf = {
		enabled: true,
		guildOnly: false,
		aliases: ['küfürengel','küfür-engelle'],
		permLevel: 3
	  };

	  exports.help = {
		name: 'reklam-engelle',
		description: 'Küfür engelleme sistemini açıp kapatmanızı sağlar.',
		usage: 'm!reklam-engelle <aç> veya <kapat>'
	  };