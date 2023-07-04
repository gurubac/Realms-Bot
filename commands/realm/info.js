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
    .setName('info')
    .setDescription('Shows information about the realm.'),

  async execute(interaction) {
    try {
      const { name, motd, state, owner, id, daysLeft, worldType, gracePeriod, players, maxPlayers } = await api.getRealm(realmId);

      // Create an embed and set the owner's image as an attachment
      const embed = new EmbedBuilder()
        .setTitle('Realm Information')
        .addFields(
          { name: 'Name', value: name, inline: true },
          { name: 'Realm ID', value: `${id}`, inline: true },
          { name: 'Motd', value: motd },
          { name: 'State', value: state },
          { name: 'Owner', value: owner },
          { name: 'Days of subscription left', value: `${daysLeft}` },
          { name: 'World Type', value: worldType },
          { name: 'Grace Period', value: `${gracePeriod}` },
          { name: 'Players Online', value: players.filter((player) => player.online).length.toString() },
          { name: 'Max Players', value: `${maxPlayers}` }
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