import * as commander from 'commander';
import { Transformations } from '../models';

export const parseTransformations = (transformations: string) =>
  transformations.split(',') as Transformations;

export const createRenameCommander = () =>
  commander
    .option('-f, --find <pattern>', 'Pattern to find against', '.+')
    .option('--flags <flags>', 'Pattern to find against', '')
    .option('-r, --replace <pattern>', 'Replacement pattern', '$&')
    .option(
      '-t, --transformations <array>',
      'Array of transformations to be applied in order',
      parseTransformations,
    )
    .option('-R, --recursive', 'Perform recursive rename')
    .parse(process.argv);

export * from './spyOn';
export * from './transform';
export { default as transform } from './transform';
