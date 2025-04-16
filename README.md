# EVM Price Widget

_A decentralized and lightweight real-time price widget for EVM — bringing trustless token price updates directly from the blockchain._

> A Minimalist On-chain Price Display dApp — No Centralized Data Needed

## Overview

The **EVM Price Widget** is a decentralized application (dApp) that delivers **real-time token price updates** for EVM users. It eliminates the need for **centralized data providers** by fetching price data **directly from the blockchain**, making it more transparent, censorship-resistant, and resilient.

- **Problem it solves:** Existing widgets rely on centralized APIs that may become unavailable or manipulated.
- **Who it’s for:** Developers, traders, and users of EVM looking for a reliable and trustless way to view token prices.
- **What makes it unique:** The widget fetches and renders price data purely on-chain — no intermediaries involved.

## Why This Project?

Most price display tools are tightly coupled with centralized APIs or services. This project was inspired by the growing demand for **trustless DeFi experiences** and aims to:

- **Remove reliance on off-chain APIs**
- **Ensure high availability** through decentralized sources
- **Keep the UI lightweight, embeddable, and easy to integrate**

By focusing on EVM, it showcases a clean model for how DEXs can serve their communities with simple, on-chain utilities.

## Features

- Fully **on-chain price fetching** (no centralized API calls)
- Lightweight and responsive **widget UI**
- **Real-time updates** without backend servers
- Easily **embeddable** into third-party websites or dashboards
- Minimal setup and **developer-friendly**

## Roadmap

- [x] Phase 1: MVP widget displaying token prices on EVM
- [ ] Phase 2: Add support for more tokens
- [ ] Phase 3: Add historical charting using on-chain data
- [ ] Phase 4: Community-driven theming and customization options

## Tech Stack

**Blockchain:**
Solidity · Viem · Wagmi · RainbowKit

**Web:**
Next.js · React · Tailwind CSS

**Cloud:**
Vercel · GitHub Actions (CI/CD)

## Getting Started

### Prerequisites

- Node.js & npm
- Git
- Wallet like MetaMask

### Installation

```bash
git clone https://github.com/yourusername/EVM-widget.git
cd EVM-widget
npm install
npm run dev
```

## Environment Variables

Create a `.env` file in the root with the following keys:

```env
NEXT_PUBLIC_ENERGISWAP_API_URL=
NEXT_PUBLIC_COINGECKO_API_URl=
NEXT_PUBLIC_RAINBOWKIT_PROJECT_ID=
NEXT_PUBLIC_ETHEREUM_MAINNET_RPC_URL=
```

## Usage

```bash
# Run development server
npm run dev

# Run tests
npx hardhat test
```

You can now embed or integrate the widget into any web application or dashboard!

## Architecture

[Frontend (React/Next.js)] → [Web3 Provider] → [EVM Smart Contract]

## Deployment

- **Cloud:** Deployed on Vercel
- **Smart Contracts:**
  - Network: Ethereum / Energi (or specify)
  - Contract Address: `0xYourContractAddress`
  - Block Explorer: [View on Explorer](https://explorer.url/0xYourContractAddress)

## Contributing

We welcome contributions to improve the widget:

1. Fork the repo
2. Create your branch: `git checkout -b feature/your-feature-name`
3. Commit your changes
4. Push to your fork: `git push origin feature/your-feature-name`
5. Open a Pull Request

## License

This project is licensed under the [MIT License](LICENSE).

## Credits

- Inspired by the DeFi community’s need for trustless UI components
- Built by John Rommel Octaviano
- Powered by EVM · Ethereum · Vercel · Web3.js
