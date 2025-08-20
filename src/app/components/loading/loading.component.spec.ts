import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoadingComponent } from './loading.component';

describe('LoadingComponent', () => {
  let component: LoadingComponent;
  let fixture: ComponentFixture<LoadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoadingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default input values', () => {
    expect(component.fullScreen).toBe(false);
    expect(component.size).toBe('medium');
    expect(component.text).toBe('Loading...');
  });

  it('should display loading text', () => {
    const compiled = fixture.nativeElement;
    const textElement = compiled.querySelector('.loading-text');
    expect(textElement).toBeTruthy();
    expect(textElement.textContent.trim()).toBe('Loading...');
  });

  it('should display spinner', () => {
    const compiled = fixture.nativeElement;
    const spinner = compiled.querySelector('.spinner');
    expect(spinner).toBeTruthy();
  });

  it('should apply fullScreen class when fullScreen is true', () => {
    component.fullScreen = true;
    fixture.detectChanges();
    
    const compiled = fixture.nativeElement;
    const container = compiled.querySelector('.loading-container');
    expect(container.classList.contains('fullscreen')).toBe(true);
  });

  it('should apply size class based on size input', () => {
    component.size = 'large';
    fixture.detectChanges();
    
    const compiled = fixture.nativeElement;
    const container = compiled.querySelector('.loading-container');
    expect(container.classList.contains('size-large')).toBe(true);
  });

  it('should update text when text input changes', () => {
    component.text = 'Please wait...';
    fixture.detectChanges();
    
    const compiled = fixture.nativeElement;
    const textElement = compiled.querySelector('.loading-text');
    expect(textElement.textContent.trim()).toBe('Please wait...');
  });

  it('should have correct component structure', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.loading-container')).toBeTruthy();
    expect(compiled.querySelector('.loading-spinner')).toBeTruthy();
  });

  it('should apply different sizes correctly', () => {
    const sizes: ('small' | 'medium' | 'large')[] = ['small', 'medium', 'large'];
    
    sizes.forEach(size => {
      component.size = size;
      fixture.detectChanges();
      
      const compiled = fixture.nativeElement;
      const container = compiled.querySelector('.loading-container');
      expect(container.classList.contains(`size-${size}`)).toBe(true);
    });
  });
}); 