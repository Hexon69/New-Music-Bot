const discord = require("discord.js");
const { convertTime } = require('../util/convert.js');
 const { ButtonBuilder, ActionRowBuilder } = require("discord.js")
const ms = require("ms")
module.exports.run = async (client,player,track) => {
  
let tr = track.info.title;
  let result = tr;
  const embed = new discord.EmbedBuilder()
    .setAuthor({name:`Now Playing`,iconURL:client.user.displayAvatarURL()})
.setColor(client.color) 
.setThumbnail(`https://i.ytimg.com/vi/${track.info.identifier}/maxresdefault.jpg` || null)
    .setDescription(`**[${result}](${track.info.uri})\nDuration - ${convertTime(track.info.length)}**`)

   const pause = new ButtonBuilder().setCustomId("pause").setEmoji("1089490877078048820").setStyle("Secondary");
  const rewind = new ButtonBuilder().setCustomId("rewind").setEmoji("1089500491521720350").setStyle("Secondary");

  const loop = new ButtonBuilder().setCustomId("loop").setEmoji("<:icons_loop:1089490607656943666>").setStyle("Secondary");
   
  const forward = new ButtonBuilder().setCustomId("forward").setEmoji("<:emoji_11:1089499912766509076>").setStyle("Secondary");

  const previous = new ButtonBuilder().setCustomId("previous").setEmoji("<:icons_backforward:1089491185946611802>").setStyle("Secondary");

  const skip = new ButtonBuilder().setCustomId("skip").setEmoji("<:icons_frontforward:1089491129512239234>").setStyle("Secondary");

 const shuffle = new ButtonBuilder().setCustomId("shuffle").setEmoji("<:icons_shuffle:1089490375376388227>").setStyle("Secondary");

 const stop = new ButtonBuilder().setCustomId("stop").setEmoji("<:icons_stop_button:1089490754138820730>").setStyle("Secondary");
 const queue = new ButtonBuilder().setCustomId("queue").setEmoji("<:icons_queue:1089490494494613587>").setStyle("Secondary");

  
 
   const row = new ActionRowBuilder().addComponents(previous, rewind,pause,forward,skip);
   const row1 = new ActionRowBuilder().addComponents(loop,shuffle,queue,stop);
   const channel =  client.channels.cache.get(player.textChannel)
return channel?.send({ embeds: [embed], components: [row, row1] }).then(x => player.message = x)

}