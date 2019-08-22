const Discord = require('discord.js');
const fs = require('fs');
const db = require('quick.db');
let kufurEngel = JSON.parse(fs.readFileSync("./jsonlar/kufurEngelle.json", "utf8"));

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
	.addField(`Doğru Kullanım:`, `${ayarlar.prefix}küfür-engelle aç veya kapat`)
	if(secenekler.length < 1) return message.channel.send(errembed);
	//if(secenekler === "aç" || "kapat") return message.channel.send(errembed);
  	if(secenekler.length < 1) return message.reply("Küfür Engelleme Açmak İçin `m!küfür-engelle aç` kapatmak için `m!küfür-engelle kapat`").then(m => m.delete(10000));

    message.delete();

			if (secenekler === "aç") {
		message.channel.send(`Küfür engelleme sistemi başarı ile **açıldı** !`).then(m => m.delete(5000))
		db.set(`ke_${message.guild.id}`, 'acik');
		kufurEngel[message.guild.id] = {
			kufurEngel: "acik"
		  };

		  fs.writeFile("./jsonlar/kufurEngelle.json", JSON.stringify(kufurEngel), (err) => {
			if (err) console.log(err)
		  });
	};

	if (secenekler === "kapat") {
		message.channel.send(`Küfür engelleme sistemi başarı ile **kapatıldı** !`).then(m => m.delete(5000))
		db.set(`ke_${message.guild.id}`, 'kapali');
		kufurEngel[message.guild.id] = {
			kufurEngel: "kapali"
		  };

		fs.writeFile("./jsonlar/kufurEngelle.json", JSON.stringify(kufurEngel), (err) => {
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
		name: 'küfürengelle',
		description: 'Küfür engelleme sistemini açıp kapatmanızı sağlar.',
		usage: 'm!küfür-engelle <aç> veya <kapat>'
	  };