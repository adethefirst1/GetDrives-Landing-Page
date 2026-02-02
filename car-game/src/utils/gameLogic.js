/**
 * Shuffle array (Fisher-Yates)
 */
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/**
 * Generate 7 rounds: each round has one car (image + real name) and 4 options:
 * exactly 1 correct answer (the real car name) + 3 wrong answers (from other cars).
 * Cars and option order are randomized so each game is different.
 * @param {Array<{id, name, image}>} cars - full cars array
 * @returns {Array<{ car, options, correctIndex }>}
 */
export function generateRounds(cars) {
  if (cars.length < 4) throw new Error('Need at least 4 cars');
  const allNames = cars.map((c) => c.name);
  const shuffledCars = shuffle(cars);
  const sevenCars = shuffledCars.slice(0, 7);

  return sevenCars.map((car) => {
    const correctName = car.name;
    const wrongPool = allNames.filter((n) => n !== correctName);
    const threeWrong = shuffle(wrongPool).slice(0, 3);
    let fourOptions = shuffle([correctName, ...threeWrong]);
    let correctIndex = fourOptions.indexOf(correctName);
    if (correctIndex < 0) {
      fourOptions = [correctName, ...threeWrong];
      correctIndex = 0;
    }
    return { car, options: fourOptions, correctIndex };
  });
}
