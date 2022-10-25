import { Component, OnInit } from '@angular/core';
import { ChartData } from 'chart.js';
import { Data } from '../utils/models/data';
import { Score, Scores } from '../utils/models/scores';
import { DataService } from '../utils/services/data.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {

  loaded: boolean = false;
  scores!: Scores;
  score!: string;
  scoreValue: number = 0;

  scorePercentages = {
    section1: 0,
    section2: 0,
    section3: 0,
    section4: 0,
    section5: 0
  }

  radarChartData: ChartData<'radar'> = {
    datasets: []
  };

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.load().subscribe((data: Data) => {
      this.radarChartData.labels = this.getLabels(data);
      this.scores = this.dataService.getScores();

      this.scoreValue = Math.round(this.calculateTotalScorePercentage());
      this.score = `--value:${this.scoreValue}`;

      this.radarChartData.datasets.push({
        data: [
          this.calculateScorePercentage(this.scores.section1),
          this.calculateScorePercentage(this.scores.section2),
          this.calculateScorePercentage(this.scores.section3),
          this.calculateScorePercentage(this.scores.section4),
          this.calculateScorePercentage(this.scores.section5)
        ]
      });

      this.setSectionScorePercentages();

      this.loaded = true;
    }); 
  }

  private getLabels(data: Data) {
    const sections: string[] = [];

    data.sections.forEach((d) => {
      sections.push(d.section);
    });

    return sections;
  }

  private calculateTotalScorePercentage() {
    const currentScore = this.calculateScore();
    const maxScore = this.calculateTotalScore();

    return (currentScore / maxScore) * 100;
  }

  private calculateScorePercentage(score: Score) {
    return (score.score / score.maxScore) * 100;
  }

  private calculateScore() {
    let total = 0;
    total += this.scores.section1.score;
    total += this.scores.section2.score;
    total += this.scores.section3.score;
    total += this.scores.section4.score;
    total += this.scores.section5.score;

    return total;
  }

  private calculateTotalScore() {
    let total = 0;
    total += this.scores.section1.maxScore;
    total += this.scores.section2.maxScore;
    total += this.scores.section3.maxScore;
    total += this.scores.section4.maxScore;
    total += this.scores.section5.maxScore;

    return total;
  }

  private setSectionScorePercentages() {
    this.scorePercentages.section1 = Math.round(this.calculateScorePercentage(this.scores.section1));
    this.scorePercentages.section2 = Math.round(this.calculateScorePercentage(this.scores.section2));
    this.scorePercentages.section3 = Math.round(this.calculateScorePercentage(this.scores.section3));
    this.scorePercentages.section4 = Math.round(this.calculateScorePercentage(this.scores.section4));
    this.scorePercentages.section5 = Math.round(this.calculateScorePercentage(this.scores.section5));
  }

}
