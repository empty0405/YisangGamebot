const { Client, GatewayIntentBits, Collection, EmbedBuilder } = require('discord.js');
require('dotenv').config();

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ]
});

const PREFIX = process.env.PREFIX || '!';

// Yisang quotes and game responses
const yisangQuotes = [
    "The mirror crack'd from side to side; The curse has come upon me, cried the Lady of Shalott.",
    "Indeed, the root of all my misery was the fact I harbored such lofty dreams.",
    "The windowsill felt like the perfect place to stay, I suppose.",
    "I wondered if my smoke flew far, far away, to somewhere nobody could ever reach it.",
    "Sometimes, I wonder if my words can reach you.",
    "The feast of the crow has begun.",
    "Well then, shall we begin in earnest?",
    "My fingers are numb from the cold.",
    "I see potential in this.",
    "The mirror shows both truth and lies."
];

const gameCommands = {
    'quote': {
        description: 'Get a random Yisang quote',
        execute: () => {
            const randomQuote = yisangQuotes[Math.floor(Math.random() * yisangQuotes.length)];
            return {
                embeds: [new EmbedBuilder()
                    .setColor('#4A5568')
                    .setTitle('Yi Sang\'s Words')
                    .setDescription(`"${randomQuote}"`)
                    .setFooter({ text: 'Project Moon' })
                    .setTimestamp()]
            };
        }
    },
    'mirror': {
        description: 'Gaze into the mirror',
        execute: () => {
            const reflections = [
                'The mirror reflects your deepest desires...',
                'In the mirror, you see infinite possibilities.',
                'The mirror shows a distorted version of reality.',
                'Your reflection nods back at you knowingly.',
                'The mirror is clouded with uncertainty.',
            ];
            const randomReflection = reflections[Math.floor(Math.random() * reflections.length)];
            return {
                embeds: [new EmbedBuilder()
                    .setColor('#2D3748')
                    .setTitle('🪞 Mirror Gaze')
                    .setDescription(randomReflection)
                    .setTimestamp()]
            };
        }
    },
    'smoke': {
        description: 'Light a cigarette with Yisang',
        execute: () => {
            const smokeMessages = [
                'The smoke dissipates into the cold air...',
                'You share a quiet moment of contemplation.',
                'The cigarette burns slowly, time feels suspended.',
                'Wisps of smoke carry your worries away.',
                'The ember glows softly in the darkness.',
            ];
            const randomSmoke = smokeMessages[Math.floor(Math.random() * smokeMessages.length)];
            return {
                embeds: [new EmbedBuilder()
                    .setColor('#718096')
                    .setTitle('🚬 Shared Smoke')
                    .setDescription(randomSmoke)
                    .setTimestamp()]
            };
        }
    },
    'windowsill': {
        description: 'Sit by the windowsill',
        execute: () => {
            return {
                embeds: [new EmbedBuilder()
                    .setColor('#4A5568')
                    .setTitle('🪟 The Windowsill')
                    .setDescription('You sit by the windowsill, watching the world pass by. The view is both familiar and strange.')
                    .setTimestamp()]
            };
        }
    },
    'help': {
        description: 'Show available commands',
        execute: () => {
            let helpText = 'Available commands:\n\n';
            for (const [command, info] of Object.entries(gameCommands)) {
                helpText += `\`${PREFIX}${command}\` - ${info.description}\n`;
            }
            return {
                embeds: [new EmbedBuilder()
                    .setColor('#3182CE')
                    .setTitle('Yisang Game Bot Commands')
                    .setDescription(helpText)
                    .setFooter({ text: 'Use commands with prefix: ' + PREFIX })]
            };
        }
    }
};

client.once('ready', () => {
    console.log(`🤖 ${client.user.tag} is now online!`);
    console.log(`📊 Serving ${client.guilds.cache.size} guilds`);
    client.user.setActivity('by the windowsill', { type: 'WATCHING' });
});

client.on('messageCreate', async (message) => {
    // Ignore bot messages
    if (message.author.bot) return;
    
    // Check if message starts with prefix
    if (!message.content.startsWith(PREFIX)) return;
    
    const args = message.content.slice(PREFIX.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();
    
    // Handle ping command
    if (commandName === 'ping') {
        const ping = Date.now() - message.createdTimestamp;
        const embed = new EmbedBuilder()
            .setColor('#68D391')
            .setTitle('🏓 Pong!')
            .setDescription(`Bot latency: ${ping}ms\nAPI latency: ${client.ws.ping}ms`)
            .setTimestamp();
        
        return message.reply({ embeds: [embed] });
    }
    
    // Handle game commands
    if (gameCommands[commandName]) {
        try {
            const response = gameCommands[commandName].execute();
            await message.reply(response);
        } catch (error) {
            console.error(`Error executing command ${commandName}:`, error);
            const errorEmbed = new EmbedBuilder()
                .setColor('#E53E3E')
                .setTitle('❌ Error')
                .setDescription('Something went wrong while processing your command.')
                .setTimestamp();
            await message.reply({ embeds: [errorEmbed] });
        }
    }
});

client.on('error', error => {
    console.error('Discord client error:', error);
});

// Graceful shutdown
process.on('SIGINT', () => {
    console.log('Received SIGINT. Graceful shutdown...');
    client.destroy();
    process.exit(0);
});

process.on('SIGTERM', () => {
    console.log('Received SIGTERM. Graceful shutdown...');
    client.destroy();
    process.exit(0);
});

// Login to Discord
if (!process.env.DISCORD_TOKEN) {
    console.error('❌ DISCORD_TOKEN is not set in environment variables');
    console.error('Please create a .env file with your Discord bot token');
    process.exit(1);
}

client.login(process.env.DISCORD_TOKEN).catch(error => {
    console.error('❌ Failed to login to Discord:', error);
    process.exit(1);
});