# Asfalt bot

quick and dirty™️ bot that gives you astolfo images by using astolfo.rocks

[Invite, 1% uptime guaranteed](https://discord.com/oauth2/authorize?client_id=830048723442073600&scope=applications.commands)

# slashcommand json:

```json
{
	"name": "astolfo",
	"description": "gives you some good astolfo",
	"options": [
		{
			"type": 3,
			"name": "rating",
			"description": "rating of your astolfo",
			"default": false,
			"required": true,
			"choices": [
				{
					"type": 4,
					"name": "sfw",
					"value": 0
				},
				{
					"type": 4,
					"name": "questionable",
					"value": 1
				},
				{
					"type": 4,
					"name": "nsfw",
					"value": 2
				}
			]
		}
	]
}
```
