# 🌱 TouchGrass Finance

**TouchGrass Finance** is a Web3 productivity protocol where users **stake crypto and earn yield only if they go outside and touch grass.**

The project combines **DeFi mechanics with real-world behavioral incentives** using GPS and photo verification.

---

## 🚀 Problem

Crypto users spend hours online farming yield and rarely go outside.

TouchGrass Finance creates a **fun financial incentive to go outdoors and improve wellbeing.**

---

## 💡 Solution

Users must prove they went outside and touched grass in order to earn yield.

Verification uses:

- 📷 Photo proof
- 📍 GPS location
- ⛓ Staked tokens

If proof is not submitted, **yield stops accumulating.**

---

## 🧠 How It Works

1. User connects wallet
2. User stakes tokens
3. User goes outside
4. Uploads grass photo + GPS proof
5. Daily streak increases
6. Yield grows with streak

---

## 🌍 Features

- Web3 wallet connection
- Token staking system
- GPS verification
- Photo proof validation
- Streak based rewards
- Dynamic yield generation
- 3D island dashboard visualization

---

## 🏗 Architecture

Next.js Frontend
↓
Django REST API
↓
PostgreSQL Database
↓
Media Storage


---

## 🛠 Tech Stack

### Frontend
- Next.js
- React
- TypeScript
- TailwindCSS

### Backend
- Django
- Django REST Framework

### Infrastructure
- Render (API Hosting)
- Vercel (Frontend Hosting)

---

## 📸 Proof System

Each proof submission requires:

- Photo upload
- GPS coordinates
- Wallet address

Proofs are stored and validated on the backend.

---

## 📊 Reward Model

Rewards increase based on **streak consistency**.

Example:

| Streak | Yield Multiplier |
|------|------|
| 1 day | 1x |
| 7 days | 1.5x |
| 30 days | 2x |

---

## 🔧 Local Development

### Backend
cd touchgrass_backend
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver


Server runs at:
http://127.0.0.1:8000

---

### Frontend
cd touchgrass_frontend
npm install
npm run dev

Frontend runs at:
http://localhost:3000

---

## 🌱 Future Improvements

- AI grass detection
- On-chain staking contracts
- Mobile app
- NFT streak rewards
- Social leaderboard

---

## 🧑‍💻 Author

**Ritik Kumar**

AI/ML Engineer  
Django Full-Stack Developer

Portfolio  
https://ritikgangwar.netlify.app

---

## 📜 License

MIT License
