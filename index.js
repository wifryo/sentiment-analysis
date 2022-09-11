import vader from 'vader-sentiment';

const args = process.argv.slice(2);
let inputText = '';

for (let i = 0; args[i]; i++) {
  inputText += `${args[i]} `;
}

const intensity = vader.SentimentIntensityAnalyzer.polarity_scores(inputText);

let pos = `${intensity.pos * 100}%`;
let neu = `${intensity.neu * 100}%`;
let neg = `${intensity.neg * 100}%`;

console.log('\nYour text has the following sentiment: \n');
console.log(`${pos} positive`);
console.log(`${neu} neutral`);
console.log(`${neg} negative`);
