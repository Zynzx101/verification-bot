import { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, Events } from 'discord.js';

const verificationChannel = '1429277241749012566'
const executive_role = '1437633864402210888'
const admin_role = '1440674212066099200'

console.log("verification file found")


export default {
    name: Events.MessageCreate,
    once: false,
    async execute(message) {
        console.log("verification started")
        console.log(message.content)
        const member = message.member; 
        const isAdmin = member.roles.cache.has(admin_role);
        const isExecutive = member.roles.cache.has(executive_role);
        if (message.content === '.setup' && message.channelId === verificationChannel && (isAdmin || isExecutive) ) {
            console.log("verification something")
            await message.channel.send({
                embeds: [
                    new EmbedBuilder()
                        .setTitle('Verify your DSEC membership')
                        .setDescription('Click **Verify Here** and enter your **Full name** and **Student ID** (e.g., `s123456789`). Your responses are private.')
                        .setColor(parseInt(process.env.roleColorHex, 16))
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
