import { Injectable, signal, computed } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private _loading = signal<boolean>(false);
  
  public loading$ = toObservable(this._loading);
  public readonly loading = this._loading.asReadonly();
  public readonly isLoading = computed(() => this._loading());

  setLoading(loading: boolean): void {
    this._loading.set(loading);
  }

  getLoading(): boolean {
    return this._loading();
  }
} 