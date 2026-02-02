import { Player } from "./player.model";

export type State = 'waiting' | 'playing' | 'ended';

export class Game {
    word: string = '';
    state: State = 'waiting';
    players: Player[] = [];
}