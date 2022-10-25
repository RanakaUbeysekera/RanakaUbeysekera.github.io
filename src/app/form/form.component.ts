import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Data } from '../utils/models/data';
import { DataService } from '../utils/services/data.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  data!: Data;

  loaded: boolean = false;
  end: boolean = false;

  sectionIndex: number = 0;

  constructor(
    private dataService: DataService,
    private router: Router) { }

  ngOnInit(): void {
    this.dataService.load().subscribe((data: Data) => {
      this.data = data;
      this.loaded = true;
      this.dataService.setMaxScores(data);
    }); 

  }

  next() {
    this.sectionIndex++;

    if(this.sectionIndex == 4){
      this.end = true;
    }

    this.dataService.calculateScores();
    this.toTop();
  }

  submit() {
   this.dataService.calculateScores();
   this.router.navigate(['results']);
  }

  private toTop() {
    const element = document.querySelector('#top')!;
    element.scrollIntoView({ behavior: 'smooth' });
  }

}
