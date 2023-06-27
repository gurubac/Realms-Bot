const { SlashCommandBuilder } = require('discord.js');
const { Authflow } = require('prismarine-auth');
const { RealmAPI } = require('prismarine-realms');
const fs = require('node:fs');
const userIdentifier = 'any unique identifier';
const cacheDir = './logincache';
const authflow = new Authflow(userIdentifier, cacheDir, undefined, (res) => {
  console.log('Intermediate token:', res);
});

function isJsonNotEmpty(content) {
    try {
      const parsedJson = JSON.parse(content);
      return Array.isArray(parsedJson) ? parsedJson.length > 0 : Object.keys(parsedJson).length > 0;
    } catch (error) {
      return false;
    }
  }

module.exports = {
  data: new SlashCommandBuilder()
    .setName('login')
    .setDescription('Login mc.'),

  async execute(interaction) {
    try {
        const cacheExists = fs.existsSync(cacheDir);
        if (cacheExists) {
            const cacheFiles = fs.readdirSync(cacheDir);
            let isValidCache = false;

            for (const file of cacheFiles) {
            const filePath = `${cacheDir}/${file}`;
            const fileContent = fs.readFileSync(filePath, 'utf-8');

            if (isJsonNotEmpty(fileContent)) {
                isValidCache = true;
                break;
            }
            }

            if (isValidCache) {
            return interaction.reply('You are already logged in.');
            }
        }


      // Prompt the user to login through the bot
      await authflow.getMsaToken();

      // Send the login message and code to the user
      await interaction.reply("hello!");
    } catch (error) {
      console.error(error);
      return interaction.reply('An error occurred while logging in.');
    }
  },
};