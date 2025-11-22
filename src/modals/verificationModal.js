import { ModalBuilder, TextInputBuilder, ActionRowBuilder, TextInputStyle } from 'discord.js';


export function buildVerificationModal() {

	//TODO: modal uses deprecated setLabel and addComponets. Needs to be updated later.

    const modal = new ModalBuilder().setCustomId('verificationModal').setTitle('Verification Forum');

	
		const studentFullName = new TextInputBuilder()
			.setCustomId('studentFullName')
			.setLabel("Full name (as on record)")
			.setStyle(TextInputStyle.Short);

		const studentId = new TextInputBuilder()
			.setCustomId('studentId')
			.setLabel("Student ID")
			.setStyle(TextInputStyle.Short);

		const firstActionRow = new ActionRowBuilder().addComponents(studentFullName);
		const secondActionRow = new ActionRowBuilder().addComponents(studentId);

		modal.addComponents(firstActionRow, secondActionRow);
    return modal;
}
