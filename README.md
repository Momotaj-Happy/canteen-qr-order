# 🍱 Canteen QR Order & Token Fulfillment System

> Seamless, zero-login QR food ordering with instant digital receipt tokens, live kitchen chime alerts, and staff QR scanning payment/fulfillment.

[![GitHub Issue](https://img.shields.io/badge/Issue-%231-emerald)](https://github.com/Momotaj-Happy/canteen-qr-order/issues/1)
[![Branch](https://img.shields.io/badge/Branch-feature%2Fissue--1--canteen--qr--order-blue)](https://github.com/Momotaj-Happy/canteen-qr-order/tree/feature/issue-1-canteen-qr-order)
[![SDLC](https://img.shields.io/badge/SDLC-GitHub%20Flow-purple)](#sdlc--workflow)

---

## ⚡ Features

### Step 1: Scan & Order (Customer)
- Customer scans table/counter QR code with phone camera.
- Menu opens instantly in mobile browser—**no app installation or login needed**.
- Food category filters, search, custom quantity toggles, and interactive cart drawer.

### Step 2: Instant Token Generation & Kitchen Alerts (System & Kitchen)
- Instant screen lock onto a digital **Receipt Card**.
- **Token Number**: Unique incrementing token (e.g., `#042`).
- **Amount Due**: Clear total in BDT (`৳320 Cash`).
- **Customer QR Code**: Encoded token QR code for payment collection.
- **Kitchen Chime**: Live audio chime (Web Audio API synthesizer tone) triggers on the Kitchen Dashboard when an order arrives.

### Step 3: Scan, Pay & Collect (Staff Counter)
- Canteen employee scans customer phone QR code using built-in camera scanner or manual token search.
- Staff screen displays item breakdown and exact cash amount to collect.
- Employee collects cash, hands over food tray, and clicks **Done**.
- Status updates instantly to `Fulfilled` on both Customer phone and Kitchen screens in real time.

---

## 🚀 Quick Start

```bash
# Clone repository
git clone https://github.com/Momotaj-Happy/canteen-qr-order.git

# Navigate to project
cd canteen-qr-order

# Install dependencies
npm install

# Start development server
npm run dev
```

---

## 📁 Documentation

Detailed documentation is available in the `docs/` folder:
- [AI Developer Prompt & User Happy Principles](docs/AI_DEVELOPER_PROMPT.md)
- [Workflow & Step-by-Step Workplans](docs/WORKFLOW_AND_WORKPLANS.md)
- [SDLC Best Practices & Git Workflow](docs/SDLC_WORKFLOW.md)
