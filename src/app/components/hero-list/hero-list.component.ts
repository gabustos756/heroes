import { Component, Input, Output, EventEmitter, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Hero } from '../../models/hero.interface';
import { HeroCardComponent } from '../hero-card/hero-card.component';
import { LoadingComponent } from '../loading/loading.component';
import { AlertModalComponent, AlertModalData } from '../alert-modal/alert-modal.component';

@Component({
  selector: 'app-hero-list',
  standalone: true,
  imports: [CommonModule, FormsModule, HeroCardComponent, LoadingComponent, AlertModalComponent],
  templateUrl: './hero-list.component.html',
  styleUrls: ['./hero-list.component.scss']
})
export class HeroListComponent {
  private _heroes = signal<Hero[]>([]);
  private _filteredHeroes = signal<Hero[]>([]);
  private _selectedHero = signal<Hero | null>(null);
  private _isLoading = signal<boolean>(false);
  private _searchQuery = signal<string>('');

  heroCount = computed(() => this._heroes().length);
  filteredCount = computed(() => this._filteredHeroes().length);
  hasHeroes = computed(() => this._filteredHeroes().length > 0);
  searchPlaceholder = computed(() => 
    this._searchQuery() ? `Searching for "${this._searchQuery()}"...` : 'Search heroes, powers, teams...'
  );

  @Output() searchChange = new EventEmitter<string>();
  @Output() createHero = new EventEmitter<void>();
  @Output() heroSelect = new EventEmitter<Hero>();
  @Output() heroEdit = new EventEmitter<Hero>();
  @Output() heroDelete = new EventEmitter<string>();

  @Input() set heroes(value: Hero[]) {
    this._heroes.set(value || []);
  }

  @Input() set filteredHeroes(value: Hero[]) {
    this._filteredHeroes.set(value || []);
  }

  @Input() set selectedHero(value: Hero | null) {
    this._selectedHero.set(value);
  }

  @Input() set isLoading(value: boolean) {
    this._isLoading.set(value);
  }

  @Input() set searchQuery(value: string) {
    this._searchQuery.set(value || '');
  }

  get heroes(): Hero[] { return this._heroes(); }
  get filteredHeroes(): Hero[] { return this._filteredHeroes(); }
  get selectedHero(): Hero | null { return this._selectedHero(); }
  get isLoading(): boolean { return this._isLoading(); }
  get searchQuery(): string { return this._searchQuery(); }

  showDeleteModal = false;
  heroToDelete: Hero | null = null;
  deleteModalData: AlertModalData = {
    title: 'Delete Hero',
    message: '',
    confirmText: 'Delete',
    cancelText: 'Cancel',
    type: 'danger'
  };

  onSearchChange(): void {
    this.searchChange.emit(this._searchQuery());
  }

  onCreateHero(): void {
    this.createHero.emit();
  }

  onHeroSelect(hero: Hero): void {
    this.heroSelect.emit(hero);
  }

  onHeroEdit(hero: Hero): void {
    this.heroEdit.emit(hero);
  }

  onHeroDelete(hero: Hero): void {
    this.heroToDelete = hero;
    this.deleteModalData.message = `Are you sure you want to delete <strong>${hero.name}</strong>?<br><small>This action cannot be undone.</small>`;
    this.showDeleteModal = true;
  }

  onDeleteConfirm(): void {
    if (this.heroToDelete) {
      this.heroDelete.emit(this.heroToDelete.id);
      this.showDeleteModal = false;
      this.heroToDelete = null;
    }
  }

  onDeleteCancel(): void {
    this.showDeleteModal = false;
    this.heroToDelete = null;
  }

  onDeleteClose(): void {
    this.showDeleteModal = false;
    this.heroToDelete = null;
  }
} 