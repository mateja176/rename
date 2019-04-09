const transform = (replacement: string) => (
  transformations: Array<
    "toUpperCase" | "toLowerCase" | "trim" | "trimLeft" | "trimRight"
  >,
) => (...config: Array<string>) => {
  const [offset, string] = config.slice(-2);

  const matches = config.slice(0, -2);

  const transformedMatches = transformations.map((transformation, i) =>
    matches[i][transformation](),
  );

  const allMatches = transformedMatches.concat(
    matches.slice(transformedMatches.length),
  );

  return replacement
    .replace(/\$&/g, string)
    .replace(/\$(\d)/g, (_, groupNumber) => {
      const match = allMatches[groupNumber];
      if (match) {
        return match;
      } else {
        throw new Error(`Replacement pattern '${replacement}' uses at least one group more than the number of captured groups
Where captured groups are '${matches}'`);
      }
    });
};

export default transform;
