/**
 * CADemy Shop Pricing Guidelines
 * 
 * This file outlines the standard pricing structure for shop items
 * based on rarity tiers. Follows gaming industry standards (similar to Fortnite).
 */

// Rarity-based price ranges (in coins)
export const PRICE_RANGES = {
  legendary: { min: 700, max: 1500, typical: 750 },
  epic: { min: 450, max: 900, typical: 500 },
  rare: { min: 300, max: 600, typical: 350 },
  uncommon: { min: 150, max: 300, typical: 200 },
  common: { min: 75, max: 200, typical: 125 }
};

// Price modifiers based on item type (multipliers)
export const TYPE_MODIFIERS = {
  skin: 1.2,        // Character skins are premium
  bundle: 1.5,      // Bundles are most valuable
  effect: 1.0,      // Standard pricing
  accessory: 0.9,   // Slightly cheaper
  emote: 0.8,       // More affordable
  powerup: 0.7      // Consumables are cheapest
};

/**
 * Calculate a suggested price for an item based on rarity and type
 * 
 * @param rarity The item's rarity level
 * @param type The item's type
 * @returns Suggested price in coins
 */
export function calculateSuggestedPrice(
  rarity: keyof typeof PRICE_RANGES, 
  type: keyof typeof TYPE_MODIFIERS
): number {
  const basePrice = PRICE_RANGES[rarity].typical;
  const modifier = TYPE_MODIFIERS[type] || 1.0;
  
  return Math.round(basePrice * modifier);
}

/**
 * Pricing Guidelines
 * 
 * 1. All items of the same rarity and type should be priced similarly
 * 2. Higher rarity items should always cost more than lower rarity items
 * 3. Limited-time or "FEATURED" items can have a 10-20% premium
 * 4. Educational unlock items should maintain high value (750+ coins)
 * 5. Seasonal/holiday items follow regular pricing but may have limited availability
 */ 