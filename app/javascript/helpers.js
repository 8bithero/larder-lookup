export function decimalToFractions(numStr) {
  const fractionsMap = {
    0.01: '', // No fraction for decimals close to 0
    0.125: '\u215B', // 1/8
    0.25: '\u00BC', // 1/4
    0.375: '\u215C', // 3/8
    0.5: '\u00BD', // 1/2
    0.625: '\u215D', // 5/8
    0.75: '\u00BE', // 3/4
    0.875: '\u215E', // 7/8
    0.333: '\u2153', // Approx for 1/3
    0.666: '\u2154', // Approx for 2/3
  };

  let num = parseFloat(numStr);
  let wholePart = Math.floor(num);
  let decimalPart = num - wholePart;
  let closestFraction = '';
  let minDifference = Infinity;

  // Find the closest fraction
  Object.entries(fractionsMap).forEach(([key, value]) => {
    let fractionDecimal = parseFloat(key);
    let difference = Math.abs(fractionDecimal - decimalPart);
    if (difference < minDifference && difference < 0.1) {
      minDifference = difference;
      closestFraction = value;
    }
  });

  return (wholePart > 0 ? wholePart + ' ' : '') + closestFraction;
}
