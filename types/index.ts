export interface Creature {
  id: string;
  name: string;
  slug: string;
  rarity: string;
  type: string;
  base_stats: {
    hp?: number;
    attack?: number;
    defense?: number;
    sp_atk?: number;
    sp_def?: number;
    speed?: number;
    bst?: number;
  };
  locations: string[];
  description: string;
  image: string;
  how_to_get?: string[];
  moves?: { name: string; type: string; power?: number; description?: string }[];
  evolutions?: { from?: string; to: string; condition: string }[];
}

export interface Code {
  code: string;
  reward: string;
  status: "active" | "expired";
  expires_at: string | null;
  verified_at: string;
  sources: string[];
}

export interface Tier {
  tier: string;
  label: string;
  creatures: string[];
}
