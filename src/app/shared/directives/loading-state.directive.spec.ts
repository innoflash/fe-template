import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { LoadingStateService } from '@fe-template/shared/services/loading-state.service';
import { LoadingStateDirective } from './loading-state.directive';

describe('LoadingStateDirective', () => {
  let fixture: ComponentFixture<LoadingStateDirectiveTestComponent>;
  let loadingStateService: LoadingStateService;
  let debugElement: DebugElement;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [LoadingStateDirectiveTestComponent, LoadingStateDirective]
    }).compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(LoadingStateDirectiveTestComponent);
        debugElement = fixture.debugElement;
        loadingStateService = TestBed.inject(LoadingStateService);
        fixture.detectChanges();
      });
  }));

  it('should append the mmaLoadingState directive', () => {
    const inputAttributes = debugElement.query(By.css('input')).attributes;

    expect(Object.keys(inputAttributes)).toContain('mmaLoadingState');
    expect(inputAttributes['mmaLoadingState']).toEqual('testLoadingState');
  });

  it('should turning disabled on when loadingStateService is started', () => {
    loadingStateService.start('testLoadingState');
    fixture.detectChanges();
    const inputElement = debugElement.query(By.css('input'));

    expect(inputElement.attributes['disabled']).toBe('true');
    expect(inputElement.nativeElement.classList.value).toContain('loading-state');
  });

  it('should turn off disabled if loading state ends', () => {
    loadingStateService.end('testLoadingState');
    fixture.detectChanges();
    const inputElement = debugElement.query(By.css('input'));

    expect(inputElement.nativeElement.classList.value).toBe('form-control');
    expect(inputElement.attributes['disabled']).toBeFalsy();
  });

  afterEach(() => TestBed.resetTestingModule());
});

@Component({
  template: '<input type="text" mmaLoadingState="testLoadingState" class="form-control"/>'
})
export class LoadingStateDirectiveTestComponent {}
