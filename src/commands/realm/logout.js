const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { Authflow } = require("prismarine-auth");
const { RealmAPI } = require("prismarine-realms");
const fs = require("node:fs");
const { userIdentifier, cacheDir } = require("../../../config.json");
const isLoggedIn = require("../../../cache.js");
const authflow = new Authflow(userIdentifier, cacheDir);

function resetTokenCaches(cache) {
	if (!cache) throw new Error("You must provide a cache directory to reset.");
	try {
		if (fs.existsSync(cache)) {
			fs.rmSync(cache, { recursive: true });
			return true;
		}
	} catch (e) {
		console.log("Failed to clear cache dir", e);
		return false;
	}
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName("logout")
		.setDescription("logout mc."),

	execute(interaction) {
		try {
			if (!isLoggedIn(cacheDir)) {
				return interaction.reply("You are already logged out.");
			}

			if (resetTokenCaches(cacheDir)) {
				return interaction.reply("Logout Successful.");
			} else {
				return interaction.reply("Failed to clear cache.");
			}
		} catch (error) {
			console.error(error);
			return interaction.reply("An unknown error occurred while logging out.");
		}
	},
};
