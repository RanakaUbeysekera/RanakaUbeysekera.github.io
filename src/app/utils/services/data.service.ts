import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Data } from '../models/data';
import { Scores } from '../models/scores';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private scores: Scores = {
    section1: {
      score: 0,
      maxScore: 0
    },
    
    section2: {
      score: 0,
      maxScore: 0
    },
    
    section3: {
      score: 0,
      maxScore: 0
    },
    
    section4: {
      score: 0,
      maxScore: 0
    },
    
    section5: {
      score: 0,
      maxScore: 0
    },
    
  };

  constructor(private http: HttpClient) { }

  load(): Observable<Data> {
    return this.http.get<Data>('assets/data.json')
  }

  calculateScores() {
    const sectionCount = 5;
    for(let i = 0; i < sectionCount; i++) {
      const scores = document.querySelectorAll('input[class="'+ i +'"]:checked');
      
      scores.forEach((e) => {
        const score = Number(e.getAttribute('value'));

        switch(i) {
          case 0:
            this.scores.section1.score += score;
            break;
          case 1:
            this.scores.section2.score += score;
            break;
          case 2:
            this.scores.section3.score += score;
            break;
          case 3:
            this.scores.section4.score += score;
            break;
          case 4:
            this.scores.section5.score += score;
            break;
        }
      });
    }

    console.log(this.scores);
  }

  getScores() {
    return this.scores;
  }

  setMaxScores(data: Data) {
    this.scores.section1.maxScore = data.sections[0].maxScore;
    this.scores.section2.maxScore = data.sections[1].maxScore;
    this.scores.section3.maxScore = data.sections[2].maxScore;
    this.scores.section4.maxScore = data.sections[3].maxScore;
    this.scores.section5.maxScore = data.sections[4].maxScore;
  }

}
