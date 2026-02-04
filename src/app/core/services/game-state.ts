import { Injectable } from '@angular/core';
import { GameConfig } from './game-config';
import { Game } from '../models/game.model';
import { Player, Role } from '../models/player.model';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Package } from '../models/package.model';
import { LoadingService } from './loading';
import { GameDataService } from './game-data';

@Injectable({
  providedIn: 'root',
})
export class GameStateService {

  private _game!: Game;
  private readonly STORAGE_KEY = 'game_state';

  allowExit = false;

  constructor(private configService: GameConfig, private router: Router,
    private gameData: GameDataService, private loadingService: LoadingService) {
    this.loadOrCreate();
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.allowExit = false; // 🔒 bloqueo automático al entrar en cualquier ruta
      });
  }

  /** Obtener configuración (solo lectura) */
  get game(): Game {
    return this._game;
  }

  /** Actualización parcial desde cualquier pantalla */
  update(changes: Partial<Game>): void {
    this._game = Object.assign(new Game(), this._game, changes);
    this.persist();
  }

  /** Resetear a valores por defecto */
  reset(): void {
    this._game = new Game();
    this.persist();
  }

  /** ---------- Internals ---------- */

  private loadOrCreate(): void {
    const stored = localStorage.getItem(this.STORAGE_KEY);

    if (stored) {
      this._game = Object.assign(
        new Game(),
        JSON.parse(stored)
      );
    } else {
      this._game = new Game();
      this.persist();
    }
  }

  private persist(): void {
    localStorage.setItem(
      this.STORAGE_KEY,
      JSON.stringify(this._game)
    );
  }

  /** ---------- Game ---------- */

  startGame() {
    this.loadingService.show();
    this.pickRandomWord().subscribe(word => {

      this.update({
        word,
        state: 'revealing',
        hintType: this.configService.config.hints
      });

      this.pickImpostors();
    });
  }

  getSelectedPackages(): Observable<Package[]> {
    return this.gameData.getAllPackages().pipe(
      map(all =>
        all.filter(pkg =>
          this.configService.config.packages.includes(pkg.category)
        )
      )
    );
  }

  getAllSelectedWords(): Observable<string[]> {
    return this.getSelectedPackages().pipe(
      map(pkgs =>
        pkgs.flatMap(pkg =>
          pkg.words.map(w => `${pkg.category}.${w}`)
        )
      )
    );
  }

  private pickRandomWord(): Observable<string> {
    return this.getAllSelectedWords().pipe(
      map(words => words[Math.floor(Math.random() * words.length)])
    );
  }

  private pickImpostors(): void {
    const players = structuredClone(this.configService.config.players).map(p => ({ ...p }));
    const impostorCount = this.configService.config.impostors;

    if (impostorCount <= 0 || impostorCount >= players.length) {
      throw new Error('Número de impostores inválido');
    }

    // 1️⃣ Resetear roles
    players.forEach(player => {
      player.role = 'civilian';
    });

    // 2️⃣ Crear array de índices
    const indices = players.map((_, index) => index);

    // 3️⃣ Barajar índices (Fisher–Yates)
    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }

    // 4️⃣ Asignar impostores a los primeros N
    indices.slice(0, impostorCount).forEach(index => {
      players[index].role = 'impostor';
    });

    this.update({
      players,
    });
  }

  get impostors(): Player[] {
    return this.game.players.filter(p => p.role === 'impostor');
  }

  getRole(index: number): Role {
    return this.game.players[index]?.role ?? 'civilian';
  }

  isImpostor(index: number): boolean {
    return this.getRole(index) === 'impostor';
  }

  setStartingPlayer(name: string) {
    this.update({
      players: this.game.players.map(player => {
        if (player.name === name) {
          player.isStartingPlayer = true;
        }
        return player;
      })
    });
  }

  vote(playerId: number) {
    this.update({
      players: this.game.players.map(player => {
        if (player.position === playerId) {
          player.isDead = true;
          this.game.lastKilledPosition = playerId;
        }
        return player;
      })
    });
    this.checkGameOver();
  }

  checkGameOver() {
    const allImpostorsDead = this.game.players
      .filter(p => p.role === 'impostor')
      .every(p => p.isDead);

    this.update({ isGameOver: allImpostorsDead });
  }

  allowNavigationOnce() {
    this.allowExit = true;
  }
}
