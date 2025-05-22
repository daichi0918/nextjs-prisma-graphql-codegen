import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { FlatCompat } from '@eslint/eslintrc'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

const [typescriptEslint, simpleImportSort] = await Promise.all([
  import('@typescript-eslint/eslint-plugin'),
  import('eslint-plugin-simple-import-sort'),
])

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript', 'prettier'),

  {
    plugins: {
      '@typescript-eslint': typescriptEslint.default,
      'simple-import-sort': simpleImportSort.default,
      // ⛔ 'import' は削除！ → すでに `compat.extends(...)` の中で読み込み済み
    },
    rules: {
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
      'import/first': 'error',
      'import/newline-after-import': 'error',
      'import/no-duplicates': 'error',
      '@typescript-eslint/consistent-type-imports': 'error',
    },
  },
]

export default eslintConfig
