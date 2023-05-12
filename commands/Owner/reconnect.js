const { Message, PermissionFlagsBits, Client, EmbedBuilder } = require("discord.js");
const discord = require("discord.js")

module.exports = {
  name: "reconnect",
  description: `Reconnects to the voice channel`,
  userPermissions: PermissionFlagsBits.SendMessages,
  botPermissions: PermissionFlagsBits.SendMessages,
  category: "Owner",
  cooldown: 10,
aliases: ["rc"],
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
    let int = 0;
const guildids = client.guilds.cache.map((r) => r.id);
    
        guildids.forEach(async guildID  => {
    
    const guild = client.guilds.cache.get(guildID)
    if(!guild) return;
  let data = await client.db.get(`247_${guild.id}`);
    if(!data)
    {
      client.db.set(`247_${guild.id}`, `false`);
    }
    else if(data === `false`)
    {
      client.db.delete(`chid_${guild.id}`)
      client.db.delete(`vcid_${guild.id}`)
    }
    else if (data === `true`)
    {
      int+=1;
      const vc = guild.channels.cache.get(await client.db.get(`vcid_${guild.id}`))
            if(!vc)
            {
              client.db.set(`247_${guild.id}`, `false`)
              client.db.delete(`chid_${guild.id}`)
              client.db.delete(`vcid_${guild.id}`)
               return;
            }
            

            const tcid = await client.db.get(`chid_${guild.id}`);
      var player = await client.poru.createConnection({
      guildId: guild.id,
      voiceChannel: await client.db.get(`vcid_${guild.id}`),
                textChannel: await client.db.get(`chid_${guild.id}`),
      selfDeaf: true,
      selfMute: false,
    })

            
            player.connect();
            
            if(vc.type === "stage") {
                try { await client.guilds.cache.get(guildID).me.voice.setSuppressed(false) } catch {/* */}
              }
    }
})

message.channel.send({embeds: [new EmbedBuilder().setColor(client.color).setDescription(`Successfully Reconnected to voice channels`)]});
  },
};