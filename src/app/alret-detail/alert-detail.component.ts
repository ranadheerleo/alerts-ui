import {Component, OnDestroy, OnInit} from '@angular/core';
import {AlertService} from '../alert-service';
import {Subscription} from 'rxjs';
import {subscribeToIterable} from 'rxjs/internal/util/subscribeToIterable';

@Component({
  selector: 'app-alret-detail',
  templateUrl: './alert-detail.component.html',
  styleUrls: ['./alert-detail.component.css']
})
export class AlretDetailComponent implements OnInit, OnDestroy {

  alertDetails: any = {};
  subscriptions: Subscription[] = [];
  constructor(private alertService: AlertService) { }

  ngOnInit() {
    // Gets triggered when new row is selected on grid
    this.subscriptions.push(this.alertService.showAlertDetailSub.asObservable().subscribe(data => {
      this.alertDetails = data;
    }));
  }

  ngOnDestroy() {
    // Un-subscribing to user defined observables
    this.subscriptions.forEach(sub => sub.unsubscribe());
    this.subscriptions = [];
  }
}
