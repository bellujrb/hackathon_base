# InfluNest: Automate Campains with Blockchain BASE

> _TEAM InfluNest: http://influnest-base.vercel.app/

![Build Status](https://img.shields.io/badge/Build-Passing-brightgreen)
![Platform](https://img.shields.io/badge/Platform-MiniApp-blue)
![Blockchain](https://img.shields.io/badge/Blockchain-Base-blue)

---

### 🌐 Introduction

Our MiniApp automates influencer campaigns, integrating blockchain technology to ensure transparency, security, and agility.

---

### 🔴 Base MiniApp

We created a MiniApp on Base using the onchain kit resources from the official documentation. We leveraged the available tools to deliver an integrated, efficient solution that's fully aligned with the Base ecosystem.

--- 

### 🔗 Smart Contracts on Base Sepolia

📄 **Deployed Contracts:**  

- 🪙 [CampaignManager](https://sepolia.basescan.org/address/0xE7c3e1C1F678cDfE8651556F28c396A38CC88E8D) (Manager Campaings)
- 📡 [OracleConnector](https://sepolia.basescan.org/address/0xB457f5908dE044843C90aA1771D999dA8A9Bf3fD) (Oracle for collect data API Instagram)
- ⚽ [Payment Vault](https://sepolia.basescan.org/address/0x101De02821A2b148c49cd39d2182dB216C74DC5F) (For payments Influencers)
- 💵 [USDC](https://sepolia.basescan.org/address/0x0B971C4e62AB0eC19CaF3eBb0527e8A528fcAdD6) (USDC for Payments) 

✅ Actively in development · Live on **Base Sepolia**  

---

### 🔁 End-to-End MiniApp Flowchart

![DApp Flowchart](https://github.com/user-attachments/assets/0cf87483-962d-40c0-bbe6-666372e04e42)

---

## 🛠 Installation (Front-end)

1. **Pre-requisites**
    - Make sure you have NodeJS installed on your machine.

2. **Clone the Repository**

    ```bash
    git clone https://github.com/bellujrb/hackathon_base/front-end
    ```

3. **Install Dependencies**

    ```bash
    npm install
    ```

4. **Run the App**

    ```bash
    npm run dev
    ```

---

## 📂 Project File Tree
    
```
hackathon_base
├── front-end
│   └── abi
│       └── CampaignManager.json
│       └── OracleConnector.json
│       └── PaymentVault.json
│   └── app
│       └── api
│           └── balance
│           └── instagram
│           └── notify
│           └── transactions
│           └── webhook
│       └── components
│           └── ...
│       └── contexts
│           └── campaign-context.tsx
│       └── hooks
│           └── useCampaignForm.ts
│           └── useCampaigns.ts
│           └── useCreateCampaign.ts
│           └── useWalletBalance.ts
│           └── useWalletTransactions.ts
│       └── globals.css
│       └── layout.tsx
│       └── page.tsx
│       └── providers.tsx
│       └── theme.css
│   └── components
│       └── ...
│   └── lib
│   └── ...
├── blockchain
│   └── abi
│       └── CampaignManager.json
│       └── OracleConnector.json
│       └── PaymentVault.json
│   └── broadcast
│       └── ...
│   └── lib
│       └── ...
│   └── script
│       └── Deploy.s.sol
│   └── src
│       └── CampaignManager.sol
│       └── OracleConnector.sol
│       └── PaymentVault.sol
│       └── USDC.sol
│   └── deploy.sh
├── README.MD
```
---

#### `hackathon_base`

- `front-end`
    - Frontend Application
- `blockchain`
    - Blockchain Application
- `README.md`
    - Documentation Project

---

## 🙏 Acknowledgments

Special thanks to BASE for this ambitious opportunity.
