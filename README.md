# 🪞 Yisang Game Bot

A Discord bot inspired by Yi Sang from Project Moon's games (Library of Ruina, Limbus Company). Experience melancholic conversations and poetic interactions with this contemplative bot.

## ✨ Features

- **Yisang Quotes**: Get random philosophical quotes from Yi Sang
- **Mirror Gazing**: Peer into reflective contemplations
- **Shared Smoke**: Share quiet moments of introspection  
- **Windowsill Sitting**: Experience the peaceful windowsill perspective
- **Interactive Commands**: Responsive bot with themed interactions

## 🚀 Setup

### Prerequisites
- Node.js 18.0.0 or higher
- A Discord application and bot token

### Installation

1. Clone this repository:
```bash
git clone https://github.com/empty0405/YisangGamebot.git
cd YisangGamebot
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

4. Configure your Discord bot:
   - Go to [Discord Developer Portal](https://discord.com/developers/applications)
   - Create a new application
   - Go to "Bot" section and create a bot
   - Copy the bot token and paste it in your `.env` file:
   ```
   DISCORD_TOKEN=your_bot_token_here
   ```

5. Invite the bot to your server:
   - In the Developer Portal, go to "OAuth2" > "URL Generator"
   - Select "bot" scope and necessary permissions
   - Use the generated URL to invite the bot

6. Start the bot:
```bash
npm start
```

## 🎮 Commands

| Command | Description |
|---------|-------------|
| `!ping` | Check bot latency and responsiveness |
| `!quote` | Get a random Yi Sang quote |
| `!mirror` | Gaze into the mirror for reflection |
| `!smoke` | Light a cigarette and contemplate |
| `!windowsill` | Sit by the windowsill and observe |
| `!help` | Show all available commands |

*Default prefix is `!` (can be changed in .env file)*

## 🛠️ Configuration

You can customize the bot by editing the `.env` file:

```env
DISCORD_TOKEN=your_bot_token_here
PREFIX=!
```

## 📝 Development

To run in development mode:
```bash
npm run dev
```

## 🎭 About Yi Sang

Yi Sang is a character from Project Moon's universe, appearing in games like Library of Ruina and Limbus Company. Known for his poetic nature, philosophical outlook, and melancholic demeanor, this bot captures his essence through interactive commands and themed responses.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

Contributions are welcome! Feel free to submit issues or pull requests to improve the bot.

## ⚠️ Disclaimer

This is a fan-made bot inspired by Project Moon's characters. All rights to the original characters and content belong to Project Moon.