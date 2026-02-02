import { Injectable } from '@angular/core';
import { Configuration } from '../models/configuration.model';

@Injectable({
  providedIn: 'root',
})
export class GameConfig {
  private _config!: Configuration;
  private readonly STORAGE_KEY = 'game_configuration';

  constructor() {
    this.loadOrCreate();
  }

  /** Obtener configuración (solo lectura) */
  get config(): Configuration {
    return this._config;
  }

  /** Actualización parcial desde cualquier pantalla */
  update(changes: Partial<Configuration>): void {
    this._config = Object.assign(new Configuration(), this._config, changes);
    this.persist();
  }

  /** Resetear a valores por defecto */
  reset(): void {
    this._config = new Configuration();
    this.persist();
  }

  /** ---------- Internals ---------- */

  private loadOrCreate(): void {
    const stored = localStorage.getItem(this.STORAGE_KEY);

    if (stored) {
      this._config = Object.assign(
        new Configuration(),
        JSON.parse(stored)
      );
    } else {
      this._config = new Configuration();
      this.persist();
    }
  }

  private persist(): void {
    localStorage.setItem(
      this.STORAGE_KEY,
      JSON.stringify(this._config)
    );
  }
}
