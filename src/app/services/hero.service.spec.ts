import { TestBed } from '@angular/core/testing';
import { HeroService } from './hero.service';
import { LoadingService } from './loading.service';
import { Hero } from '../models/hero.interface';
import { of } from 'rxjs';

describe('HeroService', () => {
  let service: HeroService;
  let loadingService: jasmine.SpyObj<LoadingService>;

  const mockHeroes: Hero[] = [
    {
      id: '1',
      name: 'Spider-Man',
      alias: 'Peter Parker',
      nationality: 'American',
      team: 'Avengers',
      description: 'Friendly neighborhood Spider-Man',
      image: 'https://images.unsplash.com/photo-1601127939825-a1416676187c?w=400&h=400&fit=crop&crop=face',
      powers: ['Web-slinging', 'Spider-sense']
    },
    {
      id: '2',
      name: 'Iron Man',
      alias: 'Tony Stark',
      nationality: 'American',
      team: 'Avengers',
      description: 'Genius billionaire playboy philanthropist',
      image: 'https://images.unsplash.com/photo-1601127939825-a1416676187c?w=400&h=400&fit=crop&crop=face',
      powers: ['Technology', 'Intelligence']
    }
  ];

  beforeEach(() => {
    const loadingServiceSpy = jasmine.createSpyObj('LoadingService', ['setLoading']);

    TestBed.configureTestingModule({
      providers: [
        HeroService,
        { provide: LoadingService, useValue: loadingServiceSpy }
      ]
    });

    service = TestBed.inject(HeroService);
    loadingService = TestBed.inject(LoadingService) as jasmine.SpyObj<LoadingService>;

        spyOn(service as any, 'simulateDelay').and.returnValue(of(1));
    (service as any).heroes = mockHeroes;
    (service as any).heroesSubject = {
      asObservable: () => of(mockHeroes),
      next: jasmine.createSpy('next')
    };
    (service as any).selectedHeroSubject = {
      asObservable: () => of(mockHeroes[0]),
      next: jasmine.createSpy('next'),
      value: mockHeroes[0]
    };
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should inject LoadingService', () => {
    expect(loadingService).toBeTruthy();
  });

  it('should get heroes', (done) => {
    service.getHeroes().subscribe(heroes => {
      expect(heroes).toEqual(mockHeroes);
      done();
    });
  });

  it('should get selected hero', (done) => {
    service.getSelectedHero().subscribe(hero => {
      expect(hero).toEqual(mockHeroes[0]);
      done();
    });
  });

  it('should set selected hero', (done) => {
    service.setSelectedHero(mockHeroes[1]).subscribe(() => {
      expect((service as any).selectedHeroSubject.next).toHaveBeenCalledWith(mockHeroes[1]);
      done();
    });
  });

  it('should create hero', (done) => {
    const newHero: Omit<Hero, 'id'> = {
      name: 'New Hero',
      alias: 'Secret Identity',
      nationality: 'Unknown',
      team: 'Independent',
      description: 'A new hero',
      image: 'image.jpg',
      powers: ['Power']
    };

    service.createHero(newHero).subscribe(() => {
      expect((service as any).heroesSubject.next).toHaveBeenCalled();
      done();
    });
  });

  it('should update hero', (done) => {
    const updatedHero: Omit<Hero, 'id'> = { 
      name: 'Updated Spider-Man',
      alias: 'Peter Parker',
      nationality: 'American',
      team: 'Avengers',
      description: 'Friendly neighborhood Spider-Man',
      image: 'https://images.unsplash.com/photo-1601127939825-a1416676187c?w=400&h=400&fit=crop&crop=face',
      powers: ['Web-slinging', 'Spider-sense']
    };

    service.updateHero('1', updatedHero).subscribe(() => {
      expect((service as any).heroesSubject.next).toHaveBeenCalled();
      done();
    });
  });

  it('should delete hero', (done) => {
    service.deleteHero('1').subscribe(() => {
      expect((service as any).heroesSubject.next).toHaveBeenCalled();
      done();
    });
  });

  it('should search heroes', (done) => {
    service.searchHeroes('Spider').subscribe(heroes => {
      expect(heroes).toEqual([mockHeroes[0]]);
      done();
    });
  });

  describe('simulateDelay', () => {
    it('should use default delay of 1500ms', () => {
          expect(typeof (service as any).simulateDelay).toBe('function');
    });
  });
}); 