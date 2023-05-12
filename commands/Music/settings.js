const { Message, PermissionFlagsBits, Client, EmbedBuilder } = require("discord.js");
const discord = require("discord.js")

module.exports = {
  name: "settings",
  description: `Shows the server settings.`,
  userPermissions: ["ManageGuild"],
  botPermissions: PermissionFlagsBits.SendMessages,
  category: "Music",
  cooldown: 0,


  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   * @param {String} prefix
   */
  run: async (client, message, args, prefix) => {
    // Code
let vc;
      let ap = await client.db.get(`auto_${message.guild.id}`)
      let tw = await client.db.get(`247_${message.guild.id}`)
      if(tw === "true") vc = await client.db.get(`vcid_${message.guild.id}`)
      const embed = new EmbedBuilder()
      .setAuthor({name: `${client.user.username} Settings`, iconURL: client.user.displayAvatarURL()})
      .setColor(client.color)
      .setDescription(`**Prefix** ${prefix}`)
      .addFields({name: `24/7`, value:tw === `true` ? "<:iconTick:1091933987359957154>" : "<:CrossIcon:1091933858187984996>"})
    /*  if(tw === `true`){
      embed.addFields({name: `24/7 VC`, value:`<#${vc}>`})
    }
  */
      embed.addFields({name:`Autoplay`, value:ap === `true` ? "<:iconTick:1091933987359957154>" : "<:CrossIcon:1091933858187984996>"})
      message.channel.send({embeds: [embed]})
  },
};
