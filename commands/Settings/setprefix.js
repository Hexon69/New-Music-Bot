const { Message, PermissionFlagsBits, Client, EmbedBuilder } = require("discord.js");

module.exports = {
  name: "setprefix",
  description: "Set custom prefix.",
  userPermissions: PermissionFlagsBits.SendMessages,
  botPermissions: PermissionFlagsBits.SendMessages,
  category: "Settings",
  cooldown: 5,
  aliases: ["sp", "prefix"],
  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   * @param {String} prefix
   */
  run: async (client, message, args) => {
    let prefix = await client.db.get(`prefix_${message.guild.id}`);
      if (prefix === null) prefix = client.config.PREFIX
    if (!args[0]) {
    const embed = new EmbedBuilder()
      .setColor(client.color)
        .setDescription(`The current prefix for this server is \`${prefix}\``)
        
      return message.channel.send({ embeds: [embed]})
    }
    if (args[1]) {
       const thing = new EmbedBuilder()
        .setDescription("You can not set prefix a double argument")
        .setColor(client.color)
      return message.channel.send({ embeds: [thing] });
    }

    if (args[0].length > 3) {
       const pf = new EmbedBuilder()
        .setDescription("You can not send prefix more than 3 characters")
        .setColor(client.color)
      return message.channel.send({ embeds: [pf] });
    }

    if (args.join("") === "+") {
      client.db.delete(`prefix_${message.guild.id}`);
      const tf = new EmbedBuilder()
        .setDescription("Reseted Prefix")
              .setColor(client.color)
        message.channel.send({ embeds: [tf] });
    }

    client.db.set(`prefix_${message.guild.id}`, args[0]);
    const nc = new EmbedBuilder()
       .setDescription(`Now bot's prefix has been set to \`${args[0]}\``)
       .setColor(client.color)
    await message.channel.send({ embeds: [nc] });
  }}