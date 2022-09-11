import vader from 'vader-sentiment';
import MonkeyLearn from 'monkeylearn';
import { stdout } from 'process';

const args = process.argv.slice(2);
let inputText = '';

for (let i = 0; args[i]; i++) {
  inputText += `${args[i]} `;
}

const intensity = vader.SentimentIntensityAnalyzer.polarity_scores(inputText);

let pos = `${intensity.pos * 100}%`;
let neu = `${intensity.neu * 100}%`;
let neg = `${intensity.neg * 100}%`;

console.log(
  '\n - - - - - - - - - \n\nAnalysis 1 from vader-sentiment\n\nYour text has the following sentiment:',
);
console.log(`${pos} positive`);
console.log(`${neu} neutral`);
console.log(`${neg} negative`);

const ml = new MonkeyLearn('272375b3a8174c3bdd859015b0fca784ce545c37');
let model_id = 'cl_pi3C7JiL';
let data = [inputText];
ml.classifiers.classify(model_id, data).then((res) => {
  stdout.write(
    '\n - - - - - - - - - \n\nAnalysis 2 from MonkeyLearn: \n\nYour text has a sentiment of ',
  );
  stdout.write(res.body[0].classifications[0].tag_name.toLowerCase());
  stdout.write(', with a confidence of ');
  console.log(res.body[0].classifications[0].confidence);
});
