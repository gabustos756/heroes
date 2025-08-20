import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroFormComponent } from './hero-form.component';
import { Hero } from '../../models/hero.interface';

describe('HeroFormComponent', () => {
  let component: HeroFormComponent;
  let fixture: ComponentFixture<HeroFormComponent>;

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
      imports: [HeroFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeroFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default input values', () => {
    expect(component.isOpen).toBe(false);
    expect(component.hero).toBeNull();
  });

  it('should initialize form with empty values when no hero is provided', () => {
    expect(component.name).toBe('');
    expect(component.alias).toBe('');
    expect(component.nationality).toBe('');
    expect(component.team).toBe('');
    expect(component.description).toBe('');
    expect(component.image).toBe('');
    expect(component.powers).toEqual([]);
    expect(component.currentPower).toBe('');
  });

  it('should populate form when hero input is provided', () => {
    component.hero = mockHero;
    component.ngOnChanges({
      hero: { currentValue: mockHero, previousValue: null, firstChange: true, isFirstChange: () => true }
    });
    
    expect(component.name).toBe('Spider-Man');
    expect(component.alias).toBe('Peter Parker');
    expect(component.nationality).toBe('American');
    expect(component.team).toBe('Avengers');
    expect(component.description).toBe('Friendly neighborhood Spider-Man');
    expect(component.image).toBe('https://images.unsplash.com/photo-1601127939825-a1416676187c?w=400&h=400&fit=crop&crop=face');
    expect(component.powers).toEqual(['Web-slinging', 'Spider-sense']);
  });

  it('should add power when addPower is called with valid input', () => {
    component.currentPower = 'Super Strength';
    component.addPower();
    
    expect(component.powers).toContain('Super Strength');
    expect(component.currentPower).toBe('');
  });

  it('should not add duplicate powers', () => {
    component.powers = ['Super Strength'];
    component.currentPower = 'Super Strength';
    component.addPower();
    
    expect(component.powers).toEqual(['Super Strength']);
  });

  it('should not add empty powers', () => {
    component.currentPower = '   ';
    component.addPower();
    
    expect(component.powers).toEqual([]);
  });

  it('should remove power when removePower is called', () => {
    component.powers = ['Super Strength', 'Flight'];
    component.removePower('Super Strength');
    
    expect(component.powers).toEqual(['Flight']);
  });

  it('should add power on Enter key press', () => {
    const event = new KeyboardEvent('keydown', { key: 'Enter' });
    spyOn(event, 'preventDefault');
    component.currentPower = 'Super Speed';
    
    component.onKeyDown(event);
    
    expect(event.preventDefault).toHaveBeenCalled();
    expect(component.powers).toContain('Super Speed');
  });

  it('should not add power on other key press', () => {
    const event = new KeyboardEvent('keydown', { key: 'Space' });
    component.currentPower = 'Super Speed';
    
    component.onKeyDown(event);
    
    expect(component.powers).toEqual([]);
  });

  it('should emit close event when closeForm is called', () => {
    spyOn(component.onClose, 'emit');
    
    component.closeForm();
    
    expect(component.onClose.emit).toHaveBeenCalled();
  });

  it('should validate form correctly', () => {
    // Invalid form - missing required fields
    expect(component.isFormValid()).toBe(false);
    
    // Valid form
    component.name = 'Test Hero';
    component.nationality = 'Test Country';
    component.image = 'test-image.jpg';
    component.description = 'Test description';
    component.powers = ['Test Power'];
    
    expect(component.isFormValid()).toBe(true);
  });

  it('should emit submit event with hero data when form is valid', () => {
    spyOn(component.onSubmit, 'emit');
    spyOn(component, 'closeForm');
    
    component.name = 'Test Hero';
    component.nationality = 'Test Country';
    component.image = 'test-image.jpg';
    component.description = 'Test description';
    component.powers = ['Test Power'];
    
    component.handleSubmit();
    
    expect(component.onSubmit.emit).toHaveBeenCalledWith({
      name: 'Test Hero',
      alias: '',
      nationality: 'Test Country',
      team: '',
      description: 'Test description',
      image: 'test-image.jpg',
      powers: ['Test Power']
    });
    expect(component.closeForm).toHaveBeenCalled();
  });

  it('should not emit submit event when form is invalid', () => {
    spyOn(component.onSubmit, 'emit');
    
    component.handleSubmit();
    
    expect(component.onSubmit.emit).not.toHaveBeenCalled();
  });

  it('should track powers by index', () => {
    expect(component.trackByIndex(0)).toBe(0);
    expect(component.trackByIndex(5)).toBe(5);
  });

  it('should reset form when hero changes', () => {
    component.hero = mockHero;
    component.ngOnChanges({
      hero: { currentValue: mockHero, previousValue: null, firstChange: true, isFirstChange: () => true }
    });
    
    expect(component.name).toBe('Spider-Man');
    
    // Change hero to null
    component.hero = null;
    component.ngOnChanges({
      hero: { currentValue: null, previousValue: mockHero, firstChange: false, isFirstChange: () => false }
    });
    
    expect(component.name).toBe('');
  });
});
