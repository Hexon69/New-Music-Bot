const { Message, PermissionFlagsBits, Client, EmbedBuilder } = require("discord.js");
const discord = require("discord.js")

module.exports = {
  name: "247",
  description: `Toggles 24/7 mode in the server.`,
  userPermissions: ["ManageGuild"],
  botPermissions: PermissionFlagsBits.SendMessages,
  category: "Settings",
  cooldown: 10,
aliases: ["24h", "24/7", "24*7"],
inVc: true,
  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   * @param {String} prefix
   */
  run: async (client, message, args, prefix) => {
    // Code
    
    let data = await client.db.get(`247_${message.guild.id}`);
  if(!data)
  {
    client.db.set(`247_${message.guild.id}`, `false`)
  }
  const { channel } = message.member.voice;
    if (data === `true`) {
      client.db.set(`247_${message.guild.id}`, `false`);
      client.db.delete(`vcid_${message.guild.id}`);
      client.db.delete(`chid_${message.guild.id}`);
      const embed = new EmbedBuilder()
       .setColor(client.color)
       .setDescription(`24/7 mode is now **disabled**.`)
      return message.channel.send({embeds: [embed]});
    
    }
    if(data === `false`)
    {
      client.db.set(`247_${message.guild.id}`, `true`);
      client.db.set(`vcid_${message.guild.id}`, channel.id);
      client.db.set(`chid_${message.guild.id}`, message.channel.id);
      const embed = new EmbedBuilder()
       .setColor(client.color)
.setDescription(`24/7 mode is now **enabled**.`)
      
      return message.channel.send({embeds: [embed]});
      }
  },
};