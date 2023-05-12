const { Message, PermissionFlagsBits, Client, EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require("discord.js");
const discord = require("discord.js")
const db = require("../../schema/playlist")
const { convertTime } = require("../../util/convert.js")
const lodash = require("lodash");
module.exports = {
  name: "info",
  description: `Get information about your saved playlist.`,
  userPermissions: PermissionFlagsBits.SendMessages,
  botPermissions: PermissionFlagsBits.SendMessages,
  category: "Playlist",
  cooldown: 10,
  usage: "<playlist name>",
aliases: ["pl-info"],

  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   * @param {String} prefix
   */
  run: async (client, message, args, prefix) => {
    // Code
    const Name = args.join(" ");
    if(!Name){
      return message.reply({
embeds: [
                  new EmbedBuilder()
                  .setDescription("Provide me a name!")
                  .setColor(client.color)
    ]
    
                           })
    }
        const data = await db.findOne({ UserId: message.author.id, PlaylistName: Name });
        if (!data) {
            return message.reply({ embeds: [new EmbedBuilder().setColor(client.color).setDescription(`You don't have any Playlist named **${Name}**.`)] });
        }
        let tracks = data.songs.map((x, i) => `${+i} - ${x.title.substring(0, 45)}... ${x.duration ? `${convertTime(Number(x.duration))}` : ""}`);
        const pages = lodash.chunk(tracks, 10).map((x) => x.join("\n"));
        let page = 0;
        var embed = new EmbedBuilder()
            .setAuthor({
              name: `${message.author.username}s Playlists`, iconURL: `${message.author.displayAvatarURL({dynamic: true})}`
            })
            .setColor(client.color)
      .addFields([
                    {
                      name: '**Playlist Name**',
                      value: `**${data.PlaylistName}**`
                    },
                    {
                      name: `**Playlist Size:**`,
                      value: `**${data.songs.length}**`,
                      
                    },
                    {
                      name: `**Playlist Songs:**`,
                      value: `\`\`\`nim\n${pages[page] ? pages[page] : "No Songs In Playlist"}\`\`\``,
                    }
                  ])
        const em = new EmbedBuilder()
        const em1 = new EmbedBuilder()
        if (pages.length <= 1) {
            return await message.reply({ embeds: [embed] })
        } else {

            let previousbut = new ButtonBuilder().setCustomId("playlist_cmd_ueuwbdl_uwu-previous").setEmoji("<:arl:1015559494018793522>").setStyle("SECONDARY");

            let nextbut = new ButtonBuilder().setCustomId("playlist_cmd_uwu-next").setEmoji("<:arr:1015559709371138048>").setStyle("SECONDARY");

            let stopbut = new ButtonBuilder().setCustomId("playlist_cmd_uwu-stop").setEmoji("⏹️").setStyle("DANGER");

            const row = new ActionRowBuilder().addComponents(previousbut, stopbut, nextbut);

            const m = await message.reply({ embeds: [embed], components: [row] });

            const collector = m.createMessageComponentCollector({
                filter: (b) => b.user.id === message.author.id ? true : false && b.deferUpdate().catch(() => { }),
                time: 60000 * 5,
                idle: 60000 * 5 / 2
            });

            collector.on("end", async () => {
                if (!m) return;
                await m.edit({ components: [new ActionRowBuilder().addComponents(previousbut.setDisabled(true), stopbut.setDisabled(true), nextbut.setDisabled(true))] });
            });

            collector.on("collect", async (b) => {
                if (!b.deferred) await b.deferUpdate().catch(() => { });
                if (b.customId === "playlist_cmd_ueuwbdl_uwu-previous") {
                    page = page - 1 < 0 ? pages.length - 1 : --page;
                    if (!m) return;
            embed = new EmbedBuilder()
            .setAuthor({
              name: `${message.author.username}s Playlists`, iconURL: `${message.author.displayAvatarURL({dynamic: true})}`
            })
            .setColor(client.color)
         /*   .addField(`**Playlist Name:**`, `**${data.PlaylistName}**`)
            .addField(`**Playlist Size:**`, `**${data.songs.length}**`)
            .addField(`**Playlist Songs:**`, `\`\`\`nim\n${pages[page] ? pages[page] : "No Songs In Playlist"}\`\`\``)*/
                  .addFields([
                    {
                      name: '**Playlist Name**',
                      value: `**${data.PlaylistName}**`
                    },
                    {
                      name: `**Playlist Size:**`,
                      value: `**${data.songs.length}**`,
                      
                    },
                    {
                      name: `**Playlist Songs:**`,
                      value: `\`\`\`nim\n${pages[page] ? pages[page] : "No Songs In Playlist"}\`\`\``,
                    }
                  ])
            return await m.edit({ embeds: [embed] });
                } else if (b.customId === "playlist_cmd_uwu-stop") {
                    return collector.stop();
                } else if (b.customId === "playlist_cmd_uwu-next")
                    page = page + 1 >= pages.length ? 0 : ++page;
                if (!m) return;
              embed = new EmbedBuilder()
            .setAuthor({
              name: `${message.author.username}s Playlists`, iconURL: `${message.author.displayAvatarURL({dynamic: true})}`
            })
            .setColor(client.color)
              .addFields([
                    {
                      name: '**Playlist Name**',
                      value: `**${data.PlaylistName}**`
                    },
                    {
                      name: `**Playlist Size:**`,
                      value: `**${data.songs.length}**`,
                      
                    },
                    {
                      name: `**Playlist Songs:**`,
                      value: `\`\`\`nim\n${pages[page] ? pages[page] : "No Songs In Playlist"}\`\`\``,
                    }
                  ])
              return await m.edit({ embeds: [embed] });
            });
        }
  },
};