import { Transformations } from '../models';

export const parseTransformations = (transformations: string) =>
  transformations.split(',') as Transformations;

export * from './spyOn';
export * from './transform';
export { default as transform } from './transform';
