export const ITEMS = [
  // Auspicious — light
  { key: 'flower',       label: 'Lotus Flower',  type: 'auspicious',    points: 10, weight: 'light'  },
  { key: 'mango_leaf',   label: 'Mango Leaves',  type: 'auspicious',    points: 5,  weight: 'light'  },
  // Auspicious — medium
  { key: 'coin',         label: 'Gold Coin',     type: 'auspicious',    points: 15, weight: 'medium' },
  { key: 'grain',        label: 'Grain',         type: 'auspicious',    points: 15, weight: 'medium' },
  // Auspicious — heavy
  { key: 'cash',         label: 'Cash',          type: 'auspicious',    points: 25, weight: 'heavy'  },
  // Inauspicious
  { key: 'broken_coins', label: 'Broken Coins',  type: 'inauspicious',  points: 0,  weight: 'light'  },
  { key: 'empty_wallet', label: 'Empty Wallet',  type: 'inauspicious',  points: 0,  weight: 'medium' },
  // Powerups
  { key: 'powerup_2x',   label: '2× Powerup',   type: 'powerup_2x',    points: 0,  weight: 'light'  },
  { key: 'matka_repair', label: 'Matka Repair',  type: 'matka_repair',  points: 0,  weight: 'light'  },
];

// M2 pool — inauspicious ~57%, auspicious ~29%, powerups ~14%
export const M2_SPAWN_POOL = [
  // Auspicious (6)
  'flower', 'flower',
  'mango_leaf',
  'coin', 'coin',
  'grain',
  'cash',
  // Inauspicious (12)
  'broken_coins', 'broken_coins', 'broken_coins',
  'broken_coins', 'broken_coins', 'broken_coins',
  'empty_wallet', 'empty_wallet', 'empty_wallet',
  'empty_wallet', 'empty_wallet', 'empty_wallet',
  // Powerups (3)
  'powerup_2x', 'powerup_2x',
  'matka_repair',
];
