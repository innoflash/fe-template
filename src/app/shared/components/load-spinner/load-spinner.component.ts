import { Component, OnInit } from '@angular/core';
import { LoadingStateService } from '@fe-template/shared/service/global/loading-state.service';

@Component({
  selector: 'app-load-spinner',
  templateUrl: './load-spinner.component.html',
  styleUrls: ['./load-spinner.component.scss']
})
export class LoadSpinnerComponent implements OnInit {
  public showProgress = false;

  constructor(public loadingStateService: LoadingStateService) {
  }

  ngOnInit(): void {
    this.loadingStateService.loadingStates.subscribe({
      next: res => this.showProgress = res.state
    });
  }
}
