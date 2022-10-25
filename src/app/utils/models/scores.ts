export interface Scores {
    section1: Score,
    section2: Score,
    section3: Score,
    section4: Score,
    section5: Score
}

export interface Score {
    score: number,
    maxScore: number
}