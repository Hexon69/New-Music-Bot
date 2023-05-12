const { Message, PermissionFlagsBits, Client, EmbedBuilder,  ActionRowBuilder, ButtonBuilder, AttachmentBuilder, ButtonStyle } = require("discord.js");
const discord = require("discord.js")
const { post } = require("node-superfetch");

module.exports = {
  name: "eval",
  description: `Evaluate a Code Snippet`,
  userPermissions: PermissionFlagsBits.SendMessages,
  botPermissions: PermissionFlagsBits.SendMessages,
  category: "Owner",
  cooldown: 10,
aliases: ["ev"],
owner: true,
  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   * @param {String} prefix
   */
  run: async (client, message, args, prefix) => {
    // Code
    const row = new ActionRowBuilder()
           .addComponents(new ButtonBuilder()
    .setLabel("Delete")
    .setCustomId('DELETE_BUT')
    .setStyle(ButtonStyle.Danger));
  const embed = new EmbedBuilder()
       .addFields([{ name: "Input", value: "```js\n" + args.join(" ") + "```"}
        ])
        try {
            const code = args.join(" ");
            if (!code) return message.channel.send({content: "Please include the code.", components: [row]});
            let evaled;

            if (code.includes(`SECRET`) || code.includes(`TOKEN`) || code.includes("process.env")) {
                evaled = "No, shut up, what will you do it with the token?";
            } else {
                evaled = await eval(code);
            }

            if (typeof evaled !== "string") evaled = await require("util").inspect(evaled, { depth: 0 });

            let output = clean(evaled);
            if (output.length > 1024) {
               
                const { body } = await post("https://hastebin.com/documents").send(output);
                embed.addFields([{ name: "Output", value: `https://hastebin.com/${body.key}.js`, inline: true }]).setColor(client.color);
              
            } else {
                embed.addFields([{ name: "Output", value: "```js\n" + output + "```", inline: true }]).setColor(client.color);
            }

            message.channel.send({embeds: [embed], components: [row]});

        } catch (error) {
            let err = clean(error);
            if (err.length > 1024) {
               
                const { body } = await post("https://hastebin.com/documents").send(err);
                embed.addFields([{ name: "Output", value: `https://hastebin.com/${body.key}.js`, inline: true }]).setColor("Red");
            } else {
                embed.addFields([{ name: "Output", value: "```js\n" + err + "```", inline: true }]).setColor("Red");
            }

            message.channel.send({embeds: [embed], components: [row]});
        }
    }
                  }
function clean(string) {
    if (typeof text === "string") {
        return string.replace(/`/g, "`" + String.fromCharCode(8203))
            .replace(/@/g, "@" + String.fromCharCode(8203))
    } else {
        return string;
    }
              }