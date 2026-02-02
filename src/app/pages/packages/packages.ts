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
  selectedPackages = new Map<string, Package>();

  constructor(private router: Router, private configService: GameConfig, private http: HttpClient) { }

  ngOnInit(): void {
    this.packages$ = this.getPackages();
    // Precargar selección si existe
    this.configService.config.packages.forEach(pkg =>
      this.selectedPackages.set(pkg.category, pkg)
    );
  }

  getPackages() {
    return this.http.get<Package[]>('data/packages.json');
  }

  togglePackage(pkg: Package) {
    if (this.selectedPackages.has(pkg.category)) {
      this.selectedPackages.delete(pkg.category);
    } else {
      this.selectedPackages.set(pkg.category, pkg);
    }
  }

  isSelected(pkg: Package): boolean {
    return this.selectedPackages.has(pkg.category);
  }

  save() {
    this.configService.update({
      packages: Array.from(this.selectedPackages.values())
    });

    this.router.navigate(['/home']);
  }

}