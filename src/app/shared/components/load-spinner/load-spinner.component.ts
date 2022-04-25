import { Component, OnInit } from '@angular/core';
import { LoadingStateService } from '@fe-template/shared/services/loading-state.service';

@Component({
  selector: 'fe-template-load-spinner',
  templateUrl: './load-spinner.component.html',
  styleUrls: ['./load-spinner.component.scss']
})
export class LoadSpinnerComponent implements OnInit {
  public showProgress = false;

  public constructor(public loadingStateService: LoadingStateService) {
  }

  public ngOnInit(): void {
    this.loadingStateService.loadingStates.subscribe({
      next: res => this.showProgress = res.state
    });
  }
}
