import { zip } from "ramda";
import { Transformations } from "../models/transformation";

const transform = (replacement: string) => (
  transformations: Transformations,
) => (match: string, ...config: string[]) => {
  const [, wholeString] = config.slice(-2);

  const matches = config.slice(0, -2);

  const transformedMatches = zip(matches, transformations).map(
    ([match, transformation]) => match[transformation](),
  );

  const replacementResult = replacement
    .replace(/\$0/g, wholeString)
    .replace(/\$&/g, match)
    .replace(/\$(\d)/g, (_, groupNumber) => {
      const match = transformedMatches[groupNumber - 1];

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

  return replacementResult;
};

export default transform;
