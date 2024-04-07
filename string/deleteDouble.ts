function deleteDouble(string: string) {
  return [...new Set(string)].join('');
}
console.log(deleteDouble('abcd')); // -> 'abcd'
console.log(deleteDouble('aabbccdd')); // -> 'abcd'
console.log(deleteDouble('abcddbca')); // -> 'abcd'
console.log(deleteDouble('abababcdcdcd')); // -> 'abcd'

// ----------------------------------------------------2
function deleteDouble2(string: string) {
  const map = new Map();
  for (let index = 0; index < string.length; index++) {
    const element = string[index];
    if (!map.has(element)) {
      map.set(element, 1);
    }
  }
  let str = '';
  for (let val of map.keys()) {
    str += val;
  }
  return str;
}
console.log(deleteDouble2('abcd')); // -> 'abcd'
console.log(deleteDouble2('aabbccdd')); // -> 'abcd'
console.log(deleteDouble2('abcddbca')); // -> 'abcd'
console.log(deleteDouble2('abababcdcdcd')); // -> 'abcd'
