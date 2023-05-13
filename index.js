const discord = require("discord.js");
const { EmbedBuilder, WebhookClient,  GatewayIntentBits, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require('discord.js')
const { Poru ,options} = require("poru");
const Client = discord.Client;
const moment = require("moment");
const botconfig = require('./config.json');
const ms = require("ms");
const mongoose = require("mongoose");
require("dotenv").config()

const client = new Client({
  restWsBridgetimeout: 100,
  allowedMentions: {
    parse: ["roles", "users", "everyone"],
    repliedUser: true,
  },
  
    failIfNotExists: true,
    allowedMentions: {
      parse: ['roles', 'users', 'everyone'],
      repliedUser: false,
    },
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildVoiceStates,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.MessageContent,
      GatewayIntentBits.GuildBans,

    ],
});
const { Database } = require("quickmongo");

client.login("").catch(e => console.log(e));

client.config = require("./config.json");
client.color = 0x303236
client.poru = new Poru(client, client.config.nodes,{
  reconnectTime: 30,
  resumeKey: "muzox",
  resumeTimeout: 60,
  defaultPlatform: "ytsearch",
  spotify: {
    playlistLimit: 10000,
  }
    
});
client.commands = new discord.Collection();
client.config = require('./config.json');
client.prefix = client.config.prefix;
client.aliases = new discord.Collection();
client.slash = new discord.Collection();
client.logger = require("./util/logger.js")
client.cooldowns = new discord.Collection();
client.userSettings = new discord.Collection();
client.db = new Database(botconfig.db);
const dbOptions ={
  useNewUrlParser:true,
  autoIndex:false,
  useUnifiedTopology:true
}

mongoose.connect(botconfig.db,dbOptions)
mongoose.connection.on("connected",()=>{
 client.logger.log("Mongoose Connected")

})
client.on('interactionCreate', async interaction => {
    if(interaction.isButton())
  {
    let player = client.poru.get(interaction.guild.id)
const music = new EmbedBuilder()

music.setColor(client.color)
    if(interaction.customId === 'DELETE_BUT')
    {
    const em = new EmbedBuilder()
    .setDescription(`Only Bot Owner Can Use This Button`)
    .setColor(`#ff0000`)

    if(client.config.owner.includes(interaction.member.user.id))
    return interaction.message.delete();
    else
    return interaction.reply({embeds: [em], ephemeral: true});
    }  
  }
}); 

process.on('unhandledRejection', (error) => {
  console.log(error)
});
//now creating interaction event
["event_handler", "mcmd", "poruEvents"].forEach(handler => {
  require(`./handlers/${handler}`)(client);
});
//wev server
const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('Hello Express app!')
});

app.listen(3000, () => {
  console.log('server started');
})