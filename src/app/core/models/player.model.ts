export type Role = 'detective' | 'impostor' | 'civilian';

export interface Player {
    position: number;
    name: string;
    img?: string;
    role?: Role;
    isDead?: boolean;
    isStartingPlayer?: boolean;
}