const { Message, PermissionFlagsBits, Client, EmbedBuilder } = require("discord.js");
const discord = require("discord.js")

module.exports = {
  name: "8d",
  description: `Applies a 8D Filter`,
  userPermissions: PermissionFlagsBits.SendMessages,
  botPermissions: PermissionFlagsBits.SendMessages,
  category: "Filters",
  cooldown: 10,
player: true,
  inVc: true,
  sameVc: true,
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
player.filters.clearFilters();
/*player.node.send({
      op: "filters",
      guildId: message.guild.id,
      /*equalizer: player.Band.map((gain, index) => {
        var Obj = {
          "bands": 0,
          "gain": 0,
        };
        Obj.bands = Number(index);
        Obj.gain = Number(gain)
        return Obj;
      }),*/
     /* rotation: {
        "rotationHz": 0.1,
      },
      timescale: {
            "speed": 1.0,
            "pitch": 1.0,
            "rate": 1.0
          },
    });*/
player.filters.setRotation({

        "rotationHz": 0.1,
})
  player.filters.setTimescale({
            "speed": 1.0,
            "pitch": 1.0,
            "rate": 1.0
          
})
 const embed = new EmbedBuilder()
.setColor(client.color)
 .setDescription(`**8d** mode is now enabled.`)
    console.log(player.filters)
message.channel.send({embeds: [embed]})
  },
};