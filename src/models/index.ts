export type Transformation =
  | 'toUpperCase'
  | 'toLowerCase'
  | 'trim'
  | 'trimLeft'
  | 'trimRight';

export type TransformationsArray = Transformation[];

const matches = [
  '$-1',
  '$&',
  '$1',
  '$2',
  '$3',
  '$4',
  '$5',
  '$6',
  '$7',
  '$8',
  '$9',
] as const;

export type Match = typeof matches[number];

export type Transformations = Partial<Record<Match, TransformationsArray>>;

export interface SimpleRenameCommanderParams {
  find: string;
  flags: string;
  transformations: Transformations;
  replace: string;
}

export interface RenameCommanderParams extends SimpleRenameCommanderParams {
  path: string;
  recursive: boolean;
}
