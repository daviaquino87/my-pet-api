export function generateFirstAccessCode(): string {
  const min = 10000;
  const max = 99999;

  const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;

  return randomNumber.toString();
}
