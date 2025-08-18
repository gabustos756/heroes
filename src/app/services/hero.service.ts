import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Hero } from '../models/hero.interface';
import { LoadingService } from './loading.service';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  constructor(private loadingService: LoadingService) {}
  
  private heroes: Hero[] = [
    {
      id: '1',
      name: 'Spider-Man',
      alias: 'Peter Parker',
      powers: ['Wall-crawling', 'Spider-sense', 'Super strength', 'Web-shooting'],
      nationality: 'American',
      team: 'Avengers',
      description: 'Bitten by a radioactive spider, Peter Parker gained incredible spider-like abilities. With great power comes great responsibility, and Spider-Man protects New York City from criminals and super-villains alike.',
      image: 'https://images.unsplash.com/photo-1601127939825-a1416676187c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGlkZXJtYW4lMjBzdXBlcmhlcm98ZW58MXx8fHwxNzU1MjkzMDA2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      id: '2',
      name: 'Thor',
      alias: 'God of Thunder',
      powers: ['Super strength', 'Weather control', 'Mjolnir mastery', 'Flight'],
      nationality: 'Asgardian',
      team: 'Avengers',
      description: 'The Asgardian God of Thunder, Thor wields the mystical hammer Mjolnir and commands the power of lightning. As a founding member of the Avengers, he protects both Earth and the Nine Realms.',
      image: 'https://images.unsplash.com/photo-1559535332-db9971090158?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0aG9yJTIwc3VwZXJoZXJvfGVufDF8fHx8MTc1NTI5MzAwN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      id: '3',
      name: 'Captain America',
      alias: 'Steve Rogers',
      powers: ['Enhanced strength', 'Enhanced speed', 'Vibranium shield', 'Tactical genius'],
      nationality: 'American',
      team: 'Avengers',
      description: 'Enhanced by the Super Soldier Serum during World War II, Steve Rogers became Captain America. Armed with his indestructible vibranium shield, he leads the Avengers as a symbol of freedom and justice.',
      image: 'https://images.unsplash.com/photo-1573405202162-52ba7a3e0377?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXB0YWluJTIwYW1lcmljYSUyMHN1cGVyaGVyb3xlbnwxfHx8fDE3NTUyOTMwMDd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      id: '4',
      name: 'Black Widow',
      alias: 'Natasha Romanoff',
      powers: ['Expert martial artist', 'Master spy', 'Weapons expert', 'Enhanced agility'],
      nationality: 'Russian',
      team: 'Avengers',
      description: 'A former Russian spy turned S.H.I.E.L.D. agent, Natasha Romanoff is a master assassin and martial artist. Despite having no superpowers, she more than holds her own alongside gods and super soldiers.',
      image: 'https://images.unsplash.com/photo-1722264485359-10b77086900d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibGFjayUyMHdpZG93JTIwc3VwZXJoZXJvfGVufDF8fHx8MTc1NTI5MzAwOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      id: '5',
      name: 'Iron Man',
      alias: 'Tony Stark',
      powers: ['Genius intellect', 'Advanced technology', 'Powered armor', 'Flight'],
      nationality: 'American',
      team: 'Avengers',
      description: 'Billionaire genius Tony Stark built a powered suit of armor to escape captivity and became Iron Man. Using his wealth and intellect, he continues to upgrade his technology to protect the world.',
      image: 'https://images.unsplash.com/photo-1650610276333-cb64e6724519?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpcm9uJTIwbWFuJTIwc3VwZXJoZXJvfGVufDF8fHx8MTc1NTI5MzAwOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    }
  ];

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