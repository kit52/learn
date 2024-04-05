function isUnique(string: string) {
  return new Set(string).size == string.length;
}
console.log(isUnique('abcdef')); // -> true
console.log(isUnique('1234567')); // -> true
console.log(isUnique('abcABC')); // -> true
console.log(isUnique('abcadef')); // -> false

//--------------------------------------------------------------------------2 вариант решения
function isUnique2(string: string) {
  const map = new Map();
  for (let index = 0; index < string.length; index++) {
    const element = string[index];
    if (map.has(element)) {
    } else {
      map.set(element, 1);
    }
  }
}
console.log(isUnique2('abcdef')); // -> true
console.log(isUnique2('1234567')); // -> true
console.log(isUnique2('abcABC')); // -> true
console.log(isUnique2('abcadef')); // -> false
