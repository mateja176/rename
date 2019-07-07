#!/usr/bin/env ts-node

import {
  configureRename,
  createRenameCommander,
  renameRecursively,
} from './utils';

const { path, recursive, ...renameConfig } = createRenameCommander();

const rename = configureRename(renameConfig);

const currentDirectory = process.cwd();

if (recursive) {
  renameRecursively(rename)(currentDirectory)(path);
} else {
  rename(currentDirectory)(path);
}
