# Hw24MemoryGame

## Requirements

- Display a grid of faced-down cards on the screen, with each card representing a different item or image. You can use emojis as the image, a list of emojis has been provided.
emojis = [ '🐵', '🐶', '🦊', '🐱', '🦁', '🐯', '🐴', '🦄', '🦓', '🦌', '🐮', '🐷', '🐭', '🐹', '🐻', '🐨', '🐼', '🐽', '🐸', '🐰', '🐙' ];
- The grid should consist of an equal number of cards to make pairs.
- When a player clicks on a card, it should flip over and reveal its image.
- Allow the player to select two cards at a time.
- If the two selected cards have the same image, it's a match and they should remain face-up.
- If the two selected cards have different images and the player
  - Selects other cards, the two selected cards should flip back.
  - Do nothing, the two selected cards should flip back facedown after a short delay.
- When all pairs have been successfully matched, end the game, and display a "Play again" button.
