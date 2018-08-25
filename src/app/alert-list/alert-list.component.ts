import {Component, OnDestroy, OnInit} from '@angular/core';
import {GridOptions} from 'ag-grid';
import {AlertService} from '../alert-service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-alert-list',
  templateUrl: './alert-list.component.html',
  styleUrls: ['./alert-list.component.css']
})
export class AlertListComponent implements OnInit, OnDestroy {
  title = 'app';
  gridOptions: GridOptions = {};
  searchText: string;
  alerts = [];
  alertsCount: number;
  currentFilter: any;
  subscriptions: Subscription[] = [];
  columnDefs = [
    {headerName: 'AlertId', field: 'AlertId', width: 150},
    {headerName: 'AlertTime', field: 'AlertTime', width: 150},
    {headerName: 'Severity', field: 'Severity', width: 150},
    {headerName: 'ClientIP', field: 'ClientIP', width: 150},
    {headerName: 'ServerIP', field: 'ServerIP', width: 150},
    {headerName: 'Protocol', field: 'Protocol', width: 150},
    {headerName: 'ClientCountry', field: 'ClientCountry', width: 150}
  ];

  constructor(private alertService: AlertService) {
  }

  ngOnInit() {
    this.gridOptions.rowSelection = 'single';
    this.gridOptions.context = {listCompRef: this};
    this.gridOptions.onRowClicked = this.onRowClicked;
    this.gridOptions.columnDefs = this.columnDefs;
    this.gridOptions.paginationAutoPageSize = true;
    this.gridOptions.pagination = true;
    this.alertService.getData().subscribe((data) => {
      this.alerts = data;
      this.alertService.analyseAlerts(data);
      this.populateGrid(data);
    });

    // Gets triggered when user clicks on left filter
    this.subscriptions.push(this.alertService.filterAlertsSub.asObservable().subscribe(data => {
      this.currentFilter = data;
      this.populateGrid(this.alertService.filterAlerts(Object.assign([], this.alerts), data.type, data.value));
    }));
  }

  onRowClicked(params) {
    // sends message when row is clicked
    params.context.listCompRef.alertService.showAlertDetailSub.next(params.data);
  }

  populateGrid(data) {
    this.gridOptions.api.setRowData(data);
    this.gridOptions.api.redrawRows();
    this.alertsCount = this.gridOptions.api.getDisplayedRowCount();
  }

  onSearch() {
    // ag grid functionality to quickly search through all columns
    this.gridOptions.api.setQuickFilter(this.searchText);
  }

  clearFilter() {
    // Clearing filter by removing both text and stat filters
    this.currentFilter = undefined;
    this.searchText = '';
    this.onSearch();
    this.populateGrid(this.alerts);
  }

  ngOnDestroy() {
    // Un-subscribing to user defined observables
    this.subscriptions.forEach(sub => sub.unsubscribe());
    this.subscriptions = [];
  }
}
