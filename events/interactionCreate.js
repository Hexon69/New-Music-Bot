const { EmbedBuilder, ButtonBuilder, ActionRowBuilder } = require('discord.js');
const { convertTime } = require('../util/convert');
const music = new EmbedBuilder();
module.exports.run = async (client, interaction, args) => {
  music.setColor(client.color)
  const player = client.poru.get(interaction.guild.id);
  if(interaction.isButton()){
   if (interaction.customId === 'pause') {
          if (!player) {
        return interaction.message.delete();
      }/* end of not player */
      if (!player.message || interaction.message.id != player.message?.id) {
        return interaction.message.delete();
      }
      if (interaction.guild.members.me.voice.channel && interaction.guild.members.me.voice.channelId === interaction.member.voice.channelId) {

       // const pause = new ButtonBuilder().setCustomId("pause").setEmoji(!player.isPaused ? "1021424523146444821" : "1023159510581379082").setStyle(!player.isPaused ? "Success" : "Secondary");
 const pause = new ButtonBuilder().setCustomId("pause").setEmoji(!player.isPaused? "<:icons_play:1089487164204654622>" : "<:icons_play:1089490877078048820>").setStyle(!player.isPaused ? "Success" : "Secondary");
  const rewind = new ButtonBuilder().setCustomId("rewind").setEmoji("1089500491521720350").setStyle("Secondary");

  const loop = new ButtonBuilder().setCustomId("loop").setEmoji("<:icons_loop:1089490607656943666>").setStyle("Secondary");
   
  const forward = new ButtonBuilder().setCustomId("forward").setEmoji("<:emoji_11:1089499912766509076>").setStyle("Secondary");

  const previous = new ButtonBuilder().setCustomId("previous").setEmoji("<:icons_backforward:1089491185946611802>").setStyle("Secondary");

  const skip = new ButtonBuilder().setCustomId("skip").setEmoji("<:icons_frontforward:1089491129512239234>").setStyle("Secondary");

 const shuffle = new ButtonBuilder().setCustomId("shuffle").setEmoji("<:icons_shuffle:1089490375376388227>").setStyle("Secondary");

 const stop = new ButtonBuilder().setCustomId("stop").setEmoji("<:icons_stop_button:1089490754138820730>").setStyle("Secondary");
 const queue = new ButtonBuilder().setCustomId("queue").setEmoji("<:icons_queue:1089490494494613587>").setStyle("Secondary");




        const row = new ActionRowBuilder().addComponents(previous, rewind, pause, forward, skip);
        const row1 = new ActionRowBuilder().addComponents(loop, shuffle, queue, stop);

        try {
          player.message?.edit({ components: [row, row1] })
        } catch (e) {
        }
        player.pause(!player.isPaused);
        const Text = player.isPaused ? "Paused" : "Resumed";

        music.setDescription(`**${Text} the player**`)

        interaction.reply({ embeds: [music], ephemeral: true });
      }
      else {
        music.setDescription(`You Must Be in Voice Channel To Use This Button・${interaction.guild.members.me.voice.channel}`)
        interaction.reply({ embeds: [music], ephemeral: true })
      }
    } // "pause" work 
    if (interaction.customId === 'skip') {
      if (!player) {
        interaction.reply({ content: 'Error Contact Support Server', ephemeral: true })
      }/* end of not player */
      if (!player.message || interaction.message.id != player.message?.id) {
        interaction.reply({ content: 'Error Contact Support Server', ephemeral: true })
      }
      if (interaction.guild.members.me.voice.channel && interaction.guild.members.me.voice.channelId === interaction.member.voice.channelId) {
        await player.stop();
        music.setDescription(`Skipped to the next track.`)

        interaction.reply({ embeds: [music], ephemeral: true });
      }
      else {
        music.setDescription(`You Must Be in Voice Channel To Use This Button・${interaction.guild.members.me.voice.channel}`)
        interaction.reply({ embeds: [music], ephemeral: true })
      }
    }// "skip work above"  
    if (interaction.customId === 'stop') {
      if (!player) {
        interaction.reply({ content: 'The Player Already Stopped Or Stops in Some Seconds', ephemeral: true })
      }/* end of not player */
      if (!player.message || interaction.message.id != player.message?.id) {
        interaction.message.delete();
      }
      if (interaction.guild.members.me.voice.channel && interaction.guild.members.me.voice.channelId === interaction.member.voice.channelId) {
        if (!player.stoped) {
          player.stop(true)
          music.setDescription(`**Stopped The Player**`)
          interaction.reply({ embeds: [music], ephemeral: true });
        }
        else {
          music.setDescription(`**The Music Is Already Stopped**`)
          interaction.reply({ embeds: [music] });
        }
        {
          return interaction.message.delete();
        }
      }
      else {
        music.setDescription(`You Must Be in Voice Channel To Use This Button・${interaction.guild.members.me.voice.channel}`)
        interaction.reply({ embeds: [music], ephemeral: true })
      }
    }// "stop" work above    player.trackRepeat && !player.queueRepeat

    if (interaction.customId === 'loop') {
      if (!player) {
        return interaction.message.delete();
      }/* end of not player */
      if (!player.message || interaction.message.id != player.message?.id) {
        return interaction.message.delete();
      }
      if (interaction.guild.members.me.voice.channelId === interaction.member.voice.channelId) {
        if (player.loop === 'NONE') {
          player.setLoop('TRACK');
          music.setDescription(`**Now looping the current track...**`)
          interaction.reply({ embeds: [music], ephemeral: true });
        } else if (player.loop === 'TRACK') {
          player.setLoop('QUEUE');
          music.setDescription(`**Now looping the queue...**`)
          interaction.reply({ embeds: [music], ephemeral: true });
        } else if (player.loop === 'QUEUE') {
          player.setLoop('NONE');
          music.setDescription(`**Looping is now disabled**`)
          interaction.reply({ embeds: [music], ephemeral: true });
        }

      }
      else {
        music.setDescription(`You Must Be in Voice Channel To Use This Button・${interaction.guild.members.me.voice.channel}`)
        interaction.reply({ embeds: [music], ephemeral: true })
      }
    }

    if (interaction.customId === 'shuffle') {
      if (!player) {
        interaction.reply({ content: 'Error Contact Support Server', ephemeral: true })
      }/* end of not player */
      if (!player.message || interaction.message.id != player.message?.id) {
        return interaction.message.delete();
      }
      if (interaction.guild.members.me.voice.channel && interaction.guild.members.me.voice.channelId === interaction.member.voice.channelId) {
        if (!player.queue[3]) {
          music.setDescription(`**Need More Than 3 Songs in The Queue To Shuffle**`)
          return interaction.reply({ embeds: [music], ephemeral: true });
        }
        else {

          player.queue.shuffle();
          music.setDescription(`**Shuffled The Queue**`)
          interaction.reply({ embeds: [music], ephemeral: true });
        }
      }
      else {
        music.setDescription(`You Must Be in Voice Channel To Use This Button・${interaction.guild.members.me.voice.channel}`)
        interaction.reply({ embeds: [music], ephemeral: true })
      }
    }
    if (interaction.customId === 'rewind') {
      if (!player) {
        return interaction.message.delete();
      }/* end of not player */
      if (!player.message || interaction.message.id != player.message?.id) {
        return interaction.message.delete();
      }
      if (interaction.guild.members.me.voice.channelId === interaction.member.voice.channelId) {
        player.seekTo(player.position - 10000);
        music.setDescription(`Rewinded To ${convertTime(player.position - 10000)}`)
        interaction.reply({ embeds: [music], ephemeral: true })
      }
      else {
        music.setDescription(`You Must Be in Voice Channel To Use This Button・${interaction.guild.members.me.voice.channel}`)
        interaction.reply({ embeds: [music], ephemeral: true })
      }

    }
    if (interaction.customId === 'forward') {
      if (!player) {
        return interaction.message.delete();
      }/* end of not player */
      if (!player.message || interaction.message.id != player.message?.id) {
        return interaction.message.delete();
      }
      if (interaction.guild.members.me.voice.channelId === interaction.member.voice.channelId) {
        const forward = player.position + 10000;
        player.seekTo(player.position + 10000);
        music.setDescription(`Forwaded To ${convertTime(player.position + 10000)}`)
        interaction.reply({ embeds: [music], ephemeral: true })
      }
      else {
        music.setDescription(`You Must Be in Voice Channel To Use This Button・${interaction.guild.members.me.voice.channel}`)
        interaction.reply({ embeds: [music], ephemeral: true })
      }
    }

    if (interaction.customId === 'queue') {
      if (!player) {
        return interaction.message.delete();
      }/* end of not player */
      if (!player.message || interaction.message.id != player.message?.id) {
        return interaction.message.delete();
      }
      if (interaction.guild.members.me.voice.channelId === interaction.member.voice.channelId) {
        const queue =
          player.queue.length > 9 ? player.queue.slice(0, 9) : player.queue;
        const { convertTime } = require('../util/convert.js');
        const embed = new EmbedBuilder()
          .setColor(client.color)
          .setTitle('Now Playing')
          .setThumbnail(player.currentTrack.info.image)
          .setDescription(
            `**[${player.currentTrack.info.title}](${player.currentTrack.info.uri
            })\nDuration - ${convertTime(player.currentTrack.info.length)}**`,
          )
          .setFooter({ text: `Queue length: ${player.queue.length} tracks` });

        if (queue.length)
          embed.addFields([
            {
              name: 'Up Next',
              value: queue
                .map(
                  (track, index) =>
                    `**${index + 1}. [${track.info.title}](${track.info.uri}) Duration - ${convertTime(player.currentTrack.info.length)}**`,
                )
                .join('\n'),
            },
          ]);

        interaction.reply({ embeds: [embed], ephemeral: true });
      }
      else {
        music.setDescription(`You Must Be in Voice Channel To Use This Button・${interaction.guild.members.me.voice.channel}`)
        interaction.reply({ embeds: [music], ephemeral: true })
      }
    }
    if (interaction.customId === 'previous') {
      if (!player) {
        return interaction.message.delete();
      }
      if (!player.message || interaction.message.id != player.message?.id) {
        return interaction.message.delete();
      }
      if (interaction.guild.members.me.voice.channelId === interaction.member.voice.channelId) {
        const err = new EmbedBuilder();
        err.setColor("#FF0000");
        if (!player.previousTrack) {
          err.setDescription(`**There Is No Previous Song**`)
          return interaction.reply({ embeds: [err], ephemeral: true });
        } else {
          player.queue.unshift(player.previousTrack)
          player.stop()
          const kja = new EmbedBuilder()

            .setDescription(`**Moved to Previous song**`)
            .setColor(client.color)
          return interaction.reply({ embeds: [kja], ephemeral: true });
        }
      }
    }
  }
}