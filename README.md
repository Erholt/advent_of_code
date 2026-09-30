# Advent of Code

This repository is my Advent of Code practice archive: a place to work through the daily puzzles, verify the logic with tests, and keep each solution organized by year and day.

## Why this repo exists

The goal is to build a growing collection of Advent of Code solutions across multiple years and languages, starting with JavaScript. It is designed to make puzzle-solving easy to revisit, compare, and improve over time.

## Project structure

The repository is organized by year, with each day living in its own folder.

```text
javascript/
├── 2015/
│   ├── 1/
│   │   ├── input.txt
│   │   ├── script.js
│   │   └── test.js
│   ├── 2/
│   │   ├── input.txt
│   │   ├── script.js
│   │   └── test.js
│   └── ...
└── README.md
```

Each folder typically contains:
- `input.txt` for the puzzle input
- `script.js` for the solution logic
- `test.js` for validation against expected outcomes

## Getting started

Install dependencies:

```bash
npm install
```

Run the full test suite:

```bash
node --test
```

Run linting:

```bash
npm run lint
```

## Current status

This project currently includes JavaScript solutions for Advent of Code 2015, with multiple days implemented and tested. The long-term plan is to expand the archive with more years and more languages.

## Notes

These are personal solutions and verification tests used to validate puzzle logic against the provided inputs and expected outputs.

## Roadmap

- Finish the remaining 2015 puzzles
- Expand into additional years and languages
- Improve the structure and tooling as the collection grows