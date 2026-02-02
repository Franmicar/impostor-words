import { Player } from "./player.model";

export type State = 'waiting' | 'choosing' | 'revealing' | 'playing' | 'voting' | 'ended';

export class Game {
    word: string = '';
    state: State = 'waiting';
    players: Player[] = [];
    time?: number = 0;
    isGameOver: boolean = false;
    lastKilledPosition: number = -1;
}