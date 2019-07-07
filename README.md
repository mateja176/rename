# Rename

🖉 Script for recursively renaming files and folders

## Usage

`npm i -g mateja176/rename`

`rename --help`

## Examples

### Rename all '.js' files to '.ts' files in the current directory

```sh
rename --find '(.+).js' --replace '$1.ts'
```

### Rename all '.js' files to '.ts' files recursively, starting with the current directory

```sh
rename --find '(.+).js' --replace '$1.ts' --recursive
```

_Be careful when using this command however it can easily be undone by it's inverse_

```sh
rename --find '(.+).ts' --replace '$1.js' --recursive
```

## Transformers

### Available transformers

```ts
'toUpperCase' | 'toLowerCase' | 'trim' | 'trimLeft' | 'trimRight';
```

### Examples

#### Trimming file names

```sh
rename --transformations trim
```

```sh
rename --find '(.+)(\.ts)' --replace '$1$2' --transformations trim,slice
```

#### Lower casing file names

```sh
rename --transformations toLowerCase,slice
```
