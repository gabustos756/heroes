import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BannerComponent } from './banner.component';

describe('BannerComponent', () => {
  let component: BannerComponent;
  let fixture: ComponentFixture<BannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BannerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have bannerImage property with correct URL', () => {
    expect(component.bannerImage).toBe('https://images.unsplash.com/photo-1737648141387-72df45763afb?w=1200&h=400&fit=crop');
  });

  it('should display banner image', () => {
    const compiled = fixture.nativeElement;
    const img = compiled.querySelector('img');
    expect(img).toBeTruthy();
    expect(img.src).toContain('unsplash.com');
    expect(img.alt).toBe('Marvel superheroes banner');
  });

  it('should display banner title', () => {
    const compiled = fixture.nativeElement;
    const title = compiled.querySelector('h1');
    expect(title).toBeTruthy();
    expect(title.textContent.trim()).toBe('MARVEL HEROES');
  });

  it('should display banner subtitle', () => {
    const compiled = fixture.nativeElement;
    const subtitle = compiled.querySelector('p');
    expect(subtitle).toBeTruthy();
    expect(subtitle.textContent.trim()).toBe('Discover the legendary superheroes of the Marvel Universe');
  });

  it('should display decoration text', () => {
    const compiled = fixture.nativeElement;
    const decoration = compiled.querySelector('.banner__decoration-text');
    expect(decoration).toBeTruthy();
    expect(decoration.textContent.trim()).toBe('Earth\'s Mightiest Heroes');
  });

  it('should have overlay with correct styling', () => {
    const compiled = fixture.nativeElement;
    const overlay = compiled.querySelector('.banner__overlay');
    expect(overlay).toBeTruthy();
  });

  it('should have content container', () => {
    const compiled = fixture.nativeElement;
    const content = compiled.querySelector('.banner__content');
    expect(content).toBeTruthy();
  });

  it('should have text container', () => {
    const compiled = fixture.nativeElement;
    const textContainer = compiled.querySelector('.banner__text-container');
    expect(textContainer).toBeTruthy();
  });

  it('should have decoration lines', () => {
    const compiled = fixture.nativeElement;
    const lines = compiled.querySelectorAll('.banner__decoration-line');
    expect(lines.length).toBe(2);
  });

  it('should have correct banner structure', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.banner')).toBeTruthy();
    expect(compiled.querySelector('.banner__content')).toBeTruthy();
  });
}); 