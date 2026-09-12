# Canteen QR Order System - Workflow & Workplans

## Project Scope & Core Steps

### Step 1: Scan & Order (Customer Flow)
1. **Scanning**: Customer scans table/counter QR code with phone camera.
2. **Instant Menu**: Menu opens instantly in mobile web browser — **no app installation or login required**.
3. **Cart & Placement**: Customer selects food items, customizes quantities, and taps **Place Order**.

---

### Step 2: Instant Token Generation & Kitchen Alert
1. **Receipt Card Locking**: Customer phone screen locks onto a clean **Receipt Card**:
   - **Token Number**: Unique token (e.g., `#042`).
   - **Amount Due**: Total price in BDT currency (e.g., `৳320 Cash`).
   - **Customer QR Code**: High-resolution QR code encoding order metadata.
2. **Instant Kitchen Chime**: Kitchen dashboard receives real-time notification with audio chime alert.
3. **Food Prep**: Cook views items, item variations, and marks ticket status as `Preparing` / `Ready`.

---

### Step 3: Scan, Pay & Collect (Staff Counter Flow)
1. **Counter Arrival**: Customer presents their phone screen with the receipt token QR code.
2. **Staff Scanning**: Canteen staff scans customer screen using camera scanner or manual token input.
3. **Order Pop-up**: Staff screen pops up order breakdown and amount to collect.
4. **Fulfillment**: Employee collects cash payment, hands over food tray, and taps **Done**.
5. **Real-time Sync**: Order automatically updates to `Fulfilled` on both Customer and Kitchen screens instantly.

---

## Detailed Workplan & Phases

### Phase 1: Repository Setup & Git Workflow
- [x] Initialize Git repository & create GitHub repo (`Momotaj-Happy/canteen-qr-order`).
- [x] Create GitHub Issue for Epic: `[Epic: E6] Canteen Quick-Order & QR Token Fulfillment System`.
- [x] Create feature branch `feature/issue-1-canteen-qr-order`.

### Phase 2: Core Frontend & Real-Time Sync Engine
- [ ] Set up React + Vite project structure with CSS modules & modern dark aesthetics.
- [ ] Implement `OrderContext` with `BroadcastChannel` & `localStorage` synchronization.
- [ ] Implement Web Audio API synthesizer chime for kitchen notifications.

### Phase 3: UI Views Implementation
- [ ] **Customer View**: Menu grid, category filters, cart drawer, ordering modal.
- [ ] **Receipt View**: Token card, currency formatting (`৳`), QR code SVG/canvas renderer, live status tracker.
- [ ] **Kitchen View**: Live ticket kanban grid, chime alert on new order, ticket status toggles.
- [ ] **Staff View**: Camera QR code scanner, manual search fallback, cash collection popup, fulfillment trigger.

### Phase 4: SDLC Verification, PR & Issue Closure
- [ ] Run build checks (`npm run build`).
- [ ] Commit code with detailed Git commit messages.
- [ ] Push feature branch to GitHub remote repository.
- [ ] Create GitHub Pull Request linking to Issue `#1`.
- [ ] Merge Pull Request into `main` branch and verify issue closure.
