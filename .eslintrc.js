module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    project: './tsconfig.json', // Asegúrate de que esta ruta es correcta
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
    'react/react-in-jsx-scope': 'off', // Solo necesario para Next.js
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'import/extensions': ['error', 'never', {
      svg: 'always', // Ajusta esta regla según tus necesidades
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
