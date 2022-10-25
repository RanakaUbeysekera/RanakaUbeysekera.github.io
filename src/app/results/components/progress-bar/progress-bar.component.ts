import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss']
})
export class ProgressBarComponent implements OnInit {

  @Input() score!: string;
  @Input() scoreValue: number = 0;

  constructor() { }

  ngOnInit(): void {
  }

}
