const {
	SlashCommandBuilder,
	EmbedBuilder,
	AttachmentBuilder,
} = require("discord.js");
const { Authflow } = require("prismarine-auth");
const { RealmAPI } = require("prismarine-realms");
const config = require("../../config.json");
const isLoggedIn = require("../../cache.js");
const authflow = new Authflow(config.userIdentifier, config.cacheDir);
const api = RealmAPI.from(authflow, "java");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("realms")
		.setDescription("Shows all realms."),

	async execute(interaction) {
		try {
			if (!isLoggedIn(config.cacheDir)) {
				return interaction.reply(
					"You are not logged in. Please run the `/login` command."
				);
			}

			api.getRealms().then((realms) => {
				const embed = new EmbedBuilder().setTitle("Realms Information");

				realms.forEach(({name, id, owner, motd, state, maxPlayers, daysLeft}, index) => {
					embed.addFields(
						{
							name: `Realm: ${name}`,
							value: `ID: ${id}\nOwner: ${owner}\nMOTD: ${motd}\nState: ${state}\nMax Players: ${maxPlayers}\nDays Left: ${daysLeft}`,
						}
						// Add more fields or customize the format as needed
					);
				});

				return interaction.reply({ embeds: [embed] });
			});
		} catch (error) {
			console.error(error);
			return interaction.reply(
				"An error occurred while generating the player list."
			);
		}
	},
};
