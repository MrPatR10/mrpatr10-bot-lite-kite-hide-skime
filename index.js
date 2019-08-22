const Discord = require('discord.js');
const db = require('quick.db');
const Hafıza = require('quick.db')
const { RichEmbed } = require('discord.js')
const Zamanlayıcı = require('moment')
const eco = require('discord-economy');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const chalk = require('chalk');
const fs = require('fs');
const moment = require('moment');
require('./util/eventLoader')(client);
let sayac = JSON.parse(fs.readFileSync("./ayarlar/sayac.json", "utf8")); 
let kufurEngel = JSON.parse(fs.readFileSync("./jsonlar/kufurEngelle.json", "utf8"));



var prefix = ayarlar.prefix;

const log = message => {
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'sa') {
    msg.reply('**Aleyküm selam**');
  }

if (msg.content === 'selamın aleyküm') {
   	msg.reply('ve aleyküm selam');
  }

  if (msg.content === 'bye bye') {
   	msg.reply('su gibi git su gibi gel');
  }

  if (msg.content === 'günaydın') {
   	msg.reply('sana da günaydın');
  }

  if (msg.content === 'herkese günaydın') {
   	msg.reply('yepyeni bir güne merhaba :)');
  }

  if (msg.content === 'iyi geceler') {
   	msg.reply('sana da iyi geceler');
  }

  if (msg.content === 'sa') {
   	msg.reply('**Sunucuda Argo Kelime Kullanma**');
  }

  if (msg.content === 'iyi akşamlar') {
   	msg.reply('sana da iyi akşamlar');
  }

  if (msg.content === 'selamın aleyküm') {
   	msg.reply('ve aleyküm selam');
  }

  if (msg.content === 'güle güle') {
   	msg.reply('sana da güle güle');
  }
});

const botadi = "MrNYKS"

client.on('messageDelete', message => {
  let modlogs = db.get(`modlogkanaly_${message.guild.id}`)
  const modlogkanal = message.guild.channels.find(kanal => kanal.id === modlogs);
  if(!modlogs) return;
  if(modlogs) {
    if (message.content.length > 1024) {
      modlogkanal.send({embed: {
    color: 3447003,
    author: {
      name: `${message.author.tag} tarafından gönderilen bir mesaj silindi`,
      icon_url: message.author.DisplayAvatarURL
    },
    fields: [{
        name: `Silinen mesaj 1024 karakterden fazla mesajı gösteremem`,
        value: `\`\`\`Bilinmiyor...\`\`\``
      }
    ],
    timestamp: new Date(),
    footer: {
      icon_url: message.author.DisplayAvatarURL,
      text: `${botadi} | Mod-Log Sistemi`
    }
  }
});
    } else {
      modlogkanal.send({embed: {
    color: 3447003,
    author: {
      name: `${message.author.tag} kullanıcısının mesajı silindi\n`,
      icon_url: message.author.DisplayAvatarURL
    },
    fields: [{
        name: `Silinen mesaj:`,
        value: `\`\`\` ${message.content} \`\`\``
      }
    ],
    timestamp: new Date(),
    footer: {
      icon_url: message.author.DisplayAvatarURL,
      text: `${botadi} | Mod-Log Sistemi`
    }
  }
});
    }
  }
})


client.on('guildBanAdd', async (guild, user) => {
  let modlogs = db.get(`modlogkanaly_${guild.id}`)
  const modlogkanal = guild.channels.find(kanal => kanal.id === modlogs);
  if(!modlogs) return;
  if(modlogs) {
    let embed = new Discord.RichEmbed()
    .setColor("3447003")
    .setAuthor("Bir kişi sunucudan yasaklandı")
    .setThumbnail(user.avatarURL||user.defaultAvatarURL)
    .addField(`Yasaklanan kişi`, `\`\`\` ${user.tag} \`\`\` `)
    .setFooter(`${botadi} | Mod-Log Sistemi`)
    .setTimestamp()
    modlogkanal.send(embed)
  }
});

client.on('guildBanRemove', async (guild, user) => {
  let modlogs = db.get(`modlogkanaly_${guild.id}`)
  const modlogkanal = guild.channels.find(kanal => kanal.id === modlogs);
  if(!modlogs) return;
  if(modlogs) {
    let embed = new Discord.RichEmbed()
    .setColor("3447003")
    .setAuthor("Bir kişinin yasağı kaldırıldı")
    .setThumbnail(user.avatarURL||user.defaultAvatarURL)
    .addField(`Yasağı kaldırılan kişi`, `\`\`\` ${user.tag} \`\`\` `)
    .setFooter(`${botadi} | Mod-Log Sistemi`)
    .setTimestamp()
    modlogkanal.send(embed)
  }
});

