const { Message, PermissionFlagsBits, Client, EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require("discord.js");
const discord = require("discord.js")

module.exports = {
  name: "about",
  description: `See information about this bot`,
  userPermissions: ["SendMessages"],
  botPermissions: ["SendMessages"],
  category: "Utilities",
  cooldown: 0,
  aliases: ["abt"],

  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   * @param {String} prefix
   */
  run: async (client, message, args, prefix) => {
    // Code
    const embed = new EmbedBuilder()
    .setAuthor({
      name: `About ${client.user.username}`,
      iconURL: client.user.displayAvatarURL()
    })
      .setColor(client.color)
    .setDescription(`Hey \`${message.author.username}\` i am \`${client.user.username}\` A Discord Music Bot. With Many Features. Amazing Music Quality. Easy to Use Best Support Team. Try Now **\`${client.user.tag}\`**`)

.addFields([
  {
    name: "Developers ❤️",
    value: "[Hexon#1474](https://discord.com/users/803839409870602240)"
  }
])
const roow = new ActionRowBuilder()
    .addComponents(
      new ButtonBuilder()
      .setLabel("Support Server")
      .setStyle(ButtonStyle.Link)
      .setURL(`https://tinyurl.com/nova-invite`),
 new ButtonBuilder()
      .setLabel("Invite")
      .setStyle(ButtonStyle.Link)
      .setURL(`https://discord.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=418880806849`)

    )
    message.reply({
      embeds: [embed],
      components: [roow]
    })
  },
};