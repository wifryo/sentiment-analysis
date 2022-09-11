import { stdout } from 'node:process';
import MonkeyLearn from 'monkeylearn';
import vader from 'vader-sentiment';

const args = process.argv.slice(2);
let inputText = '';

for (let i = 0; args[i]; i++) {
  inputText += `${args[i]} `;
}

const intensity = vader.SentimentIntensityAnalyzer.polarity_scores(inputText);

const pos = `${intensity.pos * 100}%`;
const neu = `${intensity.neu * 100}%`;
const neg = `${intensity.neg * 100}%`;

console.log(
  '\n - - - - - - - - - \n\nAnalysis 1 from vader-sentiment\n\nYour text has the following sentiment:',
);
console.log(`${pos} positive`);
console.log(`${neu} neutral`);
console.log(`${neg} negative`);

const ml = new MonkeyLearn('272375b3a8174c3bdd859015b0fca784ce545c37');
const id = 'cl_pi3C7JiL';
const data = [inputText];
ml.classifiers.classify(id, data).then((res) => {
  stdout.write(
    '\n - - - - - - - - - \n\nAnalysis 2 from MonkeyLearn: \n\nYour text has a sentiment of ',
  );
  stdout.write(res.body[0].classifications[0].tag_name.toLowerCase());
  stdout.write(', with a confidence of ');
  console.log(res.body[0].classifications[0].confidence);
});
