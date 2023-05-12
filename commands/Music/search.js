const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, PermissionFlagsBits, Permissions, ButtonStyle } = require("discord.js");
const { convertTime } = require("../../util/convert.js");

const discord = require("discord.js")

module.exports = {
  name: "search",
  description: `Search for a song on YouTube`,
  userPermissions: ["SendMessages"],
  botPermissions: ["SendMessages"],
  category: "Music",
  cooldown: 10,
aliases: ["search"],
  inVc: true,
  sameVc: true,
  player: false,
  
  

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
    if(!player){
player = await client.poru.createConnection({
      guildId: message.guild.id,
      voiceChannel: message.member.voice.channel.id,
      textChannel: message.channel.id,
      selfDeaf: true,
      selfMute: false,
    })
}
    
    const s = await client.poru.resolve(args.join(' '));
    const msg = await message.channel.send({embeds: [new EmbedBuilder().setColor(client.color).setDescription(`?Searching ${args.join(" ")} song please wait`)]})
    const but = new ButtonBuilder().setCustomId("s_one").setLabel("1").setStyle(ButtonStyle.Secondary);
    const but2 = new ButtonBuilder().setCustomId("s_two").setLabel("2").setStyle(ButtonStyle.Secondary);
    const but3 = new ButtonBuilder().setCustomId("s_three").setLabel("3").setStyle(ButtonStyle.Secondary);
    const but4 = new ButtonBuilder().setCustomId("s_four").setLabel("4").setStyle(ButtonStyle.Secondary);
    const but5 = new ButtonBuilder().setCustomId("s_five").setLabel("5").setStyle(ButtonStyle.Secondary);
    const row = new ActionRowBuilder().addComponents(but, but2, but3, but4, but5);

    
    switch (s.loadType) {
        case "TRACK_LOADED":
            for (let x of s.tracks) {
        x.info.requester = message.author;

            }player.queue.add(s.tracks[0]);
        s.info.requester = message.author.tag;
            const embed = new EmbedBuilder()
             .setDescription(`**Added to queue** - [${s.info.title}](${s.info.uri}) \`${convertTime(s.info.length, true)}\` • ${s.info.requester}`)
             .setColor(client.embedColor)

            msg.edit({ embeds: [embed] });
            if (!player.isPlaying) player.play()
            break;
         case "SEARCH_RESULT":
             let index = 1;
             const tracks = s.tracks.slice(0, 5);
             const results = s.tracks.slice(0, 5).map(x => `• ${index++} | [${x.info.title}](${x.info.uri}) \`${convertTime(x.info.length)}\``)
                    .join("\n");
    
                    const searched = new EmbedBuilder()
                        .setTitle("Select the track that you want.")
                        .setColor(client.color)
                        .setDescription(results);

                    await msg.edit({embeds: [searched], components: [row] });
                    const search = new EmbedBuilder()
                    .setColor(client.color);
const collector = msg.createMessageComponentCollector({
                filter: (f) => f.user.id === message.author.id ? true : false && f.deferUpdate(),
                max: 1,
                time: 60000,
                idle: 60000/2
            });
            collector.on("end", async (collected) => {
                if(msg) await msg.edit({ components: [new ActionRowBuilder().addComponents(but.setDisabled(true), but2.setDisabled(true), but3.setDisabled(true), but4.setDisabled(true), but5.setDisabled(true))] })
                                    
            });
            collector.on("collect", async (b) => {
              
                if(!b.deferred) await  b.deferUpdate();
                if(!player && !collector.ended) return collector.stop();
                if(player.state !== "CONNECTED") player.connect();

                if(b.customId === "s_one") {
                
                    player.queue.add(s.tracks[0]);
             
                        if(player && !player.isPlaying && !player.isPaused) await player.play();
 
                        if(msg) await msg.edit({embeds: [search.setDescription(`**Added to queue** - [${s.tracks[0].info.title}](${s.tracks[0].info.uri}) \`${convertTime(s.tracks[0].info.length, true)}\` • ${message.author.tag}`)]})
                } else {
            
if(b.customId === "s_two") {
                    player.queue.add(s.tracks[1]);
             
                        if(player && !player.isPlaying && !player.isPaused) await player.play();
 
                        if(msg) await msg.edit({embeds: [search.setDescription(`**Added to queue** - [${s.tracks[1].info.title}](${s.tracks[1].info.uri}) \`${convertTime(s.tracks[1].info.length, true)}\` • ${message.author.tag}`)]})
                }
                } 
            if(b.customId === "s_three") {
                    player.queue.add(s.tracks[2]);
             
                        if(player && !player.isPlaying && !player.isPaused) await player.play();
 
                        if(msg) await msg.edit({embeds: [search.setDescription(`**Added to queue** - [${s.tracks[2].info.title}](${s.tracks[2].info.uri}) \`${convertTime(s.tracks[2].info.length, true)}\` • ${message.author.tag}`)]})
            } else {
              if(b.customId === "s_four") {
                    player.queue.add(s.tracks[3]);
             
                        if(player && !player.isPlaying && !player.isPaused) await player.play();
 
                        if(msg) await msg.edit({embeds: [search.setDescription(`**Added to queue** - [${s.tracks[3].info.title}](${s.tracks[3].info.uri}) \`${convertTime(s.tracks[3].info.length, true)}\` • ${message.author.tag}`)]})
              }
            } 
              if(b.customId === "s_five") {
                    player.queue.add(s.tracks[4]);
             
                        if(player && !player.isPlaying && !player.isPaused) await player.play();
 
                        if(msg) await msg.edit({embeds: [search.setDescription(`**Added to queue** - [${s.tracks[4].info.title}](${s.tracks[4].info.uri}) \`${convertTime(s.tracks[4].info.length, true)}\` • ${message.author.tag}`)]})
              }
            })
    }
  },
};