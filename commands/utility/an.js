const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('an')
        .setDescription('Autonomous network console.')
        .addSubcommand(subcommand =>
            subcommand
                .setName('status')
                .setDescription('Status of the AN.')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('task')
                .setDescription('Task interaction.')
                .addStringOption(
                    option => option.setName('operation')
                        .setDescription('The operation (start|stop|discard)'))
                .addStringOption(
                    option => option.setName('id')
                        .setDescription('The task id'))
        ),
    async execute(interaction) {
        if (interaction.commandName == 'an') {
            switch (interaction.options.getSubcommand()) {
                case 'status': {
                    await interaction.reply(`Status subcommand`);
                    break;
                }
                case 'task': {
                    const operation = interaction.options.getString('operation');
                    const id = interaction.options.getString('id');

                    await interaction.reply(`Task subcommand: ${operation}|${id}`);
                    break;
                }
                default:
                    await interaction.reply(`Non-defined command.`);
            }
        }
    },
};