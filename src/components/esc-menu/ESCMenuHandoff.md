# ESC Menu Component Specification

## Overview
A Stardew Valley-inspired game menu that opens on ESC key press and provides navigation to different game sections.

## Visual Specs
- **Width:** 340px
- **Colors:**
  - Background: `linear-gradient(to bottom, #8b5e3c, #6d472c)`
  - Border: `#3d2813`, Active border: `#ecc06f`
  - Text: `#e0d2c0`, Active text: `#f8e4bc`
- **Font:** 'VT323' monospace for title, system font for menu items
- **Visual elements:** Corner nails, wood grain texture, golden highlights

## Component Structure
```
<Dialog> (triggered by ESC key)
  └─ <Container> (Wooden panel with corner nails)
     ├─ <TitleBar> "Game Menu"
     └─ <ButtonContainer>
        ├─ <Button> HomeIcon + "PLAY" + "P" shortcut
        ├─ <Button> GiftIcon + "REWARDS" + "R" shortcut
        ├─ <Button> UserIcon + "CHARACTER" + "C" shortcut
        ├─ <Button> LayersIcon + "COLLECTIONS" + "L" shortcut
        └─ <Button> PlayIcon + "RESUME" + "ESC" shortcut
     └─ <VersionIndicator> "v0.1"
```

## Button Layout
- Each button has 3 elements in a row with space-between:
  1. Icon in container (left)
  2. Text label (left-aligned, flexGrow)
  3. Keyboard shortcut (right)

## Behaviors
- **Opening/Closing:** ESC key toggles menu
- **Navigation:** Click or keyboard shortcut (P, R, C, L, ESC)
- **Active state:** Gold border + arrow indicator on left
- **Hover state:** Slight movement + darker background

## Animations
- Menu fade-in on open
- Staggered button appearance (0.05s delay between each)
- Pulsing arrow indicator next to active item
- Shine effect across active icon

## Navigation Flow
- PLAY → /overworld
- REWARDS → /rewards
- CHARACTER → /character
- COLLECTIONS → /collections
- RESUME → closes menu

## Accessibility
- Keyboard navigation support
- Visual indicators for active state
- High contrast between text and background 