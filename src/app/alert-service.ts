import {Injectable} from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  constructor(private http: HttpClient) {
  }

  showAlertDetailSub = new Subject<any>();
  showFiltersSub = new Subject<any>();
  filterAlertsSub = new Subject<any>();

  filters = {};

  public getData(): Observable<any> {
    return this.http.get('assets/alerts.json');
  }

  // Iterating through all alerts to get count for each field
  analyseAlerts(data) {
    data.forEach(alert => {
      const keys = Object.keys(alert);
      keys.forEach(key => {
        // For first time creating an entry for the field in filters Object
        if (this.filters[key] === undefined) {
          this.filters[key] = {};
        } else {
          // For the first time creating an entry for filter value
          if (this.filters[key][alert[key]] === undefined) {
            this.filters[key][alert[key]] = 1;
          } else {
            // Incrementing existing count
            this.filters[key][alert[key]] = this.filters[key][alert[key]] + 1;
          }
        }
      });
    });
    this.showFiltersSub.next(this.filters);
  }

  // Filtering all alerts based on field type and field value
  filterAlerts(data, type, value) {
    return data.filter(alert => alert[type] === value);
  }
}

