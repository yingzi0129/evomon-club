import Link from "next/link";
import Image from "next/image";
import { Flame, Droplets, Leaf, Wind, Bug, CircleDot, Mountain, Skull, Snowflake, Circle, Brain, Shield, Sword, Zap, Moon, Sparkles } from "lucide-react";
import { Creature } from "@/types";

const typeIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  Fire: Flame,
  Water: Droplets,
  Grass: Leaf,
  Flying: Wind,
  Bug: Bug,
  Normal: CircleDot,
  Rock: Mountain,
  Poison: Skull,
  Ice: Snowflake,
  Ground: Circle,
  Psychic: Brain,
  Steel: Shield,
  Fighting: Sword,
  Electric: Zap,
  Dark: Moon,
  Fairy: Sparkles,
};

const typeColors: Record<string, string> = {
  Fire: "bg-amber-100 text-amber-700",
  Water: "bg-teal-100 text-teal-700",
  Grass: "bg-emerald-100 text-emerald-700",
  Flying: "bg-sky-100 text-sky-700",
  Bug: "bg-lime-100 text-lime-700",
  Normal: "bg-slate-100 text-slate-700",
  Rock: "bg-stone-100 text-stone-700",
  Poison: "bg-purple-100 text-purple-700",
  Ice: "bg-cyan-100 text-cyan-700",
  Ground: "bg-orange-100 text-orange-700",
  Psychic: "bg-pink-100 text-pink-700",
  Steel: "bg-gray-100 text-gray-700",
  Fighting: "bg-red-100 text-red-700",
  Dragon: "bg-indigo-100 text-indigo-700",
  Nature: "bg-emerald-100 text-emerald-700",
  Earth: "bg-stone-100 text-stone-700",
  Electric: "bg-yellow-100 text-yellow-700",
  Dark: "bg-slate-100 text-slate-800",
  Fairy: "bg-rose-100 text-rose-700",
};

const rarityColors: Record<string, string> = {
  Legendary: "bg-purple-100 text-purple-700",
  Epic: "bg-blue-100 text-blue-700",
  Rare: "bg-indigo-100 text-indigo-700",
  Common: "bg-slate-100 text-slate-600",
  Starter: "bg-emerald-100 text-emerald-700",
  Unknown: "bg-slate-100 text-slate-600",
};

interface CreatureCardProps {
  creature: Creature;
}

export function CreatureCard({ creature }: CreatureCardProps) {
  const TypeIcon = typeIcons[creature.type] || CircleDot;
  const typeColor = typeColors[creature.type] || "bg-slate-100 text-slate-600";
  const rarityColor = rarityColors[creature.rarity] || rarityColors.Unknown;

  const stats = creature.base_stats;
  const atk = stats.attack || 0;
  const def = stats.defense || 0;
  const spd = stats.speed || 0;

  const imageUrl =
    creature.image && !creature.image.startsWith("/images/")
      ? creature.image
      : `/placeholder-creature.png`;

  return (
    <Link
      href={`/creatures/${creature.slug}`}
      className="group bg-white rounded-lg border border-slate-200 p-4 hover:shadow-md transition-shadow flex flex-col h-full"
    >
      <div className="relative w-full h-32 rounded-md mb-3 overflow-hidden bg-slate-50">
        <Image
          src={imageUrl}
          alt={`${creature.name} Evomon creature`}
          fill
          className="object-contain p-2 group-hover:scale-105 transition-transform"
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 25vw"
        />
      </div>
      <h3 className="font-headline font-bold text-slate-800 text-lg mb-1 group-hover:text-primary transition-colors">
        {creature.name}
      </h3>
      <div className="flex flex-wrap gap-2 mb-3 text-xs font-semibold">
        <span
          className={`${typeColor} px-2 py-1 rounded flex items-center gap-1`}
        >
          <TypeIcon className="w-3 h-3" />
          {creature.type}
        </span>
        <span className={`${rarityColor} px-2 py-1 rounded`}>
          {creature.rarity}
        </span>
      </div>
      <div className="mt-auto grid grid-cols-3 gap-1 text-center bg-slate-50 p-2 rounded-md border border-slate-100">
        <div className="flex flex-col">
          <span className="text-[10px] text-slate-400 uppercase tracking-wider">
            Atk
          </span>
          <span className="font-semibold text-slate-700 text-sm">{atk}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-[10px] text-slate-400 uppercase tracking-wider">
            Def
          </span>
          <span className="font-semibold text-slate-700 text-sm">{def}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-[10px] text-slate-400 uppercase tracking-wider">
            Spd
          </span>
          <span className="font-semibold text-slate-700 text-sm">{spd}</span>
        </div>
      </div>
    </Link>
  );
}
