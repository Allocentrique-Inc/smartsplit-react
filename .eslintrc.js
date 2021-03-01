module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['plugin:react/recommended', 'airbnb'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/jsx-filename-extension': 'off',
    'react/button-has-type': 'off',
    'react/jsx-curly-newline': 'off',
    'react/implicit-arrow-linebreak': 'off',
    'react/jsx-one-expression-per-line': 'off',
    'implicit-arrow-linebreak': 'off',
    'operator-linebreak': 'off',
    'no-irregular-whitespace': 'off',
    'no-console': 'off',
    'no-tabs': 'off',
    'spaced-comment': 'off',
    'import/prefer-default-export': 'off',
    camelcase: 'off',
    'no-unused-vars': 'off',
    'no-unused-expressions': 'off',
    'no-shadow': 'off',
    'arrow-body-style': 'off',
    'consistent-return': 'off',
    'react/destructuring-assignment': 'off',
    'react/prop-types': 'off',
    'no-underscore-dangle': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
    'react/jsx-props-no-spreading': 'off',
    'max-len': 0,
    'jsx-a11y/label-has-associated-control': 'off',
    'no-nested-ternary': 'off',
    'no-param-reassign': 'off',
    'react/no-unescaped-entities': 'off',
    'react-hooks/exhaustive-deps': 'off',
    'object-curly-newline': 'off',
    'prefer-destructuring': 'off',
    'jsx-a11y/no-noninteractive-tabindex': 'off',
  },
};
