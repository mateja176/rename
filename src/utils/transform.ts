import { Transformations } from "../models/transformation";

const transform = (replacement: string) => (
  transformations: Transformations,
) => (match: string, ...config: string[]) => {
  const [, wholeString] = config.slice(-2);

  const matches = config.slice(0, -2);

  const replacementResult = replacement
    .replace(/\$&/g, match)
    .replace(/\$0/g, wholeString)
    .replace(/(?=\$)\d/g, groupNumber => {
      const match = matches[groupNumber];
      if (match) {
        return match;
      } else {
        throw new Error(`'${groupNumber}' does not represent a captured group number from 1 to '${
          matches.length
        }'
Replacement pattern '${replacement}'
Captured groups '${matches}'`);
      }
    });

  return transformations.reduce(
    (result, transformation) => result[transformation](),
    replacementResult,
  );
};

export default transform;