client.on('channelCreate', async channel => {
  let modlogs = db.get(`modlogkanaly_${channel.guild.id}`)
  const modlogkanal = channel.guild.channels.find(kanal => kanal.id === modlogs);
  if(!modlogs) return;
  if(modlogs) {
    if (channel.type === "text") {
      modlogkanal.send({embed: {
      color: 3447003,
      fields: [{
          name: `Bir Kanal Oluşturuldu. \nOluşturulan Kanalin İsmi:`,
          value: `\`\`\` ${channel.name} \`\`\``
        },
        {
          name: `Oluşturulan Kanalin Türü`,
          value: `\`\`\` Metin Kanalı \`\`\``
        }
      ],
      timestamp: new Date(),
      footer: {
        text: `${botadi} | Mod-Log Sistemi`
      }
     }});
    } else {
      if (channel.type === "voice") {
       modlogkanal.send({embed: {
    color: 3447003,
    fields: [{
        name: `Bir Kanal Oluşturuldu. \nOluşturulan Kanalin İsmi:`,
        value: `\`\`\` ${channel.name} \`\`\``
      },
      {
        name: `Oluşturulan Kanalin Türü`,
        value: `\`\`\` Ses Kanalı \`\`\``
      }
    ],
    timestamp: new Date(),
    footer: {
      text: `${botadi} | Mod-Log Sistemi`
    }
  }
}); 
      }
    }
  }
});

client.on('channelDelete', async channel => {
  let modlogs = db.get(`modlogkanaly_${channel.guild.id}`)
  const modlogkanal = channel.guild.channels.find(kanal => kanal.id === modlogs);
  if(!modlogs) return;
  if(modlogs) {
    if (channel.type === "text") {
      modlogkanal.send({embed: {
      color: 3447003,
    fields: [{
        name: `Bir Kanal Silindi. \nSilinen Kanalin İsmi:`,
        value: `\`\`\` ${channel.name} \`\`\``
      },
      {
        name: `Silinen Kanalin Türü`,
        value: `\`\`\` Ses Kanalı \`\`\``
      }
      ],
      timestamp: new Date(),
      footer: {
        text: `${botadi} | Mod-Log Sistemi`
      }
     }});
    } else {
      if (channel.type === "voice") {
       modlogkanal.send({embed: {
    color: 3447003,
    fields: [{
        name: `Bir Kanal Silindi. \nSilinen Kanalin İsmi:`,
        value: `\`\`\` ${channel.name} \`\`\``
      },
      {
        name: `Silinen Kanalin Türü`,
        value: `\`\`\` Ses Kanalı \`\`\``
      }
    ],
    timestamp: new Date(),
    footer: {
      text: `${botadi} | Mod-Log Sistemi`
    }
  }
}); 
      }
    }
  }
});

client.on('roleDelete', async role => {
  let modlogs = db.get(`modlogkanaly_${role.guild.id}`)
  const modlogkanal = role.guild.channels.find(kanal => kanal.id === modlogs);
  if(!modlogs) return;
  if(modlogs) {
    modlogkanal.send({embed: {
    color: 3447003,
    fields: [{
        name: `Bir Rol Silindi. \nSilinen Rolun İsmi:`,
        value: `\`\`\` ${role.name} \`\`\``
      }
    ],
    timestamp: new Date(),
    footer: {
      text: `${botadi} | Mod-Log Sistemi`
    }
  }
});
  }
});

client.on('emojiDelete', async emoji => {
  let modlogs = db.get(`modlogkanaly_${emoji.guild.id}`)
  const modlogkanal = emoji.guild.channels.find(kanal => kanal.id === modlogs);
  if(!modlogs) return;
  if(modlogs) {
    modlogkanal.send({embed: {
    color: 3447003,
    fields: [{
        name: `Bir Emoji Silindi. \nSilinen Emojinin İsmi:`,
        value: `\`\`\` ${emoji.name} \`\`\``
      }
    ],
    timestamp: new Date(),
    footer: {
      text: `${botadi} | Mod-Log Sistemi`
    }
  }
});
  
  }
});


client.on('roleCreate', async role => {
  let modlogs = db.get(`modlogkanaly_${role.guild.id}`)
  const modlogkanal = role.guild.channels.find(kanal => kanal.id === modlogs);
  if(!modlogs) return;
  if(modlogs) {
     modlogkanal.send({embed: {
    color: 3447003,
    fields: [{
        name: `Yeni Bir Rol Oluşturuldu. \nOluşturulan Rolun İsmi:`,
        value: `\`\`\` ${role.name} \`\`\``
      }
    ],
    timestamp: new Date(),
    footer: {
      text: `${botadi} | Mod-Log Sistemi`
    }
  }
});
  }
});


