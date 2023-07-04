const { SlashCommandBuilder, EmbedBuilder, AttachmentBuilder } = require('discord.js');
const { Authflow } = require('prismarine-auth');
const { RealmAPI } = require('prismarine-realms');
const { realmId } = require('../../config.json');
const config = require('../../config.json');
const isLoggedIn = require("../../cache.js");
const authflow = new Authflow(config.userIdentifier, config.cacheDir);
const api = RealmAPI.from(authflow, 'java');

module.exports = {
    data: new SlashCommandBuilder()
      .setName('online')
      .setDescription('Shows who is currently online on the realm.'),
  
    async execute(interaction) {
      try {
        if (!isLoggedIn(config.cacheDir)) {
          return interaction.reply('You are not logged in. Please run the `/login` command.');
        }
        const {players} = await api.getRealm(realmId);
  
        // Filter online players
        const onlinePlayers = players.filter((player) => player.online);
  
        // Create an embed
        const embed = new EmbedBuilder()
          .setTitle('Online Players')
          .setDescription(`Total Online: ${onlinePlayers.length}`);
  
        // Add player list field
        if (onlinePlayers.length > 0) {
          const playerList = onlinePlayers.map((player) => player.name).join('\n');
          embed.addFields({ name: 'Player List', value: playerList });
        } else {
          embed.addFields({ name: 'Player List', value: 'No players online.' });
        }
  
        return interaction.reply({ embeds: [embed] });
      } catch (error) {
        console.error(error);
        return interaction.reply('An error occurred while generating the player list.');
      }
    },
  };
  