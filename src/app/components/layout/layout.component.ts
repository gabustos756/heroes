import { Component, OnInit, OnDestroy, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subscription, Subject, debounceTime, distinctUntilChanged, Observable, timer } from 'rxjs';
import { Hero } from '../../models/hero.interface';
import { HeroService } from '../../services/hero.service';
import { BannerComponent } from '../banner/banner.component';
import { HeroDetailsComponent } from '../hero-details/hero-details.component';
import { HeroFormComponent } from '../hero-form/hero-form.component';
import { HeroListComponent } from '../hero-list/hero-list.component';
import { LoadingComponent } from '../loading/loading.component';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    BannerComponent, 
    HeroDetailsComponent, 
    HeroFormComponent,
    HeroListComponent,
    LoadingComponent
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent implements OnInit, OnDestroy {
  private _heroes = signal<Hero[]>([]);
  private _selectedHero = signal<Hero | null>(null);
  private _searchQuery = signal<string>('');
  private _isFormOpen = signal<boolean>(false);
  private _editingHero = signal<Hero | null>(null);
  private _filteredHeroes = signal<Hero[]>([]);
  private _isLoading = signal<boolean>(false);
  
  heroes = computed(() => this._heroes());
  selectedHero = computed(() => this._selectedHero());
  searchQuery = computed(() => this._searchQuery());
  isFormOpen = computed(() => this._isFormOpen());
  editingHero = computed(() => this._editingHero());
  filteredHeroes = computed(() => this._filteredHeroes());
  isLoading = computed(() => this._isLoading());
  
  heroCount = computed(() => this._heroes().length);
  filteredCount = computed(() => this._filteredHeroes().length);
  
  private subscriptions: Subscription[] = [];
  private searchSubject = new Subject<string>();

  constructor(
    private heroService: HeroService,
    private loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.heroService.getHeroes().subscribe(heroes => {
        this._heroes.set(heroes);
        this.filterHeroes();
      }),
      this.heroService.getSelectedHero().subscribe(hero => {
        this._selectedHero.set(hero);
      }),
      this.loadingService.loading$.subscribe(loading => {
        this._isLoading.set(loading);
      }),
      this.searchSubject.pipe(
        debounceTime(500),
        distinctUntilChanged()
      ).subscribe(query => {
        this._searchQuery.set(query);
        this.filterHeroes();
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  filterHeroes(): void {
    if (this._searchQuery().trim() === '') {
      this._filteredHeroes.set(this._heroes());
    } else {
      this.heroService.searchHeroes(this._searchQuery()).subscribe(results => {
        this._filteredHeroes.set(results);
      });
    }
  }

  onSearchChange(): void {
    this.searchSubject.next(this._searchQuery());
  }

  onHeroSelect(hero: Hero): void {
    this.heroService.setSelectedHero(hero).subscribe();
  }

  onHeroEdit(hero: Hero): void {
    this._editingHero.set(hero);
    this._isFormOpen.set(true);
  }

  onHeroDelete(heroId: string): void {
    this.heroService.deleteHero(heroId).subscribe();
  }

  onCreateHero(): void {
    this.simulateDelay(800).subscribe(() => {
      this._editingHero.set(null);
      this._isFormOpen.set(true);
    });
  }

  private simulateDelay(ms: number = 500): Observable<number> {
    return timer(ms);
  }

  onFormClose(): void {
    this._isFormOpen.set(false);
    this._editingHero.set(null);
  }

  onFormSubmit(heroData: Omit<Hero, 'id'>): void {
    if (this._editingHero()) {
      this.heroService.updateHero(this._editingHero()!.id, heroData).subscribe(() => {
        this.onFormClose();
      });
    } else {
      this.heroService.createHero(heroData).subscribe(() => {
        this.onFormClose();
      });
    }
  }
}
