const { Message, PermissionFlagsBits, Client, EmbedBuilder } = require("discord.js");
const { TrackUtils, Player } = require("poru");
const discord = require("discord.js")
const playlists = require("../../schema/playlist");
module.exports = {
  name: "load",
  description: `Play the saved playlist.`,
  userPermissions: PermissionFlagsBits.SendMessages,
  botPermissions: PermissionFlagsBits.SendMessages,
  category: "Playlist",
  cooldown: 10,
aliases: ["pl-load"],
usage: "<playlist name>",
  inVc: true,
  sameVc: true,
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
    try {

            const playlistName = args.join(' ').replace(/_/g, ' ');
if(!Name){
      return message.reply({
embeds: [
                  new EmbedBuilder()
                  .setDescription("Provide me a name!")
                  .setColor(client.color)
    ]
    
                           })
}

            playlists.findOne({
              PlaylistName: playlistName,
                UserId: message.author.id,
            }, async (err, p) => {
              
                if (!p) {
                    return message.channel.send({
                      embeds: [
                  new EmbedBuilder()
                  .setDescription("I was unable to find that playlist in your profile")
                  .setColor(client.color)
    ]
                    });
                }

                let player = client.poru.players.get(message.guild.id)
        if(!player){
         player = await client.poru.createConnection({
            guildId: message.guild.id,
            voiceChannel: message.member.voice.channel.id,
            textChannel: message.channel.id,
            selfDeaf: true,
          })
        }
   


              const tracks =  p.songs;
              if(p.songs.length < 1){
               return message.reply({
                  embeds: [
                  new EmbedBuilder()
                  .setDescription("No songs in playlist to play!")
                  .setColor(client.color)
    ]
                })
              }
         const m = await message.reply({ embeds: [new EmbedBuilder().setColor(client.color).setDescription(`Started loading **${p.songs.length}** Tracks from Playlist **${playlistName}**`)]})
             
                for (let i = 0; i <= p.songs.length; i++) {

                    if (tracks[i]) {
const search = await client.poru.resolve(args.join(' '));
                        //let search = await client.poru.fetch(tracks[i].title)
                      //const resolve = await client.poru.resolve({query: args.join(" "),source:"ytsearch",requester:message.author});
                        if (!search || !search.tracks.length) continue;
                        const track = search.tracks.shift()

                        track.info.requester = message.author;
     
                        player.queue.add(track)
                    }
                    if(!player.isPlaying) player.play();
               

                
                }
await m.edit({ embeds: [new EmbedBuilder().setColor(client.color).setDescription(`Loaded **${p.songs.length}** Tracks from Playlist **${playlistName}**`)]})
            });

        } catch (e) {
      console.log(e)
            m.edit({ embeds: [new EmbedBuilder().setColor(client.color).setDescription(`Can't load tracks from Playlist **${playlistName}**`)]})
           console.log(e)
    }
  },
};