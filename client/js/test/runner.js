let count = 0
export function test(testFunc) {
  console.info(`run: ${testFunc.name}`);
  setTimeout(testFunc, count++ * 200);
}
