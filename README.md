# Rename

🖉 Script for recursively renaming files and folders 

## Usage

`npm i -g mytee306/rename`

`rename --help`

## Examples

### Rename all '.js' files to '.ts' files in the current directory

```sh
rename --match '(.+).js' --replace '$1.ts'
```

### Rename all '.js' files to '.ts' files recursively, starting with the current directory

```sh
rename --match '(.+).js' --replace '$1.ts' --recursive
```

*Be careful when using this command however it can easily be undone by it's inverse*

```sh
rename --match '(.+).ts' --replace '$1.js' --recursive
```
## Transformers

### Available transformers

```ts
"toUpperCase" | "toLowerCase" | "trim" | "trimLeft" | "trimRight"
```

### Examples

#### Trimming file names

```sh
rename --transformations trim
```

```sh
rename --match '(.+)(\.ts)' --replace '$1$2' --transformations trim,slice
```

#### Lower casing file names

```sh
rename --transformations toLowerCase,slice
```
