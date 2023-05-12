module.exports.run = (async (client, player) => {
  const {EmbedBuilder} = require("discord.js")
  //client.on("messageCreate", async (message) => {
 // if(player?.autoplay) return player.autoplay(client.user)
  //console.log(player.autoplay)
/*let autoplay = await client.db.get(`auto_${player.guild}`);
    if (autoplay === `true`) {
      
            const previoustrack = player.previousTrack.info
    if (!previoustrack){ 
   return console.log("true")
    }
        const search = `https://www.youtube.com/watch?v=${previoustrack.identifier}&list=RD${previoustrack.identifier}`;
       const response = await client.poru.resolve({query: search,source:"ytsearch",requester:message.author});

		player.queue.add(response.tracks[Math.floor(Math.random() * Math.floor(response.tracks.length))]);
if(!player.isPlaying || !player.isPaused) {
player.play();
}*/
  const channel = client.channels.cache.get(player.textChannel);
  const guildid = client.channels.cache.get(player.guildId);
  let autoplay = await client.db.get(`auto_${player.guildId}`);
  console.log(client.db.get(`auto_${player.guildId}`))
    if (autoplay === `true`) 
      return player.autoplay(client.user)
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
    
      return console.log("stopped")
            
    
})
     
   channel?.send({embeds: [
                  new EmbedBuilder()
                  .setDescription(`Thank you for using our service!\n\n**Loving the bot?**\nConsider [Inviting me](https://discord.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=418880806849) to your server :heart:`)
                  .setColor(client.color)
    .setImage("https://media.discordapp.net/attachments/1011309439510380578/1090866384071819314/20230329_100010.jpg")
    ]});
 
//player.destroy();


    });