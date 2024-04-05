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
  let isUnique = true;
  for (let index = 0; index < string.length; index++) {
    const element = string[index];
    if (map.has(element)) {
      map.set(element, map.get(element) + 1);
    } else {
      map.set(element, 1);
    }
  }
  for (let val of map.values()) {
    if (isUnique) {
      if (val != 1) {
        isUnique = false;
      }
    }
  }

  return isUnique;
}
console.log(isUnique2('abcdef')); // -> true
console.log(isUnique2('1234567')); // -> true
console.log(isUnique2('abcABC')); // -> true
console.log(isUnique2('abcadef')); // -> false
