import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { HistoryService } from '../history.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent {

  history$ = this.historyService.getHistory();

  constructor(private historyService: HistoryService) {}

  clearHistory() {
    this.historyService.clearHistory();
  }
}