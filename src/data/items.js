export const ITEMS = [
  // Auspicious — light
  { key: 'flower',       label: 'Flower',          type: 'auspicious',   points: 10, weight: 'light'  },
  { key: 'mango_leaf',   label: 'Mango Leaf',       type: 'auspicious',   points: 5,  weight: 'light'  },
  // Auspicious — medium
  { key: 'coin',         label: 'Gold Coin',        type: 'auspicious',   points: 15, weight: 'medium' },
  { key: 'diya',         label: 'Diya',             type: 'auspicious',   points: 10, weight: 'medium' },
  // Auspicious — heavy (high value)
  { key: 'ring',         label: 'Ring',             type: 'auspicious',   points: 25, weight: 'heavy'  },
  // Inauspicious — light
  { key: 'bee',          label: 'Bee',              type: 'inauspicious', points: 0,  weight: 'light'  },
  { key: 'broken_coins', label: 'Broken Coins',     type: 'inauspicious', points: 0,  weight: 'light'  },
  // Inauspicious — medium
  { key: 'empty_wallet', label: 'Empty Wallet',     type: 'inauspicious', points: 0,  weight: 'medium' },
  // Inauspicious — heavy
  { key: 'broken_glass', label: 'Broken Glass',     type: 'inauspicious', points: 0,  weight: 'heavy'  },
  { key: 'broom',        label: 'Broom',            type: 'inauspicious', points: 0,  weight: 'heavy'  },
  // Booster — always catchable (light), repairs one matka crack
  { key: 'booster',      label: "Kumhar's Wheel",   type: 'booster',      points: 0,  weight: 'light'  },
];

// Legacy M1 pool
export const M1_SPAWN_POOL = [
  'coin', 'coin', 'coin',
  'flower', 'flower',
  'mango_leaf', 'mango_leaf',
  'bee', 'bee',
  'broom',
];

// M2 pool — inauspicious outnumber auspicious ~2:1; booster is rare
export const M2_SPAWN_POOL = [
  // Auspicious (6)
  'flower', 'flower',
  'mango_leaf',
  'coin', 'coin',
  'diya',
  'ring',
  // Inauspicious (12)
  'bee', 'bee', 'bee',
  'broken_coins', 'broken_coins', 'broken_coins',
  'empty_wallet', 'empty_wallet',
  'broken_glass', 'broken_glass',
  'broom', 'broom',
  // Powerup (2)
  'booster', 'booster',
];
