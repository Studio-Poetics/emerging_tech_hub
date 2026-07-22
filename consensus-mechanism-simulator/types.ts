export type SectionId = 'intro' | 'pow' | 'pos' | 'bft' | 'analysis';

export interface ProgressState {
  intro: boolean;
  pow: boolean;
  pos: boolean;
  bft: boolean;
  analysis: boolean;
}

export interface Miner {
  id: number;
  name: string;
  hashRate: number; // Percentage 0-100
  color: string;
  isMalicious: boolean;
}

export interface Block {
  id: number;
  hash: string;
  miner: string;
  isMalicious: boolean;
  timestamp: string;
}

export interface Validator {
  id: number;
  name: string;
  stake: number;
  isMalicious: boolean;
  slashed: boolean;
  rewards: number;
}

export interface General {
  id: number;
  name: string;
  type: 'Honest' | 'Traitor';
  vote: 'Attack' | 'Retreat' | 'Undecided';
  messagesSent: number;
}
