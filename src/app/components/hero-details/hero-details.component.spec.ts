import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroDetailsComponent } from './hero-details.component';
import { Hero } from '../../models/hero.interface';

describe('HeroDetailsComponent', () => {
  let component: HeroDetailsComponent;
  let fixture: ComponentFixture<HeroDetailsComponent>;

  const mockHero: Hero = {
    id: '1',
    name: 'Spider-Man',
    alias: 'Peter Parker',
    nationality: 'American',
    team: 'Avengers',
    description: 'Friendly neighborhood Spider-Man',
    image: 'https://images.unsplash.com/photo-1601127939825-a1416676187c?w=400&h=400&fit=crop&crop=face',
    powers: ['Web-slinging', 'Spider-sense']
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeroDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display no hero selected message when hero is null', () => {
    component.hero = null;
    fixture.detectChanges();
    
    const compiled = fixture.nativeElement;
    const message = compiled.querySelector('h3');
    expect(message).toBeTruthy();
    expect(message.textContent.trim()).toBe('No Hero Selected');
  });

  it('should display hero profile when hero is provided', () => {
    component.hero = mockHero;
    fixture.detectChanges();
    
    const compiled = fixture.nativeElement;
    const profile = compiled.querySelector('.card');
    expect(profile).toBeTruthy();
  });

  it('should display hero name correctly', () => {
    component.hero = mockHero;
    fixture.detectChanges();
    
    const compiled = fixture.nativeElement;
    const heroName = compiled.querySelectorAll('h2')[1];
    expect(heroName.textContent.trim()).toBe('Spider-Man');
  });

  it('should display hero alias', () => {
    component.hero = mockHero;
    fixture.detectChanges();
    
    const compiled = fixture.nativeElement;
    const alias = compiled.querySelector('p');
    expect(alias.textContent.trim()).toBe('"Peter Parker"');
  });

  it('should display hero image', () => {
    component.hero = mockHero;
    fixture.detectChanges();
    
    const compiled = fixture.nativeElement;
    const img = compiled.querySelector('img');
    expect(img).toBeTruthy();
    expect(img.src).toContain('unsplash.com');
  });

  it('should display hero nationality', () => {
    component.hero = mockHero;
    fixture.detectChanges();
    
    const compiled = fixture.nativeElement;
    const nationality = compiled.querySelector('.bg-muted-50 p');
    expect(nationality.textContent.trim()).toBe('American');
  });

  it('should display hero team', () => {
    component.hero = mockHero;
    fixture.detectChanges();
    
    const compiled = fixture.nativeElement;
    const team = compiled.querySelectorAll('.bg-muted-50 p')[1];
    expect(team.textContent.trim()).toBe('Avengers');
  });

  it('should display hero powers', () => {
    component.hero = mockHero;
    fixture.detectChanges();
    
    const compiled = fixture.nativeElement;
    const powers = compiled.querySelectorAll('.badge');
    expect(powers.length).toBe(2);
    expect(powers[0].textContent.trim()).toBe('Web-slinging');
    expect(powers[1].textContent.trim()).toBe('Spider-sense');
  });

  it('should display hero description', () => {
    component.hero = mockHero;
    fixture.detectChanges();
    
    const compiled = fixture.nativeElement;
    const description = compiled.querySelector('.bg-muted-30 p');
    expect(description.textContent.trim()).toBe('Friendly neighborhood Spider-Man');
  });

  it('should display copyright notice', () => {
    component.hero = mockHero;
    fixture.detectChanges();
    
    const compiled = fixture.nativeElement;
    const copyright = compiled.querySelector('.text-sm.text-muted-foreground');
    expect(copyright.textContent.trim()).toBe('© MARVEL. All rights reserved.');
  });

  it('should track powers by index', () => {
    expect(component.trackByIndex(0)).toBe(0);
    expect(component.trackByIndex(5)).toBe(5);
  });

  it('should have correct component structure', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.card')).toBeTruthy();
  });
});
