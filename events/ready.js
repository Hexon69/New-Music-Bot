module.exports.run = async (client) => {
 
  client.poru.init(client)
  client.logger.log(`${client.user.username} is ready with ${client.guilds.cache.size} server`, "ready");

  

client.db.on("ready", () => {     client.logger.log("DB READY");
});
    client.db.on("err", err => {
        client.logger.log(err, "warn")
    })

await client.db.connect();

  setTimeout(function() {
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
    if (data === `true`)
    {
      const vc = guild.channels.cache.get(await client.db.get(`vcid_${guild.id}`))
            if(!vc)
            {
              client.db.set(`247_${guild.id}`, `false`)
              client.db.delete(`chid_${guild.id}`)
              client.db.delete(`vcid_${guild.id}`)
               return;
            }
            //const vcperm = vc.permissionsFor(client.user).has(Discord.Permissions.FLAGS.CONNECT)
            //if(!vcperm) return;

            const tcid = await client.db.get(`chid_${guild.id}`);
      /*var player = client.manager.create({
                guild: guild.id,
                voiceChannel: await client.db.get(`vcid_${guild.id}`),
                textChannel: await client.db.get(`chid_${guild.id}`),
                volume: 50,
                selfDeafen: true,
            });*/
var player = await client.poru.createConnection({
      guildId: guild.id,
      voiceChannel: await client.db.get(`vcid_${guild.id}`),
                textChannel: await client.db.get(`chid_${guild.id}`),
      selfDeaf: true,
      selfMute: false,
    })
            client.logger.log(`Successfully Connected to ${data.length} vc`, `log`)
            
            if(vc.type === "stage") {
                try { await client.guilds.cache.get(guildID).me.voice.setSuppressed(false) } catch {/* */}
              }
    }
})
  }, 5000)
}