const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { Authflow } = require("prismarine-auth");
const { RealmAPI } = require("prismarine-realms");
const fs = require("node:fs");
const config = require("../../config.json");
const isLoggedIn = require("../../cache.js");
const authflow = new Authflow(config.userIdentifier, config.cacheDir);

function resetTokenCaches (cache) {
  if (!cache) throw new Error('You must provide a cache directory to reset.')
  try {
    if (fs.existsSync(cache)) {
      fs.rmSync(cache, { recursive: true })
      return true
    }
  } catch (e) {
    console.log('Failed to clear cache dir', e)
    return false
  }
}

module.exports = {
	data: new SlashCommandBuilder().setName("logout").setDescription("logout mc."),

	execute(interaction) {
		try {
			if (!isLoggedIn(config.cacheDir)) {
				return interaction.reply("You are already logged out.");
			}

      resetTokenCaches(config.cacheDir);

			return interaction.reply("Logout Successful.");

		} catch (error) {
			console.error(error);
			return interaction.reply("An error occurred while logging out.");
		}
	},
};
