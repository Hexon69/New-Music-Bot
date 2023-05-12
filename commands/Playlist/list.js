const { Message, PermissionFlagsBits, Client, EmbedBuilder } = require("discord.js");
const discord = require("discord.js")
const db = require("../../schema/playlist");
const lodash = require("lodash");

module.exports = {
  name: "list",
  description: `List your created playlists.`,
  userPermissions: PermissionFlagsBits.SendMessages,
  botPermissions: PermissionFlagsBits.SendMessages,
  category: "Playlist", 
  cooldown: 10,
aliases: ["pl-list"],

  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   * @param {String} prefix
   */
  run: async (client, message, args, prefix) => {
    // Code
    let data = await db.find({ UserId: message.author.id});
        if (!data.length) {
            return message.reply({ embeds: [new EmbedBuilder().setColor(client.color).setDescription(`You don't have any Playlist.`)] });
        }
           const embeds = new EmbedBuilder()
          data.map((x, i) => embeds.addFields([{name: `**Playlist: ${++i} | Name: ${x.PlaylistName}**`, value: `**Tracks: ${x.songs.length} | Created On: <t:${x.CreatedOn}> (<t:${x.CreatedOn}:R>)**`}]))
              embeds.setAuthor({
              name: `${message.author.username}s Playlists`, iconURL: `${message.author.displayAvatarURL({dynamic: true})}`
            })
              embeds.setColor(client.color);
            return await message.channel.send({ embeds: [embeds] });

  },
};