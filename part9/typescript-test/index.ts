import express from 'express';
import bmiCalculator from './bmiCalculator';
import exerciseCalculator from './exerciseCalculator';

const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  try {
    const { height: h, weight: w } = req.query as { height: string; weight: string };
    const [height, weight] = bmiCalculator.parseArguments(['', '', h, w]);
    res.send({
      height,
      weight,
      bmi: bmiCalculator.calculateBmi(height, weight),
    });
  } catch (e) {
    console.error(e);

    res.status(400).json({
      error: 'malformatted parameters',
    });
  }
});

app.post('/exercises', (req, res) => {
  const { daily_exercises: record, target } = req.body as { daily_exercises: number[]; target: number };

  if (target === undefined || record === undefined) res.status(400).json({ error: 'parameters missing' });
  else if (isNaN(target) || !Array.isArray(record)) res.status(400).json({ error: 'malformatted parameters' });
  else {
    for (let i = 0; i < record.length; i++)
      if (isNaN(record[i])) {
        res.status(400).json({ error: 'malformatted parameters' });
        return;
      }

    res.json(exerciseCalculator.exerciseCalculator(record, target));
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
