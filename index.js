const { token } = require('./config.json');
const { Client, GatewayIntentBits, ActionRowBuilder, EmbedBuilder, ButtonBuilder, ButtonStyle } = require("discord.js")
const fs = require('node:fs');
const path = require('node:path');
const Canvas = require('@napi-rs/canvas');
const Discord = require('discord.js');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ]
})

const catPhoto = new EmbedBuilder()
    .setTitle('chat')
    .setImage('https://www.rd.com/wp-content/uploads/2019/11/cat-10-e1573844975155.jpg');


const dogPhoto = new EmbedBuilder()
    .setTitle('chien')
    .setImage('https://paradepets.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MTkxMzY1Nzg4NjczMzIwNTQ2/cutest-dog-breeds-jpg.jpg');


const buttonCat = new ButtonBuilder()
    .setCustomId('adoptCat')
    .setLabel('adopter un chat')
    .setStyle(ButtonStyle.Danger);

const buttonDog = new ButtonBuilder()
    .setCustomId('adoptDog')
    .setLabel('adopter un chien')
    .setStyle(ButtonStyle.Success);

const row = new ActionRowBuilder()
    .addComponents(buttonCat, buttonDog);


// const PREFIX = "/"

client.on("ready", () => {
    console.log("chat bot connecter");
})

client.on('interactionCreate', async interaction => {

    const { customId } = interaction;
    if (customId === 'adoptCat') {
        await interaction.reply('Vous avez adopté un chat!');
    } else if (customId === 'adoptDog') {
        await interaction.reply('Vous avez adopté un chien!');
    }
});

client.on("messageCreate", (message) => {

    if (
        message.content == "hola" ||
        message.content == "hello" ||
        message.content == "hi" ||
        message.content == "salut" ||
        message.content == "yo" ||
        message.content == "bonjours" ||
        message.content == "bonsoir" ||
        message.content == "coucou"
    ) {
        message.channel.sendTyping();
        setTimeout(() => {
            message.channel.send(`salut ${message.author}`)
        }, 1000)

    }

    if (message.content.includes("adopte") || message.content.includes("adopter")) {
        message.channel.sendTyping();
        setTimeout(() => {
            message.channel.send(`${message.author}, voici deux animaux :`);
            message.channel.send({ embeds: [catPhoto, dogPhoto], components: [row] });
        }, 1000)
    }


})








client.login(token)