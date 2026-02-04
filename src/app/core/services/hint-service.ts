import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class HintService {

  constructor(private http: HttpClient) { }

  // La pista es una palabra relacionada con la palabra clave
  getRandomHint(wordKey: string): Observable<string> {
    return this.http.get<any>('data/hints.json').pipe(
      map(hints => {
        const [category, word] = wordKey.split('.');

        const options = hints.relatedHints[category][word];

        const idx = Math.floor(Math.random() * options.length);
        return options[idx];
      })
    );
  }

  getRandomGlobalHint(wordKey: string): Observable<string> {
    return this.http.get<any>('data/globalhints.json').pipe(
      map(hints => {
        const templates = hints.globalHints;
        const random = templates[Math.floor(Math.random() * templates.length)];

        const [category, word] = wordKey.split('.');

        return random.text
          .replace('{{category}}', category)
          .replace('{{length}}', word.length.toString())
          .replace('{{firstLetter}}', word[0])
          .replace('{{lastLetter}}', word[word.length - 1]);
      })
    );
  }

  private countVowels(word: string) {
    return (word.match(/[aeiouáéíóú]/gi) || []).length;
  }

}
