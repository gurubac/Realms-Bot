const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { Authflow } = require("prismarine-auth");
const { RealmAPI } = require("prismarine-realms");
const fs = require("node:fs");
const { cacheDir, userIdentifier } = require("../../../config.json");
const isLoggedIn = require("../../../cache.js");
const Cache = require("../../database/Cache.js");

module.exports = {
	data: new SlashCommandBuilder().setName("login").setDescription("Login mc."),

	execute(interaction) {
		try {
			if (isLoggedIn(cacheDir)) {
				return interaction.reply("You are already logged in.");
			}
			let cacheFactory = ({ username, cacheName }) =>
				new Cache(username, cacheName);
			// Create a Promise to resolve with the intermediate token
			const getTokenPromise = new Promise(async (resolve) => {
				const authflow = new Authflow(
					`${interaction.user.id}`,
					cacheFactory,
					undefined,
					(res) => {
						// console.log(res);
						resolve(res);
					}
				);
				await authflow.getMsaToken();
				interaction.editReply({
					embeds: [],
					content: "Successfully logged in!",
				});
			});

			// Wait for the promise to resolve and obtain the intermediate token
			getTokenPromise.then((userCodeResponse) => {
				const embed = new EmbedBuilder()
					.setTitle("Login Information")
					.addFields(
						{
							name: "Login Code",
							value: userCodeResponse.userCode,
							inline: false,
						},
						{
							name: "Instructions",
							value: userCodeResponse.message,
							inline: false,
						}
					);
				return interaction.reply({
					embeds: [embed],
				});
			});
		} catch (error) {
			console.error(error);
			return interaction.reply("An error occurred while logging in.");
		}
	},
};
