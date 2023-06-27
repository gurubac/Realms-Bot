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
      .setName('inviteplayer')
      .setDescription('Invites a player to your realm.')
      .addStringOption(option =>
        option.setName('username')
            .setDescription('The username of the player you want to invite.')
            .setRequired(true)),
  
    async execute(interaction) {
      try {
        const username = interaction.options.getString('username');
        const response = await fetch (`https://api.mojang.com/users/profiles/minecraft/${username}`)
        const uuid = await response.json().id
        await api.invitePlayer(realmId, uuid, username);
  
        // Create an embed and set the owner's image as an attachment
        const embed = new EmbedBuilder()
            .setTitle("Invite Sent")
            .setDescription(`Invite sent to ${username}`)
            .setColor(0x00ff00)
        
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