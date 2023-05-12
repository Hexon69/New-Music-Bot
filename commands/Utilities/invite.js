const { Message, PermissionFlagsBits, Client, EmbedBuilder, ButtonBuilder, ActionRowBuilder,ButtonStyle } = require("discord.js");
const discord = require("discord.js")

module.exports = {
  name: "invite",
  description: `Get the bot's invite link`,
  userPermissions: ["SendMessages"],
  botPermissions: ["SendMessages"],
  category: "Utilities",
  cooldown: 0,
aliases: ["inv", "addme"],

  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   * @param {String} prefix
   */
  run: async (client, message, args, prefix) => {
    // Code
 const r = new ActionRowBuilder()
    .addComponents(
      new ButtonBuilder()
      .setLabel(`${client.user.username}`)
.setStyle(ButtonStyle.Link)
.setURL(`https://discord.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=418880806849`)

    )
    message.reply({
      content: `***__Click Below Button For Invite__***`,
      components: [r]
    })
  },
};