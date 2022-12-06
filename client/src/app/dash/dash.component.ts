import { Component, SimpleChanges, ViewChild } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { DataServiceService } from '../services/data-service.service';
import { StockPosition } from '../models/stockPosition';

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.css']
})
export class DashComponent {

  data : StockPosition[] = [];
  chartData : StockPosition[] = [];


  cardLayout = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return {
          columns: 1,
          miniCard: { cols: 1, rows: 1 },
          chart: { cols: 1, rows: 2 },
          table: { cols: 1, rows: 2 },
        };
      }

      return {
        columns: 4,
        miniCard: { cols: 1, rows: 1 },
        chart: { cols: 4, rows: 2 },
        table: { cols: 4, rows: 4 },
      };
    })
  );
  constructor(private breakpointObserver: BreakpointObserver, private _dataService : DataServiceService) {}

  ngOnInit() {
    this._dataService.getData().subscribe({
      next : (response : any) => {
        this.data = response
      },
      error: (error : any) => {
        console.log(error);
      }
    });
  }

  updateChart(newItem: StockPosition[]) {
    this.chartData = newItem;
  }

  
}
