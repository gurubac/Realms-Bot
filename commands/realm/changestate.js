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
		.setName("changestate")
        .setDescription("Change state of your realm to `open` / `close`")
        .addStringOption((option) => 
            option.setName("id")
                .setDescription("ID of your Realm")
                .setRequired(true)
        ),

	async execute(interaction) {
		try {
			if (!isLoggedIn(config.cacheDir)) {
				return interaction.reply(
					"You are not logged in. Please run the `/login` command."
				);
			}
            


            const realmID = await interaction.options.getString("id");
            
            const { state } = await api.getRealm(realmID);
            
            /*
            Flag that acts as a switch depending on the server's state.
            We change the state based on the current status.
            Acts as a boolean switch.
            */
            const newState = state === "OPEN" ? "close" : "open";
            await api.changeRealmState(realmID, newState);
            
            interaction.reply(`Server state changed to ${newState}`);

			//needs to be changed to support multiple realms
			// const { downloadUrl } = await api.getRealmWorldDownload(`${config.realmId}`, "1");

			// const embed = new EmbedBuilder().setTitle("Download URL").setURL(`${downloadUrl}`).setFooter({text: "This URL is from the official Microsoft website."});
			// return interaction.reply({ embeds: [embed] });			
		} catch (error) {
			console.error(error);
            interaction.reply("You have insufficient permissions to change the state of this Realm. Ensure you are the owner.");

		}
	},
};
