const { SlashCommandBuilder, AttachmentBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('net')
        .setDescription('Autonomous network Network console.')
        .addSubcommand(subcommand =>
            subcommand
                .setName('status')
                .setDescription('Status of the Network Module.')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('topo')
                .setDescription('Topology render.')
                .addStringOption(
                    option => option.setName('datacenter')
                        .setDescription('The datancenter'))
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
        if (interaction.commandName == 'net') {
            switch (interaction.options.getSubcommand()) {
                case 'status': {
                    /*
                      grafana render api
                      http://admin:radio6mesa@localhost:3000/render/d-solo/fb58d5aa-7675-43fc-a806-89826d421d05/sandbox-autonomous-network?orgId=1&viewPanel=5&panelId=5&width=930&height=960
                      */
                    try {
                        await download('http://localhost:3000/render/d-solo/fb58d5aa-7675-43fc-a806-89826d421d05/sandbox-autonomous-network?orgId=1&viewPanel=5&panelId=5&width=930&height=960', 'an.png')
                    } catch (err) {
                        console.log(err.message);
                    }
                    const fileImg = new AttachmentBuilder('output/an.png');
                    await interaction.reply({
                        content: "Por supuesto rey ...",
                        files: [fileImg]
                    });
                    break;
                }
                case 'topo': {
                    const datacenter = interaction.options.getString('datancenter');

                    const fileTxt = new AttachmentBuilder('commands/utility/graph.cypher');
                    const fileImg = new AttachmentBuilder('commands/utility/graph.png');

                    await interaction.reply({
                        content: "Si rey, ahí va:",
                        files: [fileTxt, fileImg]
                    });
                    break;
                }
                default:
                    await interaction.reply(`Non-defined command.`);
            }
        }
    },
};

const fs = require("fs");
const { mkdir } = require("fs/promises");
const { Readable } = require('stream');
const { finished } = require('stream/promises');
const path = require("path");
const download = (async (url, fileName) => {
    var username = 'admin';
    var password = 'radio6mesa';
    var headers = new Headers({
        'Authorization': `Basic ${btoa(username + ':' + password)}`
    });
    
    const res = await fetch(url, {headers: headers});
    if (!fs.existsSync("output")) await mkdir("output");
    const destination = path.resolve("./output", fileName);
    const fileStream = fs.createWriteStream(destination, { flags: 'wx' });
    await finished(Readable.fromWeb(res.body).pipe(fileStream));
});