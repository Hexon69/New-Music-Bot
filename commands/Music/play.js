const { Message, PermissionFlagsBits, Client, EmbedBuilder } = require("discord.js");

module.exports = {
  name: "play",
  description: "Plays a song with the given name or url.",
  userPermissions: ["SendMessages"],
  botPermissions: ["SendMessages"],
  category: "Music",
  aliases: ["p"],
  usage: "<url | Song Name>",
  inVc: true,
  sameVc: true,
  args: true,
  cooldown: 0,
  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   * @param {String} prefix
   */
  run: async (client, message, args, prefix) => {
    //
    const player = await client.poru.createConnection({
      guildId: message.guild.id,
      voiceChannel: message.member.voice.channel.id,
      textChannel: message.channel.id,
      selfDeaf: true,
      selfMute: false,
    })
    // Getting tracks
    const resolve = await client.poru.resolve(args.join(' '));
    const { loadType, tracks, playlistInfo } = resolve;
    // Adding in queue
    if (loadType === "PLAYLIST_LOADED") {
      for (let x of resolve.tracks) {
        x.info.requester = message.author;
        player.queue.add(x);
      }
      message.channel.send({
        embeds: [
          new EmbedBuilder()
            .setAuthor({ name: `Queued | ${resolve.tracks.length} song(s) from ${playlistInfo.name}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
            .setColor(client.color)
        ]
      });
      if (!player.isPlaying && !player.isPaused) return player.play();
    } else if (loadType === "SEARCH_RESULT" || loadType === "TRACK_LOADED") {
      const track = tracks.shift();
      track.info.requester = message.author.tag;
      player.queue.add(track);
      if (!player.isPlaying && !player.isPaused) return player.play();
      if (player.queue.length > 0) {
        return message.channel.send({
          embeds: [
            new EmbedBuilder()
              .setAuthor({ name: `Queued | ${track.info.title}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
              .setColor(client.color)  
          ]
        });
      }
    } else {
      const not = new EmbedBuilder()
        .setColor(client.color)
        .setDescription(`**There were no results found try to be more specific as possible once check song title.**`)
      return message.channel.send({ embeds: [not] })
    }
  }
}