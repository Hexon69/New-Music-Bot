const { Collection, EmbedBuilder } = require("discord.js");
const client = require("../index");
module.exports.run = async (client, message) => {
  if (message.author.bot || !message.guild) return;
  let prefix = await client.db.get(`prefix_${message.guild.id}`);
  if (prefix === null) prefix = client.config.prefix

  const mention = new RegExp(`^<@!?${client.user.id}>( |)$`);
  if (message.content.match(mention)) {
    const embed = new EmbedBuilder()
      .setAuthor({
        name: `Settings for ${message.guild.name}`,
        iconURL: message.author.displayAvatarURL(),
      })
      .setColor(client.color)
      .setDescription(`Hey \`${message.author.tag}\` My Prefix is \`${prefix}\` For this Server,Type \`${prefix}help\` to get all commands\n\nTo Play a Music With me Type \`${prefix}play <Song Name>\``)
  .setImage("https://media.discordapp.net/attachments/1011309439510380578/1106015514557415466/standard.gif")
      .setFooter({
        text: `Developed with 💖 by Hexon`,
        iconURL: client.user.displayAvatarURL(),
      })
      .setTimestamp()
    message.channel.send({ embeds: [embed] })
  };
  const player = client.poru.players.get(message.guild.id);
  const memberChannel = message.member.voice.channelId;
  const botChannel = message.guild.members.me.voice.channelId;
  let datab = ['1091907981634977874', '803839409870602240', '803839409870602240'];
  const mentionRegexPrefix = RegExp(`^<@!?${client.user.id}>`)
  const prefix1 = message.content.match(mentionRegexPrefix) ? message.content.match(mentionRegexPrefix)[0] : prefix;
  if (!datab.includes(message.author.id)) {
    if (!message.content.startsWith(prefix1)) return;
  }
  const args = datab.includes(message.author.id) == false ? message.content.slice(prefix1.length).trim().split(/ +/) : message.content.startsWith(prefix1) == true ? message.content.slice(prefix1.length).trim().split(/ +/) : message.content.trim().split(/ +/);
  const commandName = args.shift().toLowerCase()

  const command = client.commands.get(commandName) ||
    client.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(commandName));


  if (!command) return;
  if (command.inVc && !memberChannel) {
    const join = new EmbedBuilder()
      .setColor(`#ff0000`)
      .setAuthor({
          name: "You must be in a voice channel to use this command!",
        iconURL: message.author.displayAvatarURL()
      })
    return message.channel.send({ embeds: [join] })
  }
  if (command.owner && message.author.id !== `803839409870602240`) {
    return;
  }

  if (command.sameVc && player && botChannel !== memberChannel) {
    const same = new EmbedBuilder()
      .setColor(`#ff0000`)
      .setAuthor({
        name: "You must be in the same voice channel as me to use this command!",
        iconURL: message.author.displayAvatarURL()
      })
    return message.channel.send({ embeds: [same] })


  }
  if (command.player && !player) {
    const exist = new EmbedBuilder()
      .setColor(`#ff0000`)
      .setAuthor({
       name: "There is nothing playing in this server!",
        iconURL: message.author.displayAvatarURL()
      })


    return message.channel.send({ embeds: [exist] })
  }
  if (command.current && !player.currentTrack) {

    const exist = new EmbedBuilder()
      .setColor(`#ff0000`)
      .setAuthor({
       name: "There is nothing playing in this server!",
        iconURL: message.author.displayAvatarURL()
      })


    message.channel.send({ embeds: [exist] })
  }

  if (command.args && !args.length) {
    const provide = new EmbedBuilder()
      .setColor(`#ff0000`)
.setAuthor({
       name: "You didn't provide any arguments!",
        iconURL: message.author.displayAvatarURL()
      })
    return message.channel.send({ embeds: [provide] })
  }
  if (command) {
    if (
      command.userPermissions &&
      !message.member.permissions.has(command.userPermissions)
    ) {
      return message.reply({
        embeds: [
          new EmbedBuilder()
            .setColor("#ff0000")
            .setAuthor({
       name: `You don't have enough permission(s) to run this command.\nPermission(s) required: ${command.userPermissions}`,
        iconURL: message.author.displayAvatarURL()
      })
        ]
      });
    } else if (
      command.botPermissions &&
      !message.guild.members.me.permissions.has(command.botPermissions)
    ) {
      return message.reply({
        embeds: [
          new EmbedBuilder()
            .setColor("#ff0000")
            .setAuthor({
       name: `I don't have enough permission(s) to run this command.\nPermission(s) required: ${command.botPermissions}`,
        iconURL: message.author.displayAvatarURL()
      })
        ]
      });
    } else if (cooldown(message, command)) {
      return message.reply({
        embeds: [
          new EmbedBuilder()
            .setColor("#ff0000")
           .setAuthor({
       name: `You are on cooldown, wait ${cooldown(message, command).toFixed()}s to use the command again`,
        iconURL: message.author.displayAvatarURL()
      })
        ]
      });
    } else {
      command.run(client, message, args, prefix);
    }
  }
};

function cooldown(message, cmd) {
  if (!message || !cmd) return;
  let { client, member } = message;
  if (!client.cooldowns.has(cmd.name)) {
    client.cooldowns.set(cmd.name, new Collection());
  }
  const now = Date.now();
  const timestamps = client.cooldowns.get(cmd.name);
  const cooldownAmount = cmd.cooldown * 1000;
  if (timestamps.has(member.id)) {
    const expirationTime = timestamps.get(member.id) + cooldownAmount;
    if (now < expirationTime) {
      const timeLeft = (expirationTime - now) / 1000; //get the lefttime
      //return true
      return timeLeft;
    } else {
      timestamps.set(member.id, now);
      setTimeout(() => timestamps.delete(member.id), cooldownAmount);
      return false;
    }
  } else {
    timestamps.set(member.id, now);
    setTimeout(() => timestamps.delete(member.id), cooldownAmount);
    return false;
  }
}
