# AI Developer Prompt Guidelines & "User Happy" Principles

## Overview
This document outlines the core principles, design philosophy, and code standards required for the **Canteen Quick-Order & QR Token Fulfillment System** to ensure high quality, maintainability, and complete user satisfaction ("User Happy").

---

## 1. "User Happy" Principles

### 🌟 1. Zero-Friction User Experience
- **Instant Access**: Customer should scan QR code and immediately see menu without forced logins, app installs, or complex signups.
- **Speed & Simplicity**: Fast loading times, minimal taps to place orders, and clear visual tokens.
- **Clear Status Visibility**: Real-time feedback at every step (Order Received → Preparing → Ready for Pickup → Fulfilled).

### 🎨 2. WOW Visual Aesthetics & Design System
- **Modern Palette**: Deep dark theme with vibrant accents (Emerald Green `#10B981`, Amber Gold `#F59E0B`, Electric Cyan `#06B6D4`, Cash Green `#059669`).
- **Glassmorphism & Micro-animations**: Sleek backdrop filters, subtle hover elevation, badge glows, and smooth page transitions.
- **Typography**: Clean sans-serif fonts with distinct hierarchy (Inter/Roboto default fallback).
- **No Boring Interfaces**: Highly dynamic UI with interactive item selectors, live counter counters, and responsive mobile-first layouts.

### 🔔 3. Audio & Haptic Feedback
- **Kitchen Notification Chime**: Instant, non-intrusive Web Audio API sound alert when new orders arrive.
- **Visual Badges**: Flash indicators on live tickets to catch kitchen staff attention instantly.

---

## 2. Technical Quality & SDLC Standards

### 🛡️ Clean Code & Modularity
- **Decoupled Architecture**: Separate context state management (`OrderContext`), visual components, helper utilities, and scanning logic.
- **Error Handling**: Graceful fallbacks for missing permissions (e.g. camera access fallback to manual token lookup or file input).
- **Cross-Browser Sync**: Multi-tab synchronization using `BroadcastChannel` & `localStorage` so kitchen, staff, and customer views stay perfectly synced without external server setup.

### 🐙 Git & GitHub Best Practices
- Every feature task tied to a specific **GitHub Issue**.
- Branch naming convention: `feature/issue-<number>-<description>` or `fix/issue-<number>-<description>`.
- Clear Pull Request descriptions with verification checklists.
- Auto-close issues upon merging PR to `main`.
