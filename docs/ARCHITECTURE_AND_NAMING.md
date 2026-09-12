# Domain Naming Architecture & Component Specifications

## 1. Domain Vocabulary Mapping

To ensure high clarity, self-documenting code, and clean architecture, each part of the Canteen QR Order System is named according to its exact business domain role:

| Part / Step | Domain Name | Component / File Name | Purpose |
| :--- | :--- | :--- | :--- |
| **Step 1: Scan & Order** | Customer Order Portal | `CustomerOrderPortal.jsx` | Direct browser food menu catalog, category filtering, search, quantity controls, & cart drawer. |
| **Step 2: Instant Token** | Digital Receipt Token | `DigitalReceiptToken.jsx` | Immediate screen locking token receipt displaying `#Token`, `Amount Due (৳320 Cash)`, and Customer QR Code. |
| **Step 2: Live Kitchen Alert** | Kitchen Live Display | `KitchenLiveDisplay.jsx` | Real-time kitchen ticket stream with Web Audio API chime sound alerts & preparation toggles. |
| **Step 3: Scan, Pay & Collect**| Counter Fulfillment Terminal | `CounterFulfillmentTerminal.jsx` | Canteen staff camera scanner terminal, order item popup, cash collection trigger, and fulfillment mark done. |
| **App Navigation Header** | App Header Navigation | `AppHeaderNavigation.jsx` | Mode navigation toolbar with view indicators, cart badge, & chime test button. |
| **State Sync Engine** | Order Context & Provider | `OrderContext.jsx` (`useOrderSystem`) | Multi-tab state management using `BroadcastChannel` & `localStorage`. |
| **Audio Notification** | Audio Chime Synthesizer | `audioChimeSynthesizer.js` | Synthesizes pleasant two-tone audio bell (`E5` -> `B5`) without external MP3 dependencies. |
| **QR Code Engine** | QR Code Renderer | `qrCodeRenderer.jsx` | High-resolution SVG renderer for token QR codes. |

---

## 2. Best Practices Enforced

1. **Self-Descriptive Naming**: No ambiguous abbreviations (`StaffScanner` → `CounterFulfillmentTerminal`, `ReceiptCard` → `DigitalReceiptToken`).
2. **Step Alignment**: Explicit mapping to user-defined Step 1 (Order), Step 2 (Token & Kitchen Chime), Step 3 (Scan & Collect).
3. **Decoupled Responsibilities**: State engine, audio synthesis, QR rendering, and UI view components are neatly isolated.
