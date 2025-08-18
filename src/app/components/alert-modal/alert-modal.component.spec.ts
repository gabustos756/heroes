import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AlertModalComponent, AlertModalData } from './alert-modal.component';

describe('AlertModalComponent', () => {
  let component: AlertModalComponent;
  let fixture: ComponentFixture<AlertModalComponent>;

  const mockData: AlertModalData = {
    title: 'Delete Hero',
    message: 'Are you sure you want to delete <strong>Spider-Man</strong>?',
    confirmText: 'Delete',
    cancelText: 'Cancel',
    type: 'danger'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlertModalComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(AlertModalComponent);
    component = fixture.componentInstance;
    component.data = mockData;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not display modal when isOpen is false', () => {
    component.isOpen = false;
    fixture.detectChanges();
    
    const modal = fixture.nativeElement.querySelector('.modal-overlay');
    expect(modal).toBeFalsy();
  });

  it('should display modal when isOpen is true', () => {
    component.isOpen = true;
    fixture.detectChanges();
    
    const modal = fixture.nativeElement.querySelector('.modal-overlay');
    expect(modal).toBeTruthy();
  });

  it('should display correct title and message', () => {
    component.isOpen = true;
    fixture.detectChanges();
    
    const title = fixture.nativeElement.querySelector('h3');
    const message = fixture.nativeElement.querySelector('.modal-body p');
    
    expect(title.textContent).toContain('Delete Hero');
    expect(message.innerHTML).toContain('Spider-Man');
  });

  it('should emit confirm event when confirm button is clicked', () => {
    spyOn(component.confirm, 'emit');
    component.isOpen = true;
    fixture.detectChanges();
    
    const confirmBtn = fixture.nativeElement.querySelector('.btn:not(.btn-secondary)');
    confirmBtn.click();
    
    expect(component.confirm.emit).toHaveBeenCalled();
  });

  it('should emit cancel event when cancel button is clicked', () => {
    spyOn(component.cancel, 'emit');
    component.isOpen = true;
    fixture.detectChanges();
    
    const cancelBtn = fixture.nativeElement.querySelector('.btn-secondary');
    cancelBtn.click();
    
    expect(component.cancel.emit).toHaveBeenCalled();
  });

  it('should emit close event when close button is clicked', () => {
    spyOn(component.close, 'emit');
    component.isOpen = true;
    fixture.detectChanges();
    
    const closeBtn = fixture.nativeElement.querySelector('.close-btn');
    closeBtn.click();
    
    expect(component.close.emit).toHaveBeenCalled();
  });

  it('should emit close event when overlay is clicked', () => {
    spyOn(component.close, 'emit');
    component.isOpen = true;
    fixture.detectChanges();
    
    const overlay = fixture.nativeElement.querySelector('.modal-overlay');
    overlay.click();
    
    expect(component.close.emit).toHaveBeenCalled();
  });

  it('should not emit close event when modal content is clicked', () => {
    spyOn(component.close, 'emit');
    component.isOpen = true;
    fixture.detectChanges();
    
    const modalContent = fixture.nativeElement.querySelector('.modal-dialog');
    modalContent.click();
    
    expect(component.close.emit).not.toHaveBeenCalled();
  });

  it('should apply correct button styles based on type', () => {
    component.isOpen = true;
    component.data.type = 'danger';
    fixture.detectChanges();
    
    const confirmBtn = fixture.nativeElement.querySelector('.btn:not(.btn-secondary)');
    expect(confirmBtn.classList.contains('btn-danger')).toBe(true);
  });

  it('should use default values when data is not provided', () => {
    component.data = {
      title: 'Confirm Action',
      message: 'Are you sure you want to confirm this action?',
      confirmText: 'Confirm',
      cancelText: 'Cancel',
      type: 'danger'
    };
    component.isOpen = true;
    fixture.detectChanges();
    
    const title = fixture.nativeElement.querySelector('h3');
    const confirmBtn = fixture.nativeElement.querySelector('.btn:not(.btn-secondary)');
    const cancelBtn = fixture.nativeElement.querySelector('.btn-secondary');
    
    expect(title.textContent).toContain('Confirm Action');
    expect(confirmBtn.textContent).toContain('Confirm');
    expect(cancelBtn.textContent).toContain('Cancel');
  });
}); 