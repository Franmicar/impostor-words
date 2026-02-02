import { Package } from "./package.model";
import { Player } from "./player.model";

export type ModeType = 'classic' | 'mysterious' | 'chaos' | 'custom';
export type HintType = 'first' | 'all' | 'none';

export class Configuration {
    mode: ModeType = 'classic';
    impostors: number = 1;
    hints: HintType = 'none';
    packages: Package[] = [];
    duration: number = 5;
    maxImpostors?: number;
    minImpostors?: number = 1;
    maxPlayers?: number;
    minPlayers?: number = 3;
    detectives?: Player[];
    players: Player[] = [
        { position: 1, name: 'Jugador 1' },
        { position: 2, name: 'Jugador 2' },
        { position: 3, name: 'Jugador 3' }
    ];
}