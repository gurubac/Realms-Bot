const {
	SlashCommandBuilder,
	EmbedBuilder,
} = require("discord.js");
const { Authflow } = require("prismarine-auth");
const { RealmAPI } = require("prismarine-realms");
const config = require("../../config.json");
const isLoggedIn = require("../../cache.js");
const authflow = new Authflow(config.userIdentifier, config.cacheDir);
const api = RealmAPI.from(authflow, "java");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("getdownload")
		.setDescription("Gets Download Link of Realm"),

	async execute(interaction) {
		try {
			if (!isLoggedIn(config.cacheDir)) {
				return interaction.reply(
					"You are not logged in. Please run the `/login` command."
				);
			}
            
			//needs to be changed to support multiple realms
			const { downloadUrl } = await api.getRealmWorldDownload(`${config.realmId}`, "1");

			const embed = new EmbedBuilder().setTitle("Download URL").setURL(`${downloadUrl}`).setFooter({text: "This URL is from the official Microsoft website."});
			return interaction.reply({ embeds: [embed] });			
		} catch (error) {
			console.error(error);
            interaction.reply("An error has occurred while trying to generate the download URL. Please refer to logs.");

		}
	},
};
