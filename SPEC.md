# Akshay Tritiya: Matka Catcher
## Game Design Specification

---

## Concept

A 2D retro portrait-mode mobile game celebrating Akshay Tritiya. Auspicious and inauspicious items rain from the sky. A kid auto-walks across the screen carrying a matka (clay pot) — the player taps to stop the kid and catch falling items. Catching bad items cracks the matka and costs lives. A special booster repairs the matka. Survive as long as possible and score as high as possible.

---

## Core Mechanics

### Movement
- The kid walks automatically left → right across the screen, bouncing off edges.
- Player **taps anywhere** on screen to stop/freeze the kid momentarily under a falling item.
- Releasing (or after a short pause) the kid resumes walking.

### Character Selection
- At the start screen, player chooses **Boy** or **Girl**.
- Both are pixel-art kids in traditional Indian attire (kurta/lehenga).

### Falling Items

| Category | Item | Weight | Points |
|---|---|---|---|
| Auspicious | Gold Coins | Medium | +15 |
| Auspicious | Ring | Heavy | +25 |
| Auspicious | Diya | Medium | +12 |
| Auspicious | Flowers | Light | +8 |
| Auspicious | Mango Leaves | Light | +6 |
| Inauspicious | Empty Wallet | Medium | -1 life |
| Inauspicious | Broken Coins | Light | -1 life |
| Inauspicious | Bees | Light | -1 life |
| Inauspicious | Broken Glass | Heavy | -1 life |
| Inauspicious | Broom | Heavy | -1 life |
| Booster | Kumhar's Wheel | — | Repairs 1 crack |

- Items spawn from random x-positions at the top of the screen and fall at varying speeds.
- Spawn rate and fall speed increase gradually over time (difficulty ramp).

### Matka System (5 Lives)

The matka starts whole. Each inauspicious item caught = 1 crack. Cracks are shown visually on the matka sprite (5 progressive crack states).

**Capacity degrades with cracks:**

| Cracks | Lives Remaining | Can Catch |
|---|---|---|
| 0 | 5/5 | All items |
| 1 | 4/5 | Light + Medium items only |
| 2 | 3/5 | Light + Medium items only |
| 3 | 2/5 | Light items only |
| 4 | 1/5 | Light items only |
| 5 | 0/5 | Game Over |

- Heavy items that the matka can no longer catch simply pass through (no penalty, no points).
- The **Kumhar's Wheel** booster repairs 1 crack, restoring +1 capacity tier.

### Scoring
- Catching auspicious items adds points.
- **Combo multiplier**: consecutive auspicious catches (no misses) build a x1 → x2 → x3 multiplier.
- Missing an auspicious item (it hits the ground) resets the combo.
- Catching an inauspicious item costs 1 life and resets the combo.

### Game Over
- All 5 lives lost → matka fully broken → Game Over screen.
- Shows final score, high score, and Restart button.

---

## Milestones

All three milestones are fully playable end-to-end.

---

### Milestone 1 — Core Loop

**Goal**: A playable skeleton with the fundamental catch mechanic working.

**Scope:**
- Start screen: game title, "Boy / Girl" character select, Tap to Start.
- Game scene:
  - Portrait canvas sized for mobile (e.g. 390×844).
  - Static Indian-themed background (flat color + simple temple/village silhouette).
  - Kid sprite (boy or girl) auto-walks left↔right, bounces off edges.
  - Tap anywhere = kid stops; release = kid walks again.
  - 3 auspicious items fall: Gold Coins, Flowers, Mango Leaves (placeholder colored rectangles).
  - 2 inauspicious items fall: Bees, Broom (placeholder colored rectangles, different color).
  - Matka shown below kid — items caught if matka overlaps falling item on ground level.
  - Score counter (top-left), Lives display as 5 hearts (top-right).
  - Catching inauspicious item removes 1 heart (no matka crack visuals yet).
  - Game Over screen: score, high score (localStorage), Restart button.
- No difficulty ramp yet — fixed spawn rate and speed.

**Deliverable**: Fully playable core loop, placeholder art.

