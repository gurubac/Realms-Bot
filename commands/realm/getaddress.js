const { SlashCommandBuilder, EmbedBuilder, AttachmentBuilder } = require('discord.js');
const { Authflow } = require('prismarine-auth');
const { RealmAPI } = require('prismarine-realms');
const { realmId } = require('../../config.json');

const userIdentifier = 'any unique identifier';
const cacheDir = './logincache';
const authflow = new Authflow(userIdentifier, cacheDir);

const api = RealmAPI.from(authflow, 'java');

module.exports = {
    data: new SlashCommandBuilder()
      .setName('getaddress')
      .setDescription('Gets the direction connect address for the realm.'),
  
    async execute(interaction) {
      try {
        const RealmAddress = await api.getRealmAddress(realmId);
        console.log(RealmAddress)
  
        // Create an embed and set the owner's image as an attachment
        const embed = new EmbedBuilder()
          .setTitle('Realm Address')
          .addFields(
            { name: 'Host', value: RealmAddress.host.toString(), inline: true },
            { name: 'Port', value: RealmAddress.port.toString(), inline: true}
          )
  
        // Reply with the embed and image buffer as an attachment
        return interaction.reply({
          embeds: [embed],
        });
      } catch (error) {
        console.error(error);
        return interaction.reply('An error occurred while gathering realm info.');
      }
    },
  };