const { Message, PermissionFlagsBits, Client, EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require("discord.js");
const discord = require("discord.js")

module.exports = {
  name: "support",
  description: `Join the support server of the bot!`,
  userPermissions: ["SendMessages"],
  botPermissions: ["SendMessages"],
  category: "Utilities",
  cooldown: 0,
  aliases: ["spt"],

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
    /*.setAuthor({
      name: `About ${client.user.username}`,
      iconURL: client.user.displayAvatarURL()
    })*/
      .setColor(client.color)
    .setDescription(`[Click Here](https://discord.gg/tWt45THMz8) To join support server of **${client.user.username}**`)

/*.addFields([
  {
    name: "Developers ❤️",
    value: "[Hexon#1474](https://discord.com/users/803839409870602240)"
  }
])*/
const row = new ActionRowBuilder()
    .addComponents(
      new ButtonBuilder()
      .setLabel("Support")
      .setStyle(ButtonStyle.Link)
      .setURL('https://tinyurl.com/nova-invite'),
 /*new ButtonBuilder()
      .setLabel("Invite")
      .setStyle(ButtonStyle.Link)
      .setURL(`https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=36768832&scope=applications.commands%20bot`)
*/
    )
    message.reply({
      embeds: [embed],
      components: [row]
    })
  },
};