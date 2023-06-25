const { SlashCommandBuilder, EmbedBuilder, AttachmentBuilder } = require('discord.js');
const { Authflow } = require('prismarine-auth');
const { RealmAPI } = require('prismarine-realms');
const { realmId } = require('../../config.json');

const userIdentifier = 'any unique identifier';
const cacheDir = './';
const authflow = new Authflow(userIdentifier, cacheDir);

const api = RealmAPI.from(authflow, 'java');

module.exports = {
    data: new SlashCommandBuilder()
      .setName('info')
      .setDescription('Shows information about the realm.'),
  
    async execute(interaction) {
      try {
        const realm = await api.getRealm(realmId);
        console.log(realm);
  
        // Create an embed and set the owner's image as an attachment
        const embed = new EmbedBuilder()
          .setTitle('Realm Information')
          .addFields(
            { name: 'Name', value: realm.name.toString(), inline: true },
            { name: 'Motd', value: realm.motd.toString(), inline: true },
            { name: 'Owner', value: realm.owner.toString() },
            { name: 'Realm ID', value: realm.id.toString() },
            { name: 'Days of subscription left', value: realm.daysLeft.toString() },
            { name: 'World Type', value: realm.worldType.toString() },
            { name: 'Grace Period', value: realm.gracePeriod.toString() },
            { name: 'Players Online', value: realm.players.filter((player) => player.online).length.toString() },
            { name: 'Max Players', value: realm.maxPlayers.toString() }
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