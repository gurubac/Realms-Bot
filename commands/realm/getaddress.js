const {
	SlashCommandBuilder,
	EmbedBuilder,
	AttachmentBuilder,
} = require("discord.js");
const { Authflow } = require("prismarine-auth");
const { RealmAPI } = require("prismarine-realms");
const { realmId } = require("../../config.json");
const config = require("../../config.json");
const isLoggedIn = require("../../cache.js");
const authflow = new Authflow(config.userIdentifier, config.cacheDir);
const api = RealmAPI.from(authflow, "java");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("getaddress")
		.setDescription("Gets the direction connect address for the realm."),

	async execute(interaction) {
		try {
			if (!isLoggedIn(config.cacheDir)) {
				return interaction.reply(
					"You are not logged in. Please run the `/login` command."
				);
			}
			const RealmAddress = await api.getRealmAddress(realmId);

			// Create an embed and set the owner's image as an attachment
			const embed = new EmbedBuilder()
				.setTitle("Realm Address")
				.addFields(
					{ name: "Host", value: RealmAddress.host.toString(), inline: true },
					{ name: "Port", value: RealmAddress.port.toString(), inline: true }
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
