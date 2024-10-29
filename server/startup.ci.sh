#!/usr/bin/env bash
set -e

yarn run migration:run
yarn run seed:run