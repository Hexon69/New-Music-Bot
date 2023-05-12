const { Message, PermissionFlagsBits, Client, EmbedBuilder } = require("discord.js");
const discord = require("discord.js")

module.exports = {
  name: "skipto",
  description: `Skip to a specific song.`,
  usage: "<song # in queue>",
  userPermissions: ["SendMessages"],
  botPermissions: ["SendMessages"],
  category: "Music",
  cooldown: 10,
aliases: ["jump"],

  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   * @param {String} prefix
   */
  run: async (client, message, args, prefix) => {
    let player = client.poru.players.get(message.guild.id)
    if(!player){
let thing = new EmbedBuilder()
            .setColor("Red")
            .setDescription("There is no music playing.");
            return message.channel.send({embeds: [thing]});
}
    if (!player.isPlaying) {
            let thing = new EmbedBuilder()
            .setColor("Red")
            .setDescription("There is no music playing.");
            return message.channel.send({embeds: [thing]});
    }
    // Code
const position = Number(args[0]);
		
		if (!position || position < 0 || position > player.queue.size) { 
			let thing = new EmbedBuilder()
                .setColor("Red")
				.setDescription(`Usage: ${client.config.PREFIX}skipto <song # in queue>`)
            return message.reply({embeds: [thing]});
		}

        player.queue.remove(0, position);
        player.stop();
		
		

		let thing = new EmbedBuilder()
			.setDescription(`Skipped to song **${position}**.`)
			.setColor(client.color)
			.setTimestamp()
			
		return message.reply({embeds: [thing]});
  },
};