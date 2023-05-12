const { Message, PermissionFlagsBits, Client, EmbedBuilder, ButtonStyle, ButtonBuilder, ActionRowBuilder } = require("discord.js");
const discord = require("discord.js")
const { convertTime } = require("../../util/convert.js")
const load = require('lodash')
module.exports = {
  name: "queue",
  description: `Displays the music queue and current song.`,
  userPermissions: ["SendMessages"],
  botPermissions: ["SendMessages"],
  category: "Music",
  cooldown: 10,
  aliases: ["q"],
  inVc: false,
  sameVc: false,
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
    const player = client.poru.players.get(message.guild.id);
    const queue = player.queue;
    if (!player) return message.channel.send({ embeds: [new EmbedBuilder().setColor(client.color).setTimestamp().setDescription(`Nothing is playing right now.`)] });

    if (!player.isPlaying) return message.channel.send({ embeds: [new EmbedBuilder().setColor(client.color).setTimestamp().setDescription(`Nothing is playing right now.`)] });

    if (player.queue.length === "0" || !player.queue.length) {
      const embed = new EmbedBuilder()
        .setColor(client.color)
        .setDescription(`🔊 Now Playing:\n [${player.currentTrack.info.title}](${player.currentTrack.info.uri}) • \`[${convertTime(player.currentTrack.info.length - player.position)} left]\``)

      await message.channel.send({
        embeds: [embed]
      }).catch(() => { });
    } else {
      const queuedSongs = player.queue.map((t, i) => `${i})〢 [${t.info.title}](${t.info.uri}) • \`[${convertTime(t.info.length)}]\``);

      const mapping = load.chunk(queuedSongs, 10);
      const pages = mapping.map((s) => s.join("\n"));
      let page = 0;

      if (player.queue.size < 11) {
        const embed = new EmbedBuilder()
          .setColor(client.color)
          .setDescription(`**Now playing**\n[${player.currentTrack.info.title}](${player.currentTrack.info.uri})\nAuthor: ${player.currentTrack.info.author}\nRequested by: ${player.currentTrack.info.requester}\nDuration: \`${convertTime(player.currentTrack.info.length)}\`\n\n**Upcoming songs**\n${pages[page]}`)

          .setFooter({ text: `Page ${page + 1}/${pages.length}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) })

          .setAuthor({ name: `Music Queue`, iconURL: client.user.displayAvatarURL({ dynamic: true }) })

        await message.channel.send({
          embeds: [embed]
        })
      } else {
        const embed2 = new EmbedBuilder()
          .setColor(client.color)
          .setDescription(`**Now playing**\n[${player.currentTrack.info.title}](${player.currentTrack.info.uri})\nAuthor: ${player.currentTrack.info.author}\nRequested by: ${player.currentTrack.info.requester}\nDuration: \`${convertTime(player.currentTrack.info.length)}\`\n\n**Upcoming Songs**\n${pages[page]}`)

          .setFooter({ text: `Page ${page + 1}/${pages.length}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
          .setAuthor({ name: 'Music Queue', iconURL: client.user.displayAvatarURL({ dynamic: true }) })


        const but1 = new ButtonBuilder()
          .setCustomId("queue_cmd_but_1")

          .setLabel("Nex Page").setEmoji("973804130663555102")
          .setStyle(ButtonStyle.Secondary)

        const but2 = new ButtonBuilder()
          .setCustomId("queue_cmd_but_2")

          .setLabel("Prev Page")
          .setEmoji("973804190080061492")
          .setStyle(ButtonStyle.Secondary)

        const but3 = new ButtonBuilder()
          //secon
          .setCustomId("queue_cmd_but_3")
          .setLabel(`${page + 1}/${pages.length}`)
          .setStyle(ButtonStyle.Secondary)
          .setDisabled(true)

        const row1 = new ActionRowBuilder().addComponents([
          but2, but3, but1
        ]);

        const msg = await message.channel.send({
          embeds: [embed2],
          components: [row1]
        })

        const collector = message.channel.createMessageComponentCollector({
          filter: (b) => {
            if (b.user.id === message.author.id) return true;
            else {
              b.reply({
                ephemeral: true,
                content: `Only **${message.author.tag}** can use this button, if you want then you've to run the command again.`
              });
              return false;
            };
          }
        });

        collector.on("collect", async (button) => {
          if (button.customId === "queue_cmd_but_1") {
            await button.deferUpdate().catch(() => { });
            page = page + 1 < pages.length ? ++page : 0;

            const embed3 = new EmbedBuilder()
              .setColor(client.color)
              .setDescription(`**Now playing**\n[${player.currentTrack.info.title}](${player.currentTrack.info.uri})\nAuthor: ${player.currentTrack.info.author}\nRequested by: ${player.currentTrack.info.requester}\nDuration: \`${convertTime(player.currentTrack.info.length)}\`\n\n**Coming up...**\n${pages[page]}`)

              .setFooter({ text: `Page ${page + 1}/${pages.length}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) })

              .setAuthor({ name: 'Music Queue', iconURL: client.user.displayAvatarURL() })


            await msg.edit({
              embeds: [embed3],
              components: [new ActionRowBuilder().addComponents(but2, but3.setLabel(`${page + 1}/${pages.length}`), but1)]
            })
          } else if (button.customId === "queue_cmd_but_2") {
            await button.deferUpdate().catch(() => { });
            page = page > 0 ? --page : pages.length - 1;

            const embed4 = new EmbedBuilder()
              .setColor(client.color)
              .setDescription(`**Now playing**\n[${player.currentTrack.info.title}](${player.currentTrack.info.uri})\nAuthor: ${player.currentTrack.info.author}\nRequested by: ${player.currentTrack.info.requester}\nDuration: \`${convertTime(player.currentTrack.info.length)}\`\n\n**Coming up...**\n${pages[page]}`)

              .setFooter({ text: `Page ${page + 1}/${pages.length}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) })

              .setAuthor({ name: 'Music Queue', iconURL: client.user.displayAvatarURL() })


            await msg.edit({
              embeds: [embed4],
              components: [new ActionRowBuilder().addComponents(but2, but3.setLabel(`Page ${page + 1}/${pages.length}`), but1)]
            }).catch(() => { });
          } else return;
        });


      }
    }
  },
}; 