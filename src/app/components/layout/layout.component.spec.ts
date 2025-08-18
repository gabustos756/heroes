import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { LayoutComponent } from './layout.component';
import { HeroService } from '../../services/hero.service';
import { LoadingService } from '../../services/loading.service';
import { BannerComponent } from '../banner/banner.component';
import { HeroDetailsComponent } from '../hero-details/hero-details.component';
import { HeroFormComponent } from '../hero-form/hero-form.component';
import { HeroListComponent } from '../hero-list/hero-list.component';
import { LoadingComponent } from '../loading/loading.component';
import { Hero } from '../../models/hero.interface';

describe('LayoutComponent', () => {
  let component: LayoutComponent;
  let fixture: ComponentFixture<LayoutComponent>;
  let mockHeroService: jasmine.SpyObj<HeroService>;
  let mockLoadingService: jasmine.SpyObj<LoadingService>;

  const mockHero: Hero = {
    id: '1',
    name: 'Spider-Man',
    alias: 'Peter Parker',
    powers: ['Web-slinging', 'Spider-sense'],
    nationality: 'American',
    team: 'Avengers',
    description: 'Friendly neighborhood Spider-Man',
    image: 'https://images.unsplash.com/photo-1601127939825-a1416676187c?w=400&h=400&fit=crop&crop=face'
  };

  beforeEach(async () => {
    const heroServiceSpy = jasmine.createSpyObj('HeroService', [
      'getHeroes', 'getSelectedHero', 'setSelectedHero', 'searchHeroes', 'deleteHero', 'createHero', 'updateHero'
    ]);
    const loadingServiceSpy = jasmine.createSpyObj('LoadingService', [], {
      loading$: of(false)
    });

    heroServiceSpy.getHeroes.and.returnValue(of([mockHero]));
    heroServiceSpy.getSelectedHero.and.returnValue(of(null));
    heroServiceSpy.setSelectedHero.and.returnValue(of(mockHero));
    heroServiceSpy.searchHeroes.and.returnValue(of([mockHero]));
    heroServiceSpy.deleteHero.and.returnValue(of(void 0));
    heroServiceSpy.createHero.and.returnValue(of(mockHero));
    heroServiceSpy.updateHero.and.returnValue(of(mockHero));

    await TestBed.configureTestingModule({
      imports: [
        LayoutComponent,
        FormsModule,
        BannerComponent,
        HeroDetailsComponent,
        HeroFormComponent,
        HeroListComponent,
        LoadingComponent
      ],
      providers: [
        { provide: HeroService, useValue: heroServiceSpy },
        { provide: LoadingService, useValue: loadingServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LayoutComponent);
    component = fixture.componentInstance;
    mockHeroService = TestBed.inject(HeroService) as jasmine.SpyObj<HeroService>;
    mockLoadingService = TestBed.inject(LoadingService) as jasmine.SpyObj<LoadingService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default signal values', () => {
    expect(component.heroes()).toEqual([mockHero]);
    expect(component.selectedHero()).toBeNull();
    expect(component.searchQuery()).toBe('');
    expect(component.isFormOpen()).toBe(false);
    expect(component.editingHero()).toBeNull();
    expect(component.filteredHeroes()).toEqual([mockHero]);
    expect(component.isLoading()).toBe(false);
  });

  it('should have correct computed counts', () => {
    expect(component.heroCount()).toBe(1);
    expect(component.filteredCount()).toBe(1);
  });

  it('should filter heroes when search query changes', (done) => {
    // Set up the search query
    component.onSearchInputChange('spider');
    
    // Wait for the debounce time (500ms) and then check
    setTimeout(() => {
      expect(mockHeroService.searchHeroes).toHaveBeenCalledWith('spider');
      done();
    }, 600);
  });

  it('should filter heroes locally when search query is empty', () => {
    // Set up empty search query
    component.onSearchInputChange('');
    
    // Should not call the service for empty queries
    expect(mockHeroService.searchHeroes).not.toHaveBeenCalled();
    
    // Should show all heroes
    expect(component.filteredHeroes()).toEqual([mockHero]);
  });

  it('should update search query signal when onSearchInputChange is called', () => {
    component.onSearchInputChange('test query');
    
    // The search query signal should be updated immediately
    expect(component.searchQuery()).toBe('test query');
  });

  it('should emit to search subject when onSearchInputChange is called', () => {
    // Access the private searchSubject for testing
    const searchSubject = (component as any).searchSubject;
    spyOn(searchSubject, 'next');
    
    component.onSearchInputChange('test');
    
    expect(searchSubject.next).toHaveBeenCalledWith('test');
  });

  it('should select hero when onHeroSelect is called', () => {
    component.onHeroSelect(mockHero);
    expect(mockHeroService.setSelectedHero).toHaveBeenCalledWith(mockHero);
  });

  it('should open form for editing when onHeroEdit is called', () => {
    component.onHeroEdit(mockHero);
    expect(component.editingHero()).toBe(mockHero);
    expect(component.isFormOpen()).toBe(true);
  });

  it('should delete hero when onHeroDelete is called', () => {
    component.onHeroDelete('1');
    expect(mockHeroService.deleteHero).toHaveBeenCalledWith('1');
  });

  it('should open form for creating new hero', (done) => {
    component.onCreateHero();
    
    setTimeout(() => {
      expect(component.editingHero()).toBeNull();
      expect(component.isFormOpen()).toBe(true);
      done();
    }, 1000);
  });

  it('should close form when onFormClose is called', () => {
    component.onFormClose();
    expect(component.isFormOpen()).toBe(false);
    expect(component.editingHero()).toBeNull();
  });

  it('should update hero when form is submitted with existing hero', () => {
    component.onHeroEdit(mockHero);
    const updateData = { name: 'Updated Spider-Man', alias: 'Peter Parker', powers: [], nationality: 'American', team: 'Avengers', description: 'Updated description', image: 'updated.jpg' };
    
    component.onFormSubmit(updateData);
    expect(mockHeroService.updateHero).toHaveBeenCalledWith('1', updateData);
  });

  it('should create hero when form is submitted without existing hero', () => {
    const createData = { name: 'New Hero', alias: 'New Alias', powers: [], nationality: 'Unknown', team: 'None', description: 'New hero description', image: 'new.jpg' };
    
    component.onFormSubmit(createData);
    expect(mockHeroService.createHero).toHaveBeenCalledWith(createData);
  });
});
