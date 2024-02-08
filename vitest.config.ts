import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    clearMocks: true,
    coverage: {
      include: ['src/{!(fluent),}/*.ts'],
      exclude: [
        '!src/arrays/List.ts',
        '!src/**/Readonly*.ts'
      ]
    }
  },
})
