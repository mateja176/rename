import { last, zip } from 'ramda';
import { Transformations, TransformationsArray } from '../models';

type Replacer = Parameters<String['replace']>[1];

const transformMatch = (transformations?: TransformationsArray) => (
  match: string,
) => {
  if (transformations && transformations.length) {
    return transformations.reduce(
      (transformedMatch, transformation) => transformedMatch[transformation](),
      match,
    );
  } else {
    return match;
  }
};

export const transform = (replacement: string) => (
  transformations: Transformations,
): Replacer => (match, ...args) => {
  const wholeString = last(args);
  const transformedWholeString = transformMatch(transformations['$-1'])(
    wholeString,
  );

  const transformedMatch = transformMatch(transformations['$&'])(match);

  const matches = args.slice(0, -2);

  const transformedMatches = matches.map((match, i) =>
    transformMatch(transformations[`$${i}`])(match),
  );

  const replacementResult = replacement
    .replace(/\$0/g, transformedWholeString)
    .replace(/\$&/g, transformedMatch)
    .replace(/\$(\d)/g, (_, groupNumber) => {
      const transformedCurrentMatch = transformedMatches[groupNumber - 1];

      if (transformedCurrentMatch) {
        return transformedCurrentMatch;
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
