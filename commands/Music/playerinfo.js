const { Message, PermissionFlagsBits, Client, EmbedBuilder } = require("discord.js");
const discord = require("discord.js")

module.exports = {
  name: "playerinfo",
  description: `Shows The Settings Of The Music Player.`,
  userPermissions: PermissionFlagsBits.SendMessages,
  botPermissions: PermissionFlagsBits.SendMessages,
  category: "Music",
  cooldown: 10,
  aliases: ["musicinfo"],
  inVc: true,
  player: true,

  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   * @param {String} prefix
   */
  run: async (client, message, args, prefix) => {
    // Code
    let player = client.poru.players.get(message.guild.id)
    let rep = "";
    if (player.loop === "TRACK"){ rep = "Track"}
    if (player.loop === "QUEUE") {rep = "Queue"}
    if (player.loop !== "TRACK" && !player.loop !== "QUEUE") {rep = "<:CrossIcon:1091933858187984996> Disabled"}
    const embed = new EmbedBuilder()
      .setColor(client.color)
      .setAuthor({
        name: `Music Settings For ${message.guild.name}`,
        iconURL: client.user.displayAvatarURL()
      })
      .setDescription(`**Now Playing - ${player.isPlaying ? `[${player.currentTrack.info.title.substring(0, 63)}](${player.currentTrack.info.uri})` : "Nothing"}**`)
      .addFields([
        {
          name: "Queue Length",
          value: `**${player.queue.length}**`
        },
        {
          name: `Song Paused`,
          value: `${player.isPaused ? "**<:iconTick:1091933987359957154> Yes**" : "**<:CrossIcon:1091933858187984996> No**"}`
        },
        {
          name: `Looping`,
          value: `**${rep}**`
        },
        {
          name: `Volume`,
          value: `**${player.volume}%**`
        },
        {
          name: `Autoplay`,
          value: await client.db.get(`auto_${message.guild.id}`) === `true` ? "**<:iconTick:1091933987359957154> Enabled**" : "**<:CrossIcon:1091933858187984996> Disabled**"
        },
        {
          name: `24/7 Mode`,
          value: await client.db.get(`247_${message.guild.id}`) === `true` ? "**<:iconTick:1091933987359957154> Enabled**" : "**<:CrossIcon:1091933858187984996> Disabled**"
        },
        {
          name: `Current Voice Channel`,
          value: `<#${player.voiceChannel}>`
        },
        {
          name: `Current Text Channel`,
          value: `<#${player.textChannel}>`
        }
      ])
    message.reply({ embeds: [embed] })

  },
};
