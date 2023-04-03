[![Netlify Status](https://api.netlify.com/api/v1/badges/afc0e46f-a6e0-4d4c-ad52-2a329d9daae6/deploy-status?branch=develop)](https://app.netlify.com/sites/codehills-hr-app/deploys)
# React Vite CodeHills - HR App

This is an HR app designed for managing developers by providing tools for conducting reviews and addressing other development concerns.

## Getting Started

### Installation

To run the HR app, follow these steps:

```bash
git clone https://github.com/denislohan/codehills-dev-profile-fe.git
```

Install dependencies:

```bash
yarn install
```

Copy `.env_example` and rename it to `.env.local`:

```bash 
cp .env_example .env.local
```

Update the environment variables in `.env.local` with your own values

### Development

Start the development server: 

```bash 
yarn dev
```

The app should be available at  [http://localhost:PORT](http://localhost:[PORT])

### Testing

To run the tests, use the following command:

```bash
yarn test
```

For test coverage run:

```bash
yarn coverage
```

### Production

First, build project:

```bash
yarn build
```

## Technology Stack

The HR app is built using the following technologies:

### Dependencies

[React](https://reactjs.org/): A JavaScript library for building user interfaces
[Vite](https://vitejs.dev/): A build tool for modern web applications
[Tailwind CSS](https://tailwindcss.com/): A utility-first CSS framework for rapid UI development
[Redux](https://redux.js.org/): A predictable state container for JavaScript apps
[SWR](https://swr.vercel.app/docs/getting-started): A React hook for data fetching and caching

### Dev dependencies

[TypeScript](https://www.typescriptlang.org/): A typed superset of JavaScript
[Vitest](https://vitest.dev/): Blazing Fast Unit Test Framework
[ESLint](https://eslint.org/): A pluggable linter for JavaScript
[Prettier](https://prettier.io/): A code formatter

## Contributing

You can check out [`denislohan/codehills-dev-profile-fe`](https://github.com/denislohan/codehills-dev-profile-fe) - your feedback and contributions are welcome!
