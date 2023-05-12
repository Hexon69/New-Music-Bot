const { Message, PermissionFlagsBits, Client, EmbedBuilder } = require("discord.js");
const discord = require("discord.js")
const { readdirSync } = require("fs");
module.exports = {
  name: "help",
  description: `Help with all commands, or one specific command.`,
  userPermissions: PermissionFlagsBits.SendMessages,
  botPermissions: PermissionFlagsBits.SendMessages,
  category: "Utilities",
  cooldown: 10,
aliases: ["h"],

  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   * @param {String} prefix
   */
  run: async (client, message, args, prefix) => {
    // Code
  const m_commands = client.commands.filter((x) => x.category && x.category === "Music").map((x) => `\`${x.name}\``)
   const u_commands = client.commands.filter((x) => x.category && x.category === "Utilities").map((x) => `\`${x.name}\``)
   const p_commands = client.commands.filter((x) => x.category && x.category === "Playlist").map((x) => `\`${x.name}\``)
const s_commands = client.commands.filter((x) => x.category && x.category === "Settings").map((x) => `\`${x.name}\``);

          const f_commands = client.commands.filter((x) => x.category && x.category === "Filters").map((x) => `\`${x.name}\``)
        const sou_commands = client.commands.filter((x) => x.category && x.category === "Sources").map((x) => `\`${x.name}\``);
    if (!args[0]) {
      let categories = [];
let cots = [];
      readdirSync("./commands").forEach((dir) => {
        const commands = readdirSync(`./commands/${dir}/`).filter((file) =>
          file.endsWith(".js")
        );
const cmds = commands.map((command) => {
          let file = require(`../../commands/${dir}/${command}`);

          if (!file.name) return "No command name.";

          let name = file.name.replace(".js", "");

          return `\`${name}\``;
        });
let data = new Object();

        data = {
          name: `${dir} [${cmds.length}]`,
          value: cmds.length === 0 ? "UNKNOWN" : cmds.join(", "),
        };

        categories.push(data);
        cots.push(dir.toLowerCase());
      });
      const embed = new EmbedBuilder()
      .setAuthor({ name: `${client.user.username} Commands`, iconURL: client.user.displayAvatarURL()})
        .setDescription(`• My Prefix For This Server is ${prefix}\nType \`${prefix}help <command name>\` for more information on a command!`)
        .addFields([
          {
            name: `Utilities [${u_commands.length}]`,
            value: `${(u_commands).join(", ")}`
          },
          {
            name: `Music [${m_commands.length}]`,
            value: `${(m_commands).join(", ")}`
          },
{
            name: `Playlist [${p_commands.length}]`,
            value: `${(p_commands).join(", ")}`
          },
          {
            name: `Settings [${s_commands.length}]`,
            value: `${(s_commands).join(", ")}`
          },

        ])
.addFields([
  
           {
            name: `Sources [${sou_commands.length}]`,
            value: `${(sou_commands).join(", ")}`
          },
])
      .addFields([
          {
            name: `Filters [${f_commands.length}]`,
            value: `${(f_commands).join(", ")}`
          },

        ])
        .setFooter({text: "Developed with 💖 by Hexon",
  iconURL: message.guild.iconURL()
})
        .setThumbnail(message.guild.iconURL())
        
        .setColor(client.color);
      return message.channel.send({ embeds: [embed] });
    } else {
      let cots = [];
      const command =
        client.commands.get(args[0].toLowerCase()) ||
        client.commands.find(
          (c) => c.aliases && c.aliases.includes(args[0].toLowerCase())
        );
      if (args[0].toLowerCase() !== "owner" && cots.includes(args[0].toLowerCase())) {
        const b = new EmbedBuilder()
      .setAuthor({ name: `Commands`, iconURL: client.user.displayAvatarURL()})
        .setDescription(`• My Prefix For This Server is ${prefix}\nType \`${prefix}help <command name>\` for more information on a command!`)
        .addFields(categories)

        .setFooter({text: "Developed with ❤️ by Hexon",
  iconURL: message.guild.iconURL()
})
        .setThumbnail(message.guild.iconURL())
        
        .setColor(client.color);
      return message.channel.send({ embeds: [b] });
      }
    

      if (!command || command.category === "Owner") {
        const embed = new EmbedBuilder()
          .setTitle(`Invalid command! Use \`${prefix}help\` for all of my commands!`)

          .setColor(client.color);
        return message.channel.send({embeds: [embed]});
      }

      const embed = new EmbedBuilder()
        .setTitle("Command: " + args[0])
      .addFields([
        
        {
          name: "Name:",
          value: command.name ? `\`${command.name}\`` : "**Name not found!**"
        },
        {
          name: "Aliases:",
          value: command.aliases
            ? `\`${command.aliases.join("` `")}\``
            : "**No aliases found for this command.**"
        },
        {
          name: "Usage:",
          value: command.usage
            ? `\`${command.name} ${command.usage}\``
            : `\`${prefix}${command.name}\``
        },
{
name: "Description:",
  value: command.description
            ? command.description
            : "**No description found for this command.**"
}

      ])
      .setColor(client.color);
      return message.channel.send({embeds:[embed]});
    }
  },
};