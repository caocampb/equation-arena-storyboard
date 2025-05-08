/**
 * Shop types for the in-game store
 * Follows Fortnite-style shop with featured/daily rotation
 */

// Item rarity levels
export type ItemRarity = 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';

// Shop categories for navigation
export type ShopCategory = 'featured' | 'daily';

// Educational unlock requirements
export interface EduUnlock {
  type: 'level' | 'xp' | 'achievement';
  value: number;  // Level, XP amount, or achievement ID
  description: string;
}

// Shop item interface
export interface ShopItem {
  id: string;
  name: string;
  description: string;
  emoji: string;  // Simple visual representation
  price: number;
  rarity: ItemRarity;
  category: ShopCategory;
  eduUnlock?: EduUnlock;  // Optional educational unlock path
  expiresAt?: string;     // ISO date for limited time items
  isNew?: boolean;        // Flag for new items
  isFeatured?: boolean;   // Flag for featured items
  type: 'skin' | 'effect' | 'accessory' | 'powerup' | 'boost';
}

// Shop state for the client
export interface ShopState {
  featuredItems: ShopItem[];
  dailyItems: ShopItem[];
  nextRotation: string; // ISO date for shop reset
}

// Helper function to get color class by rarity
export function getRarityColorClass(rarity: ItemRarity): string {
  switch (rarity) {
    case 'legendary':
      return 'text-[#FFA500]'; // Orange
    case 'epic':
      return 'text-[#AA00FF]'; // Purple
    case 'rare':
      return 'text-[#0088FF]'; // Blue
    case 'uncommon':
      return 'text-[#00AA00]'; // Green
    case 'common':
    default:
      return 'text-gray-200'; // Gray
  }
}

// Helper function to get border class by rarity
export function getRarityBorderClass(rarity: ItemRarity): string {
  switch (rarity) {
    case 'legendary':
      return 'border-[#FFA500]'; 
    case 'epic':
      return 'border-[#AA00FF]';
    case 'rare':
      return 'border-[#0088FF]';
    case 'uncommon':
      return 'border-[#00AA00]';
    case 'common':
    default:
      return 'border-gray-500';
  }
} 