interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const exerciseCalculator = (record: number[], target: number): Result => {
  const average = record.reduce((a, b) => a + b) / record.length;
  const rating = average >= target ? 3 : average >= target / 2 ? 2 : 1;
  const ratingDescription = rating === 3 ? 'Target achieved' : rating === 2 ? 'A bit more next time' : 'Target failed';

  return {
    periodLength: record.length,
    trainingDays: record.filter((e) => e > 0).length,
    success: average >= target,
    rating,
    ratingDescription,
    target,
    average,
  };
};

const parseArguments = (args: Array<string>): [number, number[]] => {
  if (args.length < 3) throw new Error('Not enough arguments');
  let target = 1;
  const records: number[] = [];

  if (isNaN(Number(args[2]))) throw new Error('Provided target is not a number');
  else target = Number(args[2]);
  args.slice(3).forEach((e) => {
    if (isNaN(Number(e))) throw new Error('Provided values were not numbers!');
    else records.push(Number(e));
  });

  return [target, records];
};

try {
  const [target, records] = parseArguments(process.argv);
  console.log(exerciseCalculator(records, target));
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}

export default { exerciseCalculator, parseArguments };
