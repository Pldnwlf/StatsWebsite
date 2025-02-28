interface ExperiencePoints {
  experiencePoints: number;
}

interface AbilityDetails {
  [key: string]: ExperiencePoints;
}

interface Ability {
  [key: string]: AbilityDetails;
}

interface Hero {
  [key: string]: Ability;
}

export interface PlayerStats {
  playerId: string;
  username: string | "Username not found";
  kd: string | "n/a";
  xp: number | 0;
  kills: number | 0;
  deaths: number | 0;
  currentKillStreak: number | 0;
  highestKillStreak: number | 0;
  bounty: number | 0;
  heroes?: Hero;
}
