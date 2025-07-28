#!/bin/bash
echo "=== Installing pnpm ==="
npm install -g pnpm@10.13.1
corepack enable
echo "=== pnpm version: $(pnpm --version) ==="