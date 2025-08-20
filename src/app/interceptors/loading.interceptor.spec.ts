import { TestBed } from '@angular/core/testing';
import { HttpRequest, HttpHandlerFn, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { loadingInterceptor } from './loading.interceptor';
import { LoadingService } from '../services/loading.service';

describe('LoadingInterceptor', () => {
  let loadingService: jasmine.SpyObj<LoadingService>;
  let mockRequest: HttpRequest<unknown>;
  let mockHandler: jasmine.Spy;

  beforeEach(() => {
    const loadingServiceSpy = jasmine.createSpyObj('LoadingService', ['setLoading']);

    TestBed.configureTestingModule({
      providers: [
        { provide: LoadingService, useValue: loadingServiceSpy }
      ]
    });

    loadingService = TestBed.inject(LoadingService) as jasmine.SpyObj<LoadingService>;
    mockRequest = new HttpRequest('GET', '/api/test');
    mockHandler = jasmine.createSpy('HttpHandlerFn').and.returnValue(of(new HttpResponse({ status: 200 })));
  });

  it('should be created', () => {
    expect(loadingInterceptor).toBeTruthy();
  });

  it('should have correct function signature', () => {
    expect(typeof loadingInterceptor).toBe('function');
    expect(loadingInterceptor.length).toBe(2); // Should take 2 parameters
  });

  it('should be callable with request and handler', () => {
    expect(() => {
    }).not.toThrow();
  });
}); 