import next from "eslint-config-next"
import nextCoreWebVitals from "eslint-config-next/core-web-vitals"
import nextTypescript from "eslint-config-next/typescript"

/**
 * Flat config (ESLint 9). O `eslint-config-next` 16 já exporta arrays de flat
 * config nativamente — não precisa do FlatCompat.
 *
 * `core-web-vitals` traz React, React Hooks, jsx-a11y e as regras do próprio
 * Next (incluindo `no-img-element`, que é a que pega um `<img>` cru no lugar
 * do `next/image`).
 */
const eslintConfig = [
  {
    ignores: [".next/**", "node_modules/**", "next-env.d.ts", ".v0/**", "public/**"],
  },
  ...next,
  ...nextCoreWebVitals,
  ...nextTypescript,
  {
    rules: {
      // Import ou variável não usada vira erro — foi assim que sobreviveram os
      // componentes órfãos que esta auditoria removeu. `_algo` continua
      // permitido para parâmetro que a assinatura exige mas o corpo ignora.
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_", caughtErrorsIgnorePattern: "^_" },
      ],
      // `any` esconde exatamente o tipo de erro que `ignoreBuildErrors: true`
      // deixava passar.
      "@typescript-eslint/no-explicit-any": "warn",
    },
  },
]

export default eslintConfig
