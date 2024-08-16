module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    project: './tsconfig.json',
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'airbnb-typescript',
    'prettier',
  ],
  plugins: [
    'react',
    '@typescript-eslint',
    'prettier',
    'import',
  ],
  rules: {
    'prettier/prettier': 'error',
    "@typescript-eslint/naming-convention": "off",
    'react/react-in-jsx-scope': 'off', // Solo necesario para Next.js
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'import/extensions': ['error', 'never', {
      svg: 'always',
    }],
    'import/no-extraneous-dependencies': ['error', {
      devDependencies: true,
      optionalDependencies: false,
      peerDependencies: false,
    }],
  },
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      typescript: {}, // Resolver TypeScript imports
    },
  },
};
