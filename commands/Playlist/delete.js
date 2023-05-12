const { Message, PermissionFlagsBits, Client, EmbedBuilder } = require("discord.js");
const discord = require("discord.js")
const db = require("../../schema/playlist")
const lodash = require("lodash");
module.exports = {
  name: "delete",
  description: `Delete your saved playlist.`,
  userPermissions: PermissionFlagsBits.SendMessages,
  botPermissions: PermissionFlagsBits.SendMessages,
  category: "Playlist",
  cooldown: 10,
aliases: ["pl-delete"],
usage: "<playlist name>",
  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   * @param {String} prefix
   */
  run: async (client, message, args, prefix) => {
    // Code
    const Name = args.join(" ");
    if(!Name){
      return message.reply({
embeds: [
                  new EmbedBuilder()
                  .setDescription("Provide me a name!")
                  .setColor(client.color)
    ]
    
                           })
    }
        const data = await db.findOne({ UserId: message.author.id, PlaylistName: Name });
        if (!data) {
            return message.reply({ embeds: [new EmbedBuilder().setColor(client.color).setDescription(`You don't have any Playlist named **${Name}**.`)] });
        }
        if (data.length == 0) {
            return message.reply({ embeds: [new EmbedBuilder().setColor(client.color).setDescription(`You don't have any Playlist named **${Name}**.`)] });
        }
        await data.delete();
        const embed = new EmbedBuilder()
            .setColor(client.color)
            .setDescription(`Playlist **${Name}** Deleted`)
        return message.channel.send({ embeds: [embed] })
  },
};