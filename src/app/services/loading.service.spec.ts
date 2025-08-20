import { TestBed } from '@angular/core/testing';
import { LoadingService } from './loading.service';

describe('LoadingService', () => {
  let service: LoadingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoadingService]
    });
    service = TestBed.inject(LoadingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have loading$ observable', () => {
    expect(service.loading$).toBeTruthy();
  });

  it('should have initial loading state as false', () => {
    expect(service.getLoading()).toBe(false);
  });

  it('should set loading state correctly', () => {
    service.setLoading(true);
    expect(service.getLoading()).toBe(true);
    
    service.setLoading(false);
    expect(service.getLoading()).toBe(false);
  });

  it('should emit loading state changes through observable', () => {
    service.loading$.subscribe(loading => {
      expect(loading).toBe(false);
    });

    service.setLoading(true);
    service.loading$.subscribe(loading => {
      expect(loading).toBe(true);
    });
  });

  it('should emit multiple loading state changes', () => {
    expect(service.getLoading()).toBe(false);
    
    service.setLoading(true);
    expect(service.getLoading()).toBe(true);
    
    service.setLoading(false);
    expect(service.getLoading()).toBe(false);
    
    service.setLoading(true);
    expect(service.getLoading()).toBe(true);
  });

  it('should have loading signal', () => {
    expect(service.loading).toBeTruthy();
  });

  it('should have isLoading computed property', () => {
    expect(service.isLoading()).toBe(false);
    service.setLoading(true);
    expect(service.isLoading()).toBe(true);
  });
}); 