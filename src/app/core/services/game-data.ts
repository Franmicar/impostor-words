import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Package } from '../models/package.model';
import { TranslateService } from '@ngx-translate/core';

@Injectable({ providedIn: 'root' })
export class GameDataService {

  private wordsCache = new Map<string, any>();
  private hintsCache = new Map<string, any>();

  constructor(private http: HttpClient, private translate: TranslateService) { }

  /** -------- PACKAGES (estructura del juego) -------- */

  getAllPackages(): Observable<Package[]> {
    return this.http.get<Package[]>('data/packages/packages.json');
  }

  getAllPackagesCards(): Observable<Package[]> {
    return this.http.get<Package[]>('data/packages/packages.' + this.translate.getCurrentLang() + '.json').pipe(
      map(raw => {
        const result: Package[] = [];
        const entries: any = raw;

        for (const key of Object.keys(entries.packages)) {
          result.push({
            title: entries.packages[key].category,
            category: key,
            img: `images/packages/${key}.jpg`,
            description: entries.packages[key].description,
            words: []
          });
        }

        return result;
      })
    );
  }

  /** -------- PALABRAS (traducciones) -------- */

  getWordsForCategory(category: string, lang: string): Observable<any> {
    const key = `${lang}/${category}`;

    if (this.wordsCache.has(key)) {
      return of(this.wordsCache.get(key));
    }

    return this.http.get(`data/words/${lang}/${category}.json`).pipe(
      tap(data => this.wordsCache.set(key, data))
    );
  }

  getWord(category: string, word: string, lang: string): Observable<string> {
    return this.getWordsForCategory(category, lang).pipe(
      map(data => data[category][word])
    );
  }

  /** -------- PISTAS (related) -------- */

  getHintsForCategory(category: string, lang: string): Observable<any> {
    const key = `${lang}/${category}`;

    if (this.hintsCache.has(key)) {
      return of(this.hintsCache.get(key));
    }

    return this.http.get(`data/hints/related/${lang}/${category}.json`).pipe(
      tap(data => this.hintsCache.set(key, data))
    );
  }

  getRandomHint(category: string, word: string, lang: string): Observable<string> {
    return this.getHintsForCategory(category, lang).pipe(
      map(h => {
        const options = h[category][word];
        return options[Math.floor(Math.random() * options.length)];
      })
    );
  }
}
