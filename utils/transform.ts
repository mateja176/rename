const transform = (replacement: string) => (transformations: string) => (
  ...matches: Array<string>
) => {
  const transformedArray = matches.map((match, i) => {
    const transformation = transformations[i];
    return transformation ? match[transformation]() : match;
  });

  return replacement.replace("$&", "$0").replace(/\$(\w)/g, (_, i) => {
    const t = transformedArray[i];
    if (t) {
      return t;
    } else {
      throw new Error(`Captured groups '${matches}'
Whilst replacement pattern '${replacement}' uses at least one group outside the matches`);
    }
  });
};

export default transform;
