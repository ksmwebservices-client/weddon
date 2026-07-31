import {
  Sparkles, Crown, Shirt, Camera, Flower2, UtensilsCrossed, Music, Plane,
  Compass, Palette, CalendarCheck, Heart, Video, Gem, Mail, Gift, Car,
  ShoppingBag, Mic, Users, Coffee, Sun, Moon, Cake, Flame, type LucideIcon,
} from 'lucide-react';

const MAP: Record<string, LucideIcon> = {
  Sparkles, Crown, Shirt, Camera, Flower2, UtensilsCrossed, Music, Plane,
  Compass, Palette, CalendarCheck, Heart, Video, Gem, Mail, Gift, Car,
  ShoppingBag, Mic, Users, Coffee, Sun, Moon, Cake, Flame,
};

export function iconFor(name: string): LucideIcon {
  return MAP[name] ?? Sparkles;
}