---

### Milestone 2 — Full Mechanics

**Goal**: All game mechanics implemented; all 10 items in play; matka cracking system live.

**Scope (builds on M1):**
- All 10 items (5 auspicious + 5 inauspicious) + Kumhar's Wheel booster in the item pool.
- Pixel-art sprites for all items (retro 16-bit style, Indian-themed).
- Pixel-art kid sprites (boy + girl, simple walk animation — 2 frames).
- Matka sprite with 5 crack states (0 cracks → 4 cracks → shattered = game over).
- Weight-based catch system: cracked matka ignores Heavy / Medium items per the table above.
- Visual indicator when an item is "too heavy" — item passes through with a small "X" particle.
- Booster (Kumhar's Wheel) repairs 1 crack on catch — matka sprite updates accordingly.
- Combo multiplier: x1/x2/x3 displayed on screen, resets on miss or inauspicious catch.
- Score multiplier applied to all point gains.
- Difficulty ramp: fall speed and spawn rate increase every 30 seconds.
- Progressive background: sky gradually darkens as lives are lost (full moon night = danger).

**Deliverable**: Complete, balanced, fully playable game. All mechanics functional.

---

### Milestone 3 — Polish & Full Release

**Goal**: Retro Indian aesthetic fully realised; audio; juice; mobile-optimised.

**Scope (builds on M2):**
- Illustrated start screen: Akshay Tritiya title in decorative Devanagari-inspired font, marigold border, gold palette.
- Detailed pixel-art background: Indian village scene with temple, trees, festive bunting.
- Kid walk animation expanded to 4 frames (smooth retro walk cycle).
- Particle effects:
  - Auspicious catch → golden sparkles + tiny flowers burst.
  - Inauspicious catch → red smoke puff + screen shake.
  - Booster catch → matka glows, repair crack animation.
- Audio:
  - Background music: looping retro chiptune with Indian folk melody (sitar/tabla inspired).
  - SFX: coin collect jingle, crack sound, booster repair sound, game-over dhol beat.
- High score persisted in localStorage with player name entry.
- "Shubh Labh" celebration overlay on beating high score (animated diya + confetti).
- Pause button (top-centre) → pause menu with Resume / Restart / Mute.
- Mute toggle (top-right corner, persistent in localStorage).
- Full mobile touch optimisation: no scroll/zoom, correct viewport meta, safe-area insets.
- Performance target: 60 fps on mid-range Android.

**Deliverable**: Shippable game. Fully polished, audio-complete, mobile-ready.

---

## Tech Stack

| Concern | Choice |
|---|---|
| Engine | Phaser 3 (latest stable) |
| Language | JavaScript (ES6+) |
| Build | Vite (fast dev server + bundling) |
| Art | Pixel art sprites (PNG spritesheets) |
| Audio | Web Audio API via Phaser's audio system |
| Persistence | localStorage |
| Target | Mobile browsers (iOS Safari, Android Chrome) |

---

## File Structure (target)

```
/
├── index.html
├── vite.config.js
├── package.json
├── src/
│   ├── main.js               # Phaser game config + boot
│   ├── scenes/
│   │   ├── BootScene.js      # Load assets
│   │   ├── StartScene.js     # Character select + title
│   │   ├── GameScene.js      # Core gameplay
│   │   └── GameOverScene.js  # Score + restart
│   ├── objects/
│   │   ├── Kid.js            # Auto-walk + tap-stop logic
│   │   ├── Matka.js          # Crack states + weight capacity
│   │   └── FallingItem.js    # Item data + physics
│   ├── data/
│   │   └── items.js          # Item definitions (name, weight, points, sprite key)
│   └── utils/
│       └── scoreManager.js   # High score localStorage helpers
└── public/
    ├── assets/
    │   ├── sprites/
    │   └── audio/
```

---

## Open Questions / Future Scope
- Power-up: "Sone ki Matka" (golden matka) temporary invincibility?
- Social share: screenshot of final score with festive frame?
- Leaderboard (requires backend, post-M3)?
