import { zip } from 'ramda';
import { Transformations } from '../models';

const transform = (replacement: string) => (
  transformations: Transformations,
) => (find: string, ...config: string[]) => {
  const [wholeString] = config.slice(-1);

  const matches = config.slice(0, -2);

  const transformedMatches = zip(matches, transformations).map(
    ([find, transformation]) => find[transformation](),
  );

  const replacementResult = replacement
    .replace(/\$0/g, wholeString)
    .replace(/\$&/g, find)
    .replace(/\$(\d)/g, (_, groupNumber) => {
      const find = transformedMatches[groupNumber - 1];

      if (find) {
        return find;
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
