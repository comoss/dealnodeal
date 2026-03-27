# Deal or No Deal

A browser-based Deal or No Deal game. Play it live at **https://comoss.github.io/dealnodeal/**

## How to Play

### Starting a Game
1. Enter your **player name** in the field at the top.
2. Click **New Game** — 26 briefcases appear, each hiding a cash amount from $0.01 to $1,000,000.

> You can optionally click **Edit Values** to customise the 26 case labels and amounts before starting.

### Opening Cases (Rounds)
Each round you must open a set number of cases:

| Round | Cases to Open |
|-------|--------------|
| 1     | 6            |
| 2     | 5            |
| 3     | 4            |
| 4     | 3            |
| 5     | 2            |
| 6–9   | 1 each       |

Click any **blue briefcase** to open it and reveal its hidden value. The value board at the bottom shows which amounts are still in play (gold) and which have been eliminated (crossed out red).

### The Banker's Offer
After each round the **Banker** phones with an offer — the average of all remaining case values.

- **DEAL!** — Accept the offer and take the money. Game over.
- **NO DEAL!** — Reject the offer and keep opening cases.

### Winning
- If you take a **DEAL**, you win the banker's offer amount.
- If you refuse every offer and play to the end, you win whatever was in the **last remaining case**.

### Resuming a Game
Your progress is saved automatically. If you close or refresh the browser mid-game, your game will be restored when you return.

## Development

```bash
# Install dependencies
npm install

# Build TypeScript → JavaScript
npm run build

# Watch mode (auto-recompile on save)
npm run watch

# Run locally
npm start          # opens http://localhost:8080
# or
npx serve .        # any static file server works
```

### Tech Stack
- **TypeScript 5** compiled to AMD modules via RequireJS
- **Bootstrap 5** (CDN) for layout and utilities
- **localStorage** for game state persistence
- No build bundler — pure AMD module loading in the browser
