import { Component, Input, OnInit } from '@angular/core';
import { ChartConfiguration, ChartData } from 'chart.js';

@Component({
  selector: 'app-radar-chart',
  templateUrl: './radar-chart.component.html',
  styleUrls: ['./radar-chart.component.scss']
})
export class RadarChartComponent implements OnInit {

  @Input() radarChartData!: ChartData;
  @Input() scorePercentages: any;
  
  radarChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    scales: {
      r: {
        max: 100,
        ticks: {
          display: false
        }
      }
    },
    plugins: {
      legend: {
        display: false
      }
    }
  };


  constructor() { }

  ngOnInit(): void {
  }

}
