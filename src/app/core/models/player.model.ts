export type Role = 'detective' | 'impostor' | 'civilian';

export interface Player {
    id?: string;
    position: number;
    name: string;
    avatar?: string;
    role?: Role;
}