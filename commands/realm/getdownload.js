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
            
            api.getRealmWorldDownload(`${config.realmId}`, "1").then((res) => {
				try {
					interaction.reply(`[Download](${res.downloadUrl})`);
				} catch (error) {
					console.error(error);
					interaction.reply("An error has occurred while trying to generate the download URL. Please refer to logs.");
				}
            });
			// api.getRealms().then((realms) => {
			// 	const embed = new EmbedBuilder().setTitle("Realms Information");

			// 	realms.forEach((realm, index) => {
			// 		embed.addFields(
			// 			{
			// 				name: `Realm: ${realm.name}`,
			// 				value: `Realm ID: ${realm.id}\nName: ${realm.name}\nOwner: ${realm.owner}\nMOTD: ${realm.motd}\nState: ${realm.state}\nMax Players: ${realm.maxPlayers}\nDays Left: ${realm.daysLeft}`,
			// 			}
			// 			// Add more fields or customize the format as needed
			// 		);
			// 	});

			// 	return interaction.reply({ embeds: [embed] });
			// });
		} catch (error) {
			console.error(error);
            return interaction.reply(
                "An error occurred while generating the realm download..."
			);
		}
	},
};
