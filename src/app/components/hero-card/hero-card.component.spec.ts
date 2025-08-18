import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroCardComponent } from './hero-card.component';
import { Hero } from '../../models/hero.interface';

describe('HeroCardComponent', () => {
  let component: HeroCardComponent;
  let fixture: ComponentFixture<HeroCardComponent>;

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
    await TestBed.configureTestingModule({
      imports: [HeroCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeroCardComponent);
    component = fixture.componentInstance;
    
    // Set the required input
    component.hero = mockHero;
    component.isSelected = false;
    
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display hero information correctly', () => {
    const titleElement = fixture.nativeElement.querySelector('.hero-card__title');
    const aliasElement = fixture.nativeElement.querySelector('.hero-card__alias');
    const nationalityElement = fixture.nativeElement.querySelector('.hero-card__nationality');
    const teamElement = fixture.nativeElement.querySelector('.hero-card__team');
    
    expect(titleElement.textContent).toContain('Spider-Man');
    expect(aliasElement.textContent).toContain('Peter Parker');
    expect(nationalityElement.textContent).toContain('American');
    expect(teamElement.textContent).toContain('Avengers');
  });

  it('should display hero image', () => {
    const imageElement = fixture.nativeElement.querySelector('.hero-card__image');
    expect(imageElement.src).toContain('unsplash.com');
    expect(imageElement.alt).toBe('Spider-Man');
  });

  it('should show HERO badge', () => {
    const badgeElement = fixture.nativeElement.querySelector('.hero-card__badge');
    expect(badgeElement.textContent).toContain('HERO');
  });

  it('should have edit and delete buttons', () => {
    const editButton = fixture.nativeElement.querySelector('.hero-card__button--edit');
    const deleteButton = fixture.nativeElement.querySelector('.hero-card__button--delete');
    
    expect(editButton).toBeTruthy();
    expect(deleteButton).toBeTruthy();
    expect(editButton.textContent).toContain('Edit');
    expect(deleteButton.textContent).toContain('Delete');
  });

  it('should emit edit event when edit button is clicked', () => {
    spyOn(component.onEdit, 'emit');
    const editButton = fixture.nativeElement.querySelector('.hero-card__button--edit');
    
    editButton.click();
    
    expect(component.onEdit.emit).toHaveBeenCalledWith(mockHero);
  });

  it('should emit delete event when delete button is clicked', () => {
    spyOn(component.onDelete, 'emit');
    const deleteButton = fixture.nativeElement.querySelector('.hero-card__button--delete');
    
    deleteButton.click();
    
    expect(component.onDelete.emit).toHaveBeenCalledWith('1');
  });

  it('should emit card click event when card is clicked', () => {
    spyOn(component.onSelect, 'emit');
    const cardElement = fixture.nativeElement.querySelector('.hero-card');
    
    cardElement.click();
    
    expect(component.onSelect.emit).toHaveBeenCalledWith(mockHero);
  });

  it('should apply selected styles when isSelected is true', () => {
    component.isSelected = true;
    fixture.detectChanges();
    
    const cardElement = fixture.nativeElement.querySelector('.hero-card');
    expect(cardElement.classList.contains('hero-card--selected')).toBe(true);
  });

  it('should apply unselected styles when isSelected is false', () => {
    component.isSelected = false;
    fixture.detectChanges();
    
    const cardElement = fixture.nativeElement.querySelector('.hero-card');
    expect(cardElement.classList.contains('hero-card--unselected')).toBe(true);
  });
});
