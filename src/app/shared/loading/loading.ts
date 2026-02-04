import { Component } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoadingService } from '../../core/services/loading';

@Component({
  selector: 'app-loading',
  imports: [MatProgressSpinnerModule],
  templateUrl: './loading.html',
  styleUrl: './loading.scss',
})
export class Loading {
  constructor(public loadingService: LoadingService) { }
}
