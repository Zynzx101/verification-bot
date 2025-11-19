import { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, Events } from 'discord.js';

const verificationChannel = '1429277241749012566'

console.log("verification file found")


export default {
    name: Events.MessageCreate,
    once: false,
    async execute(message) {
        console.log("verification started")
        console.log(message.content)
        if (message.content === '.setup' && message.channelId === verificationChannel) {
            console.log("verification something")
            await message.channel.send({
                embeds: [
                    new EmbedBuilder()
                        .setTitle('Verify your student membership')
                        .setDescription('Click **Verify Here** and enter your **Full name** and **Student ID** (e.g., `s123456789`). Your responses are private.')
                        .setColor(parseInt('57F287', 16))
                ],
                components: [
                    new ActionRowBuilder()
                        .addComponents(
                            new ButtonBuilder()
                                .setLabel("Verify Here!")
                                .setCustomId("verification_button")
                                .setStyle(ButtonStyle.Success)
                        )
                ]
            });
        }
    }
};