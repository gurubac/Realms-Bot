const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { Authflow } = require('prismarine-auth');
const { RealmAPI } = require('prismarine-realms');
const fs = require('node:fs');
const userIdentifier = 'any unique identifier';
const cacheDir = './logincache';

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

  execute(interaction) {
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

      // Create a Promise to resolve with the intermediate token
      const getTokenPromise = new Promise((resolve) => {
        const authflow = new Authflow(userIdentifier, cacheDir, undefined, (res) => {
          // console.log('Intermediate response:', res);
          resolve(res);
        });
        authflow.getMsaToken();
      });

      // Wait for the promise to resolve and obtain the intermediate token
      getTokenPromise.then((userCodeResponse) => {
        const embed = new EmbedBuilder()
          .setTitle('Login Information')
          .addFields(
            { name: 'Instructions', value: userCodeResponse.message, inline: true },
            { name: 'Login Code', value: userCodeResponse.userCode, inline: true },
          )
        return interaction.reply({
          embeds: [embed],
        });
      });

    } catch (error) {
      console.error(error);
      return interaction.reply('An error occurred while logging in.');
    }
  },
};
