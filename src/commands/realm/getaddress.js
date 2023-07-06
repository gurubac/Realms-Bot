const {
	SlashCommandBuilder,
	EmbedBuilder,
} = require("discord.js");
const { Authflow } = require("prismarine-auth");
const { RealmAPI } = require("prismarine-realms");
const { realmId, userIdentifier, cacheDir } = require("../../../config.json");
const isLoggedIn = require("../../../cache.js");
const authflow = new Authflow(userIdentifier, cacheDir);
const api = RealmAPI.from(authflow, "java");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("getaddress")
		.setDescription("Gets the direction connect address for the realm."),

	async execute(interaction) {
		try {
			if (!isLoggedIn(cacheDir)) {
				return interaction.reply(
					"You are not logged in. Please run the `/login` command."
				);
			}
			const { host, port } = await api.getRealmAddress(realmId);


			// Create an embed and set the owner's image as an attachment
			const embed = new EmbedBuilder()
				.setTitle("Realm Address")
				.addFields(
					{ name: "Host", value: host, inline: true },
					{ name: "Port", value: `${port}`, inline: true }
				);

			// Reply with the embed and image buffer as an attachment
			return interaction.reply({
				embeds: [embed],
			});
		} catch (error) {
			console.error(error);
			return interaction.reply("An error occurred while gathering realm info.");
		}
	},
};
