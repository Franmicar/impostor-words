import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GameConfig } from '../../core/services/game-config';
import { MatCardModule } from '@angular/material/card';
import { HttpClient } from '@angular/common/http';
import { Package } from '../../core/models/package.model';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { Button } from '../../shared/components/button/button';
import { DataCard } from '../../shared/components/data-card/data-card';
import { TitleComponent } from '../../shared/components/title/title';

@Component({
  selector: 'app-packages',
  imports: [MatCardModule, MatButtonModule, AsyncPipe, Button, DataCard, TitleComponent],
  templateUrl: './packages.html',
  styleUrl: './packages.scss',
})
export class Packages implements OnInit {

  packages$!: Observable<Package[]>;
  selectedCategories = new Set<string>();

  constructor(private router: Router, private configService: GameConfig, private http: HttpClient) { }

  ngOnInit(): void {
    this.packages$ = this.getPackages();
    // Precargar selección desde la configuración (ahora son strings)
    this.configService.config.packages.forEach(category =>
      this.selectedCategories.add(category)
    );
  }

  getPackages() {
    return this.http.get<Package[]>('data/packages.json');
  }

  togglePackage(category: string) {
    if (this.selectedCategories.has(category)) {
      this.selectedCategories.delete(category);
    } else {
      this.selectedCategories.add(category);
    }
  }

  isSelected(category: string): boolean {
    return this.selectedCategories.has(category);
  }

  save() {
    this.configService.update({
      packages: Array.from(this.selectedCategories.values())
    });

    this.router.navigate(['/home']);
  }

}