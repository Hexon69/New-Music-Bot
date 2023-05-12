const { Message, PermissionFlagsBits, Client, EmbedBuilder } = require("discord.js");
const discord = require("discord.js")
const db = require("../../schema/playlist");

module.exports = {
  name: "create",
  description: `Creates the user's playlist.`,
  userPermissions: PermissionFlagsBits.SendMessages,
  botPermissions: PermissionFlagsBits.SendMessages,
  category: "Playlist",
  cooldown: 10,
aliases: ["pl-create"],
usage: "<playlist name>",
inVc: true,
  sameVc: false,
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
    let num = await db.find({ UserId: message.author.id});
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
        if (Name.length > 10) {
            return message.reply({ embeds: [new EmbedBuilder().setColor(client.color).setDescription(`Your Playlist name should be of less than **10** character.`)] });
        };
        let data = await db.find({
            UserId: message.author.id,
            PlaylistName: Name,
        });

        if(num.length === 5){
          return message.reply({embeds: [new EmbedBuilder().setColor(client.color).setDescription("You Can Create Maximum **5** Playlists.")]})
           
        }
        
        

        if (data.length > 0) {
            return message.reply({ embeds: [new EmbedBuilder().setColor(client.color).setDescription(`Playlist ${Name} Already Exists.`)] })
        };
        let userData = db.find({
            UserId: message.author.id
        });

        const newData = new db({
            UserName: message.author.tag,
            UserId: message.author.id,
            PlaylistName: Name,
            CreatedOn: Math.round(Date.now() / 1000)
        });
        await newData.save();
        const embed = new EmbedBuilder()
            .setDescription(`Playlist Created **${Name}**`)
            .setColor(client.color)
        return message.channel.send({ embeds: [embed] })
  },
};