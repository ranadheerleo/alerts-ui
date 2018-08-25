import {Component, OnDestroy, OnInit} from '@angular/core';
import {AlertService} from '../alert-service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-alert-filter',
  templateUrl: './alert-filter.component.html',
  styleUrls: ['./alert-filter.component.css']
})
export class AlertFilterComponent implements OnInit, OnDestroy {

  filters: any = {};
  subscriptions: Subscription[] = [];
  // Using this to get keys in html template
  objectKeys = Object.keys;
  constructor(private alertService: AlertService) { }


  ngOnInit() {
    this.alertService.showFiltersSub.asObservable().subscribe((data) => {
      // For simplicity, using only 3 filters
      this.filters = {'Severity': data.Severity, 'Protocol': data.Protocol, 'ClientIP':  data.ClientIP};
    });
  }

  onFilter(type, value) {
    this.alertService.filterAlertsSub.next({type: type, value: value});
  }

  ngOnDestroy() {
    // Un-subscribing to user defined observables
    this.subscriptions.forEach(sub => sub.unsubscribe());
    this.subscriptions = [];
  }

}
