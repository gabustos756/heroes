import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Hero } from '../models/hero.interface';
import { LoadingService } from './loading.service';
import heroesData from '../mocks/heroes.json';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  constructor(private loadingService: LoadingService) {}
  
  private heroes: Hero[] = heroesData;

  private heroesSubject = new BehaviorSubject<Hero[]>(this.heroes);
  private selectedHeroSubject = new BehaviorSubject<Hero | null>(this.heroes[0]);

  private simulateDelay(ms: number = 1500): Observable<number> {
    return timer(ms);
  }

  getHeroes(): Observable<Hero[]> {
    this.loadingService.setLoading(true);
    return this.simulateDelay(1200).pipe(
      switchMap(() => {
        this.loadingService.setLoading(false);
        return this.heroesSubject.asObservable();
      })
    );
  }

  getSelectedHero(): Observable<Hero | null> {
    this.loadingService.setLoading(true);
    return this.simulateDelay(500).pipe(
      switchMap(() => {
        this.loadingService.setLoading(false);
        return this.selectedHeroSubject.asObservable();
      })
    );
  }

  setSelectedHero(hero: Hero | null): Observable<void> {
    this.loadingService.setLoading(true);
    return this.simulateDelay(300).pipe(
      switchMap(() => {
        this.selectedHeroSubject.next(hero);
        this.loadingService.setLoading(false);
        return new Observable<void>(observer => {
          observer.next();
          observer.complete();
        });
      })
    );
  }

  createHero(heroData: Omit<Hero, 'id'>): Observable<void> {
    this.loadingService.setLoading(true);
    return this.simulateDelay(2000).pipe(
      switchMap(() => {
        const newHero: Hero = {
          ...heroData,
          id: Date.now().toString()
        };
        this.heroes = [...this.heroes, newHero];
        this.heroesSubject.next(this.heroes);
        this.setSelectedHero(newHero);
        this.loadingService.setLoading(false);
        return new Observable<void>(observer => {
          observer.next();
          observer.complete();
        });
      })
    );
  }

  updateHero(heroId: string, heroData: Omit<Hero, 'id'>): Observable<void> {
    this.loadingService.setLoading(true);
    return this.simulateDelay(1500).pipe(
      switchMap(() => {
        this.heroes = this.heroes.map(hero => 
          hero.id === heroId ? { ...hero, ...heroData } : hero
        );
        this.heroesSubject.next(this.heroes);
        
        const updatedHero = this.heroes.find(hero => hero.id === heroId);
        if (updatedHero) {
          this.setSelectedHero(updatedHero);
        }
        this.loadingService.setLoading(false);
        return new Observable<void>(observer => {
          observer.next();
          observer.complete();
        });
      })
    );
  }

  deleteHero(heroId: string): Observable<void> {
    this.loadingService.setLoading(true);
    return this.simulateDelay(1000).pipe(
      switchMap(() => {
        this.heroes = this.heroes.filter(hero => hero.id !== heroId);
        this.heroesSubject.next(this.heroes);
        
        if (this.selectedHeroSubject.value?.id === heroId) {
          const newSelectedHero = this.heroes.find(hero => hero.id !== heroId) || null;
          this.setSelectedHero(newSelectedHero);
        }
        this.loadingService.setLoading(false);
        return new Observable<void>(observer => {
          observer.next();
          observer.complete();
        });
      })
    );
  }

  searchHeroes(query: string): Observable<Hero[]> {
    this.loadingService.setLoading(true);
    return this.simulateDelay(800).pipe(
      switchMap(() => {
        const searchTerm = query.toLowerCase();
        const results = this.heroes.filter(hero =>
          hero.name.toLowerCase().includes(searchTerm) ||
          hero.nationality.toLowerCase().includes(searchTerm) ||
          hero.powers.some(power => power.toLowerCase().includes(searchTerm)) ||
          (hero.alias && hero.alias.toLowerCase().includes(searchTerm)) ||
          (hero.team && hero.team.toLowerCase().includes(searchTerm))
        );
        this.loadingService.setLoading(false);
        return new Observable<Hero[]>(observer => {
          observer.next(results);
          observer.complete();
        });
      })
    );
  }
} 