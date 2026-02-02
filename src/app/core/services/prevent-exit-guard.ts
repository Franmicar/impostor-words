import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';

export interface PreventExit {
  confirmExit(): Promise<boolean> | boolean;
}

@Injectable({ providedIn: 'root' })
export class PreventExitGuard implements CanDeactivate<PreventExit> {

  async canDeactivate(component: PreventExit): Promise<boolean> {
    return await component.confirmExit();
  }
}
