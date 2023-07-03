const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { Authflow } = require("prismarine-auth");
const { RealmAPI } = require("prismarine-realms");
const config = require("../../config.json");
const isLoggedIn = require("../../cache.js");
const authflow = new Authflow(config.userIdentifier, config.cacheDir);
const api = RealmAPI.from(authflow, "java");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("getbackups")
		.setDescription("Gets all backups of realm"),

	async execute(interaction) {
		try {
			if (!isLoggedIn(config.cacheDir)) {
				return interaction.reply(
					"You are not logged in. Please run the `/login` command."
				);
			}

			await api.getRealmBackups(`${config.realmId}`).then(async (backups) => {
				const embed = new EmbedBuilder()
					.setTitle("Realm Backups")
					.setDescription("List of all backups");

				for (const backup of backups) {
					const lastModifiedDate = new Date(
						backup.lastModifiedDate
					).toLocaleString();

					embed.addFields(
						{ name: "Backup Name", value: backup.metadata.name, inline: true },
						{
							name: "Last Modified Date",
							value: `${lastModifiedDate}`,
							inline: true,
						},
            { name: "\u200B", value: "\u200B"}
					);
				}
				return interaction.reply({ embeds: [embed] });
			});
		} catch (error) {
			console.error(error);
			interaction.reply(
				"An error has occurred while trying to generate the download URL. Please refer to logs."
			);
		}
	},
};
