import { Component } from '@angular/core';
import { ChartOptions, Color, ChartType, ChartConfiguration, Chart } from 'chart.js';

@Component({
  selector: 'app-nav-chart',
  templateUrl: './nav-chart.component.html',
  styleUrls: ['./nav-chart.component.css']
})
export class NavChartComponent {
  public lineChartData: ChartConfiguration['data'] = {
    datasets : [
      {
        data: [65, 59, 80, 81, 56, 55, 40],
        label: 'Series A',
        borderColor: 'black',
        backgroundColor: 'rgba(255,0,0,0.3)',

      },
    ],
    labels : ['January', 'February', 'March', 'April', 'May', 'June', 'July']
  }
  
  public lineChartOptions : ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {display : true},
    },
  }
  public lineChartLegend = true;
  public lineChartType: ChartType = 'line';
  public lineChartPlugins = [];

  constructor() { 
  }
}
