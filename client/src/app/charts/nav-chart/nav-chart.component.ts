import { Component, Input, SimpleChanges, ViewChild } from '@angular/core';
import { ChartOptions, Color, ChartType, ChartConfiguration, Chart } from 'chart.js';
import { Console } from 'console';
import { BaseChartDirective } from 'ng2-charts';
import { StockPosition } from 'src/app/models/stockPosition';

@Component({
  selector: 'app-nav-chart',
  templateUrl: './nav-chart.component.html',
  styleUrls: ['./nav-chart.component.css']
})
export class NavChartComponent {

  @Input() inputData: StockPosition[] = [];
  lables: any[] = [];
  navValues: any[] = [];
  
  public lineChartData: ChartConfiguration['data'] = {
    datasets : [
      {
        data: this.navValues,
        borderColor: 'black',
        backgroundColor: 'rgba(255,0,0,0.3)',
      },
    ],
    labels : this.lables
  }
  
  public lineChartOptions : ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {display : false},
    },
  }
  public lineChartType: ChartType = 'line';
  public lineChartPlugins = [];

  constructor() { 
  }
  
  aggregateData(data : StockPosition[]) {
    const res = Array.from(data.reduce(
      (m, {dataDate, holdingValue}) => m.set(dataDate, (m.get(holdingValue) || 0) + holdingValue), new Map
    ), ([dataDate, holdingValue]) => ({dataDate, holdingValue}));
    this.lineChartData.labels = res.map(a => a.dataDate);
    this.lineChartData.datasets[0].data = res.map(a => a.holdingValue);
    console.log(this.lineChartData.labels);
    (this.lineChartData.labels);
    console.log(this.lineChartData.datasets[0].data);
    this.chart?.chart?.update();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.aggregateData(this.inputData);
    this.chart?.chart?.update();
  }

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;


  ngOnInit() {
    this.aggregateData(this.inputData); 
    this.chart?.chart?.update();
  }

  // onClick() {
  //   this.aggregateData(this.inputData); 
  //   this.chart?.chart?.update();
  // }
}
