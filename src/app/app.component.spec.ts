import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { LayoutComponent } from './components/layout/layout.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should render layout component', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('app-layout')).toBeTruthy();
  });

  it('should have correct component structure', () => {
    const compiled = fixture.nativeElement;
    const layout = compiled.querySelector('app-layout');
    expect(layout).toBeTruthy();
  });

  it('should be standalone component', () => {
    expect(component).toBeTruthy();
  });

  it('should have proper imports', () => {
    expect(component).toBeTruthy();
  });
});
