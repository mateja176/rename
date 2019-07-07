# Rename

✏️ Script for renaming and recursively renaming files and folders

## To do

Add `--depth` option to be used in conjunction with the recursive flag

## Usage

`npm i -g mateja176/rename`

`rename --help`

## Examples

### Rename all '.js' files to '.ts' files in the src directory

```sh
rename --path src --find '(.+)\.js' --replace '$1.ts' --recursive
```

_Be careful when using the `--recursive` flag. It can affect many assets at once and you may find it difficult if not impossible to undo a recursive rename in cases where the rename was informationally destructive_

## Transformers

### Available transformers

```ts
'toUpperCase' | 'toLowerCase' | 'trim' | 'trimLeft' | 'trimRight';
```

#### Trimming file names

```sh
rename --find '.+' --replace '$&' --transformations '{ "$&": ["trim"] }' --recursive
```

```sh
rename --find '(.+)(\.ts)' --replace '$1$2' --transformations '{ "$1": ["trim"] }"
```

#### Lower casing file names

```sh
rename --find '.+' --replace '$&' --transformations '{ "$&": ["toLowerCase"] }'
```
