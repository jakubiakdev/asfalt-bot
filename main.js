const Discord = require('discord.js');
const config = require('./config.json');
const fetch = require('node-fetch');

const client = new Discord.Client();

client.on('ready', () => {
	console.log('asfalto bot');
	client.user.setPresence({ activity: { type: `COMPETING`, name: `bed` }, status: `online` });
});

client.ws.on('INTERACTION_CREATE', async (interaction) => {
	if (interaction.data.name !== 'astolfo') return;
	client.api.interactions(interaction.id, interaction.token).callback.post({
		data: { type: 5 }
	});

	const type = interaction.data.options[0].value;

	webhookClient = new Discord.WebhookClient(client.user.id, interaction.token);

	if (type != "safe" && client.channels.cache.get(interaction.channel_id) == undefined || type != "safe" && !client.channels.cache.get(interaction.channel_id).nsfw ) { // this is a 900000iq workaround for "cannot read propriety of undefined"
		webhookClient.send('use on nsfw plz');
		return;
	}

	const response = await fetch(
		`https://astolfo.rocks/api/v1/images/random/${type}`
	);
	const json = await response.json();

	const embed = new Discord.MessageEmbed()
		.setImage(json.url)
		.setTitle(`Astolfo`)
		.setFooter(
			`views: ${json.views} | rating: ${json.rating} | sauce: ${json.source || 'Unknown'}`
		);

	webhookClient.send({ embeds: [embed] });
});

process.on('uncaughtException', (error) => {
	console.error(error);
});

client.login(config.token);
