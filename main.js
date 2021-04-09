const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');
const fetch = require('node-fetch');

client.on('ready', () => {
    console.log('asfalto bot');
    console.log(`Bot invite (used checking nsfw): https://discord.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=8`);
    console.log(`Slashcommand invite (recommended): https://discord.com/oauth2/authorize?client_id=${client.user.id}&scope=applications.commands`)
    client.user.setPresence({ activity: { type: `COMPETING`, name: `bed` }, status: `online` }); //status
});

client.ws.on('INTERACTION_CREATE', async interaction => {
    if(interaction.data.name !== "astolfo") return;   
    client.api.interactions(interaction.id, interaction.token).callback.post({
        data: {
            type: 5,
        }
    });
    switch (interaction.data.options[0].name){
        case 'sfw': {
            const response = await fetch('https://astolfo.rocks/api/v1/images/random/Safe');
            const json = await response.json();
            let embed = new Discord.MessageEmbed().setImage(json.url).setTitle(`Astolfo`).setFooter(`views: ${json.views} | rating: ${json.rating} | sauce: ${json.source || "Unknown"}`);
            new Discord.WebhookClient(client.user.id, interaction.token).send({ embeds: [embed]});
            break;
        }
        case 'questionable': {
            if (client.channels.cache.get(interaction.channel_id).nsfw == true) {
                const response = await fetch('https://astolfo.rocks/api/v1/images/random/Questionable');
                const json = await response.json();
                let embed = new Discord.MessageEmbed().setImage(json.url).setTitle(`Astolfo`).setFooter(`views: ${json.views} | rating: ${json.rating} | sauce: ${json.source || "Unknown"}`);
                new Discord.WebhookClient(client.user.id, interaction.token).send({ embeds: [embed]});
            } else{
                new Discord.WebhookClient(client.user.id, interaction.token).send('discord would ban me lol | use on nsfw plz');
            }
            break;
        }
        case 'nsfw': {
            if (client.channels.cache.get(interaction.channel_id).nsfw == true) {
                const response = await fetch('https://astolfo.rocks/api/v1/images/random/Explicit');
                const json = await response.json();
                let embed = new Discord.MessageEmbed().setImage(json.url).setTitle(`Astolfo`).setFooter(`views: ${json.views} | rating: ${json.rating} | sauce: ${json.source || "Unknown"}`);
                new Discord.WebhookClient(client.user.id, interaction.token).send({ embeds: [embed]});
            } else{
                new Discord.WebhookClient(client.user.id, interaction.token).send('discord would ban me lol | use on nsfw plz');
            }
            break;
        }
        default:
            new Discord.WebhookClient(client.user.id, interaction.token).send('oops');
    }
});
process.on('uncaughtException', uncaughtException => { 
    console.error("Something has gone wrong! " + uncaughtException);
});


client.login(config.token);//logging in