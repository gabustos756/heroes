import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HeroListComponent } from './hero-list.component';
import { HeroCardComponent } from '../hero-card/hero-card.component';
import { LoadingComponent } from '../loading/loading.component';
import { AlertModalComponent } from '../alert-modal/alert-modal.component';
import { Hero } from '../../models/hero.interface';

describe('HeroListComponent', () => {
  let component: HeroListComponent;
  let fixture: ComponentFixture<HeroListComponent>;

  const mockHero: Hero = {
    id: '1',
    name: 'Spider-Man',
    alias: 'Peter Parker',
    powers: ['Web-slinging', 'Spider-sense'],
    nationality: 'American',
    team: 'Avengers',
    description: 'Friendly neighborhood Spider-Man',
    image: 'spiderman.jpg'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HeroListComponent,
        FormsModule,
        HeroCardComponent,
        LoadingComponent,
        AlertModalComponent
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HeroListComponent);
    component = fixture.componentInstance;
    
    component.heroes = [mockHero];
    component.filteredHeroes = [mockHero];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display hero count using computed signals', () => {
    const countElement = fixture.nativeElement.querySelector('.hero-count');
    expect(countElement.textContent).toContain('Showing 1 of 1 heroes');
  });

  it('should have correct computed values', () => {
    expect(component.heroCount()).toBe(1);
    expect(component.filteredCount()).toBe(1);
    expect(component.hasHeroes()).toBe(true);
  });

  it('should emit search change event', () => {
    spyOn(component.searchChange, 'emit');
    component.searchQuery = 'test';
    component.onSearchChange();
    expect(component.searchChange.emit).toHaveBeenCalledWith('test');
  });

  it('should emit create hero event', () => {
    spyOn(component.createHero, 'emit');
    component.onCreateHero();
    expect(component.createHero.emit).toHaveBeenCalled();
  });

  it('should emit hero select event', () => {
    spyOn(component.heroSelect, 'emit');
    component.onHeroSelect(mockHero);
    expect(component.heroSelect.emit).toHaveBeenCalledWith(mockHero);
  });

  it('should emit hero edit event', () => {
    spyOn(component.heroEdit, 'emit');
    component.onHeroEdit(mockHero);
    expect(component.heroEdit.emit).toHaveBeenCalledWith(mockHero);
  });

  it('should show delete confirmation modal when onHeroDelete is called', () => {
    component.onHeroDelete(mockHero);
    
    expect(component.showDeleteModal).toBe(true);
    expect(component.heroToDelete).toBe(mockHero);
    expect(component.deleteModalData.message).toContain('Spider-Man');
  });

  it('should close delete modal when onDeleteCancel is called', () => {
    component.showDeleteModal = true;
    component.heroToDelete = mockHero;
    
    component.onDeleteCancel();
    
    expect(component.showDeleteModal).toBe(false);
    expect(component.heroToDelete).toBeNull();
  });

  it('should close delete modal when onDeleteClose is called', () => {
    component.showDeleteModal = true;
    component.heroToDelete = mockHero;
    
    component.onDeleteClose();
    
    expect(component.showDeleteModal).toBe(false);
    expect(component.heroToDelete).toBeNull();
  });

  it('should emit hero delete event and close modal when onDeleteConfirm is called', () => {
    spyOn(component.heroDelete, 'emit');
    component.showDeleteModal = true;
    component.heroToDelete = mockHero;
    
    component.onDeleteConfirm();
    
    expect(component.heroDelete.emit).toHaveBeenCalledWith('1');
    expect(component.showDeleteModal).toBe(false);
    expect(component.heroToDelete).toBeNull();
  });

  it('should not emit delete event if no hero is selected', () => {
    spyOn(component.heroDelete, 'emit');
    component.showDeleteModal = true;
    component.heroToDelete = null;
    
    component.onDeleteConfirm();
    
    expect(component.heroDelete.emit).not.toHaveBeenCalled();
  });

  it('should update search placeholder based on query', () => {
    expect(component.searchPlaceholder()).toBe('Search heroes, powers, teams...');
    
    component.searchQuery = 'spider';
    expect(component.searchPlaceholder()).toBe('Searching for "spider"...');
  });

  it('should handle empty heroes array', () => {
    component.heroes = [];
    component.filteredHeroes = [];
    
    expect(component.heroCount()).toBe(0);
    expect(component.filteredCount()).toBe(0);
    expect(component.hasHeroes()).toBe(false);
  });

  it('should display alert-modal component when showDeleteModal is true', () => {
    component.showDeleteModal = true;
    component.heroToDelete = mockHero;
    fixture.detectChanges();
    
    const alertModal = fixture.nativeElement.querySelector('app-alert-modal');
    expect(alertModal).toBeTruthy();
  });

  it('should not display alert-modal component when showDeleteModal is false', () => {
    component.showDeleteModal = false;
    fixture.detectChanges();
    
    const alertModal = fixture.nativeElement.querySelector('app-alert-modal');
    expect(alertModal).toBeFalsy();
  });
}); 