client.on('messageUpdate', async (oldMessage, newMessage) => {
  let modlogs = db.get(`modlogkanaly_${oldMessage.guild.id}`)
  const modlogkanal = oldMessage.guild.channels.find(kanal => kanal.id === modlogs);
  if(!modlogs) return;
  if(modlogs) {
    if (oldMessage.author.bot) {
        return false;
    }

    if (!oldMessage.guild) {
        return false;
    }

    if (oldMessage.content == newMessage.content) {
        return false;
    }
    modlogkanal.send({embed: {
      color: 3447003,
      author: {
      name: `${oldMessage.author.tag} mesajını düzenledi:\n`,
      icon_url: oldMessage.author.DisplayAvatarURL
      },
      fields: [{
        name: `Eski mesaj:`,
        value: `\`\`\` ${oldMessage.content} \`\`\``
      },
      {
        name: `Yeni Mesaj:`,
        value: `\`\`\` ${newMessage.content} \`\`\``
      }
      ],
      timestamp: new Date(),
      footer: {
      icon_url: oldMessage.author.DisplayAvatarURL,
      text: `${botadi} | Mod-Log Sistemi`
      }
    }
    });
  }
});


client.on('emojiCreate', async emoji => {
  let modlogs = db.get(`modlogkanaly_${emoji.guild.id}`)
  const modlogkanal = emoji.guild.channels.find(kanal => kanal.id === modlogs);
  if(!modlogs) return;
  if(modlogs) {
    modlogkanal.send({embed: {
    color: 3447003,
    fields: [{
        name: `Bir emoji eklendi. \nEklenen Emojinin İsmi:`,
        value: `\`\`\` ${emoji.name} \`\`\``
      }
    ],
    timestamp: new Date(),
    footer: {
      text: `${botadi} | Mod-Log Sistemi`
    } 
   } 
});
  }
});

client.elevation = message => {
  if(!message.guild) {
	return; }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};

client.on("message", async msg => {
  
  if (msg.channel.type === "dm") return;
  if(msg.author.bot) return;  
  
  if (msg.content.length > 7) {
    
    db.add(`puan_${msg.author.id + msg.guild.id}`, 3)
};

  if (db.fetch(`puan_${msg.author.id + msg.guild.id}`) > 150) {
    
    db.add(`seviye_${msg.author.id + msg.guild.id}`, 1)
    
    db.delete(`puan_${msg.author.id + msg.guild.id}`)
    
  };
  
});

client.on("message", async msg => {
const db = require('quick.db');   
    let i = db.fetch(`otobsilicia_${msg.channel.id+msg.guild.id}`)
      if (i == undefined) {           
          }
        if (i == 'acik') {   
              let kanal = db.fetch(`otobsilici_${msg.channel.id+msg.guild.id}`)

          if (msg.channel.id != kanal.id) {
  if (msg.content.length > 0) {

    if(msg.author.bot === true){
      msg.delete(3000)
    }
  }
          }
        }
       
  
  })

client.on("message", msg => {
  let küfürEngel = db.fetch(`ke_${msg.guild.id}`)
  if (!msg.guild) return
  if (küfürEngel === 'kapali') return
    if (küfürEngel === 'acik') {
      const küfür = ["mk", "amk", "aq", "orospu", "oruspu", "oç", "sikerim", "yarrak", "piç", "amq", "sik", "amcık", "çocu", "sex", "seks", "amına", "orospu çocuğu", "sg", "siktir git"];
  if (küfür.some(word => msg.content.toLowerCase().includes(word)) ) {
    if (!msg.member.hasPermission("ADMINISTRATOR")) {
      msg.delete()
       msg.channel.send(new Discord.RichEmbed().setColor('#000000').setDescription('Olm utanmıyon mu yaşına başına bakmadan küfür etmeye he?! Püü senin sıfatına!')).then(message => message.delete(3000));
    }
}
    }
})

client.on("message", msg => {
  let küfürEngel = db.fetch(`re_${msg.guild.id}`)
  if (!msg.guild) return
  if (küfürEngel === 'kapat') return
    if (küfürEngel === 'ac') {
      const küfür = ["com", "net", "http", "https", "www", "tk", "ml", "ga", "xyz", "org", "tc", "discord.gg", "gg", "com.tr", "net.tr", "gov.tr", "tl", "link.tl", "ly"];
  if (küfür.some(word => msg.content.toLowerCase().includes(word)) ) {
    if (!msg.member.hasPermission("ADMINISTRATOR")) {
      msg.delete()
       msg.channel.send(new Discord.RichEmbed().setColor('#000000').setDescription('Olm utanmıyon mu yaşına başına bakmadan reklam yapmak he?! Püü senin sıfatına!')).then(message => message.delete(3000));
    }
}
    }
})

