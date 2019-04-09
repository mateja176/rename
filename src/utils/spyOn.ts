const value = <A>(label: string) => (a: A) => {
  console.log(`${label}:`, a);
  return a;
};
const result = <A, B>(label: string) => (f: (...as: Array<A>) => B) => (
  ...as: Array<A>
) => {
  const result = f(...as);
  console.log(`${label}:`, result);
  return result;
};
const args = <A, B>(label: string) => (f: (...as: Array<A>) => B) => (
  ...as: Array<A>
) => {
  console.log(`${label}:`, as);
  return f(...as);
};

const valueDefault = value("value");
const resultDefault = result("result");
const argsDefault = args("args");

export { value, result, args, valueDefault, resultDefault, argsDefault };
