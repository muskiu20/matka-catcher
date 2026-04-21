export const ITEMS = [
  { key: 'coin',       label: 'Gold Coin',    type: 'auspicious',   points: 15, weight: 'medium' },
  { key: 'flower',     label: 'Flower',       type: 'auspicious',   points: 8,  weight: 'light'  },
  { key: 'mango_leaf', label: 'Mango Leaf',   type: 'auspicious',   points: 6,  weight: 'light'  },
  { key: 'bee',        label: 'Bee',          type: 'inauspicious', points: 0,  weight: 'light'  },
  { key: 'broom',      label: 'Broom',        type: 'inauspicious', points: 0,  weight: 'heavy'  },
];

// Weighted pool — 70% auspicious, 30% inauspicious
export const M1_SPAWN_POOL = [
  'coin', 'coin', 'coin',
  'flower', 'flower',
  'mango_leaf', 'mango_leaf',
  'bee', 'bee',
  'broom',
];
