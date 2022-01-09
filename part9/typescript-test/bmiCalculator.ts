const calculateBmi = (height: number, weight: number): string => {
  const bmi = weight / (height / 100) ** 2

  if (bmi < 16) return 'Underweight (Severe thinness)'
  else if (bmi < 17) return 'Underweight (Moderate thinness)'
  else if (bmi < 18.5) return 'Underweight (Mild thinness) '
  else if (bmi < 25) return 'Normal (healthy weight)'
  else if (bmi < 30) return 'Overweight (Pre-obese)'
  else if (bmi < 35) return 'Obese (Class I)'
  else if (bmi < 40) return 'Obese (Class II)'
  else return 'Obese (Class III)'
}

const parseArguments = (args: Array<string>): number[] => {
  if (args.length < 4) throw new Error('Not enough arguments')
  if (args.length > 4) throw new Error('Too many arguments')
  if (isNaN(Number(args[2])) || isNaN(Number(args[3]))) throw new Error('Provided values were not numbers!')

  return [Number(args[2]), Number(args[3])]
}

try {
  const [height, weight] = parseArguments(process.argv)
  console.log(`BMI for ${height}cm and ${weight}kg, the result is: ${calculateBmi(height, weight)}`)
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.'
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message
  }
  console.log(errorMessage)
}

export {}
