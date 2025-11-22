import { Events, MessageFlags } from 'discord.js';
import { isValidStudent } from '../services/members.api.mjs';


export default {
	name: Events.InteractionCreate,
	async execute(interaction) {
		console.log("event file loaded")

		
		if (interaction.isChatInputCommand()) {
			const command = interaction.client.commands.get(interaction.commandName);

			if (!command) {
				console.error(`No command matching ${interaction.commandName} was found.`);
				return;
			}

			try {
				await command.execute(interaction);
			} catch (error) {
				console.error(error);
				if (interaction.replied || interaction.deferred) {
					await interaction.followUp({
						content: 'There was an error while executing this command!',
						flags: MessageFlags.Ephemeral,
					});
				} else {
					await interaction.reply({
						content: 'There was an error while executing this command!',
						flags: MessageFlags.Ephemeral,
					});
				}
			}
			return;
		}


		if (interaction.isModalSubmit()) {
			const modalCustomId = interaction.customId;
			if (!modalCustomId) {
				console.error(`No modal matching ${interaction.customId} was found.`);
				return;
			}

			try {
				//room to be more modular. too hardcoded. 
				// -perhaps set the following logic as seperate event?
				if( modalCustomId == 'verificationModal'){
					const member = interaction.member
					const verifiedRole = process.env.roleId
					const isVerified = member.roles.cache.has(admin_role);
					const student_id = interaction.fields.getTextInputValue('studentId')
					const full_name = interaction.fields.getTextInputValue('studentFullName')
					if (isVerified)
					{
						interaction.reply({content: "Your club membership has been already been verified! Thank you. <:islove:1441640073966784623>", ephemeral: true})
					}
					else if (isValidStudent(student_id,full_name) == true){
						await member.roles.add(verifiedRole);
						interaction.reply({content: "Your club membership has been verified! Thank you. <:islove:1441640073966784623>", ephemeral: true})
					}
					else {
						interaction.reply({content: "The name or student ID you entered is incorrect. Please try again. \nNote: New members must wait one full week after joining before they can verify. <:islove:1441640073966784623>", ephemeral: true})
					}
				}
			} catch (error) {
				console.error(error);
				if (interaction.replied || interaction.deferred) {
					await interaction.followUp({
						content: 'There was an error while handling your submission!',
						flags: MessageFlags.Ephemeral
					});
				} else {
					await interaction.reply({
						content: 'There was an error while handling your submission!',
						flags: MessageFlags.Ephemeral
					});
				}
			}
			return;
		}
	}
};