client.on('guildMemberAdd', async (member, guild, message) => {

let role = await  db.fetch(`otorolisim_${member.guild.id}`)
 let otorol = await db.fetch(`autoRole_${member.guild.id}`)
 let i = await db.fetch(`otorolKanal_${member.guild.id}`)
 if (!otorol || otorol.toLowerCase() === 'yok') return;
else {
 try {

  if (!i) return 

  member.addRole(member.guild.roles.get(otorol))
                        var embed = new Discord.RichEmbed()
                        .setDescription(`**Sunucuya Yeni Katılan** \`${member.user.tag}\` **Kullanıcısına** \`${role}\` **Rolü verildi.**`)
                        .setColor('0x36393E') 
                        .setFooter(`Otorol Sistemi`)
     member.guild.channels.get(i).send(embed)  } catch (e) {
 console.log(e)
}
}

});

exports.run = async (client, message, args) => {
 if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send('Bu komutu kullanmak için `Yönetici` yetkiniz olması lazım')
  let tag = args.slice(0).join(' ');
  if (!tag) return message.channel.send('Bir tag girmelisin.')
  db.set(`tags_${message.guild.id}`, tag)
  message.channel.send('Tag başarıyla `'+ tag +'` olarak ayarlandı!')
   }   

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'tag',
  description: '',
  usage: ''
};

client.on('guildMemberAdd', async (message, member) => {
  client.users.get(member.id).setName(await require('quick.db').fetch(`tags_${message.guild.id}`))
});

	
client.on("message", async message => {
    let sayac = JSON.parse(fs.readFileSync("./ayarlar/sayac.json", "utf8"));
    if(sayac[message.guild.id]) {
        if(sayac[message.guild.id].sayi <= message.guild.members.size) {
            const embed = new Discord.RichEmbed()
                .setDescription(`Tebrikler, başarılı bir şekilde ${sayac[message.guild.id].sayi} kullanıcıya ulaştık!`)
                .setColor("0x808080")
                .setTimestamp()
            message.channel.send({embed})
            delete sayac[message.guild.id].sayi;
            delete sayac[message.guild.id];
            fs.writeFile("./ayarlar/sayac.json", JSON.stringify(sayac), (err) => {
                console.log(err)
            })
        }
    }
})
client.on("guildMemberRemove", async member => {
        let sayac = JSON.parse(fs.readFileSync("./ayarlar/sayac.json", "utf8"));
  let giriscikis = JSON.parse(fs.readFileSync("./ayarlar/sayac.json", "utf8"));  
  let embed = new Discord.RichEmbed()
    .setTitle('')
    .setDescription(``)
 .setColor("RED")
    .setFooter("", client.user.avatarURL);
 
  if (!giriscikis[member.guild.id].kanal) {
    return;
  }
 
  try {
    let giriscikiskanalID = giriscikis[member.guild.id].kanal;
    let giriscikiskanali = client.guilds.get(member.guild.id).channels.get(giriscikiskanalID);
    giriscikiskanali.send(`:loudspeaker: ${member.user.tag}, aramızdan ayrıldı, \**${sayac[member.guild.id].sayi}\** kişi olmamıza \**${sayac[member.guild.id].sayi - member.guild.memberCount}\** kişi kaldı!`);
  } catch (e) { 
    return console.log(e)
  }
 
});
client.on("guildMemberAdd", async member => {
        let sayac = JSON.parse(fs.readFileSync("./ayarlar/sayac.json", "utf8"));
  let giriscikis = JSON.parse(fs.readFileSync("./ayarlar/sayac.json", "utf8"));  
  let embed = new Discord.RichEmbed()
    .setTitle('')
    .setDescription(``)
 .setColor("GREEN")
    .setFooter("", client.user.avatarURL);
 
  if (!giriscikis[member.guild.id].kanal) {
    return;
  }
 
  try {
    let giriscikiskanalID = giriscikis[member.guild.id].kanal;
    let giriscikiskanali = client.guilds.get(member.guild.id).channels.get(giriscikiskanalID);
    giriscikiskanali.send(`:loudspeaker: ${member.user.tag}, aramıza katıldı **${sayac[member.guild.id].sayi}** kişi olmamıza **${sayac[member.guild.id].sayi - member.guild.memberCount}** kişi kaldı!` );
  } catch (e) { 
    return console.log(e)
  }
 
});

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;

client.on('warn', e => {
  console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
  console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

client.login(ayarlar.token);
