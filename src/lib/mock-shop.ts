import { ShopItem, ShopState } from "@/types/shop";

/**
 * Mock shop data for v0 implementation
 * Following a Fortnite-inspired shop with daily rotation
 */

// Get next day at midnight for shop rotation
const getNextDayMidnight = (): string => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);
  return tomorrow.toISOString();
};

// Featured items - these rotate less frequently
const featuredItems: ShopItem[] = [
  {
    id: "math_wizard_bundle",
    name: "Math Wizard Bundle",
    description: "Master of equations and mathematical magic! Includes special skin and accessories.",
    emoji: "🧙‍♂️",
    price: 750,
    rarity: "legendary",
    category: "featured",
    isFeatured: true,
    type: "skin",
    eduUnlock: {
      type: "achievement",
      value: 5, // Achievement ID
      description: "Complete 5 math challenges"
    }
  },
  {
    id: "equation_trails",
    name: "Equation Trails",
    description: "Leave a trail of equations behind as you move through the world!",
    emoji: "✨",
    price: 500,
    rarity: "epic",
    category: "featured",
    type: "effect",
    isNew: true
  },
  {
    id: "pi_day_crown",
    name: "Pi Day Crown",
    description: "A royal crown adorned with the digits of pi",
    emoji: "👑",
    price: 350,
    rarity: "rare",
    category: "featured",
    type: "accessory"
  }
];

// Daily items - these rotate every day
const dailyItems: ShopItem[] = [
  {
    id: "xp_multiplier",
    name: "XP Multiplier",
    description: "Earn double XP in your next educational game",
    emoji: "✖️",
    price: 300,
    rarity: "rare",
    category: "daily",
    type: "boost",
    expiresAt: getNextDayMidnight()
  },
  {
    id: "calculator_backpack",
    name: "Calculator Backpack",
    description: "A handy calculator you wear on your back",
    emoji: "🧮",
    price: 175,
    rarity: "uncommon",
    category: "daily",
    type: "accessory",
    expiresAt: getNextDayMidnight()
  },
  {
    id: "speed_boost",
    name: "Speed Boost",
    description: "Move 25% faster for your next 3 games",
    emoji: "⚡",
    price: 100,
    rarity: "common",
    category: "daily",
    type: "powerup",
    expiresAt: getNextDayMidnight()
  },
  {
    id: "number_hat",
    name: "Number Block Hat",
    description: "A hat that looks like a colorful number block",
    emoji: "🎩",
    price: 125,
    rarity: "common",
    category: "daily",
    type: "accessory",
    expiresAt: getNextDayMidnight()
  }
];

// Export mock shop state
export const getMockShopData = (): ShopState => {
  return {
    featuredItems,
    dailyItems,
    nextRotation: getNextDayMidnight()
  };
}; 