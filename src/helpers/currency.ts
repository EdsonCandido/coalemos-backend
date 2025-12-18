// currency-safe.ts

/**
 * Representa um valor monetário em centavos (BigInt).
 */
export type Currency = bigint;

/**
 * Detecta a escala decimal de uma string.
 * Ex: "10.50" → 2 casas decimais
 */
function detectScale(value: string): number {
  const decimal = value.split(".")[1];
  return decimal ? decimal.length : 0;
}

/**
 * Converte string decimal segura -> inteiro + escala.
 * Ex: "12.345" -> { int: 12345n, scale: 3 }
 */
function parseDecimalSafe(value: string): { int: bigint; scale: number } {
  const cleaned = value.replace(",", ".").trim();

  if (!/^-?\d+(\.\d+)?$/.test(cleaned)) {
    throw new Error(`Invalid decimal input: ${value}`);
  }

  const scale = detectScale(cleaned);
  const int = BigInt(cleaned.replace(".", ""));
  return { int, scale };
}

/**
 * Converte string/number em Currency (centavos) sem usar float.
 */
export function parseCurrency(value: string | number): Currency {
  const str = value.toString().replace(/\./g, "").replace(",", ".");
  const { int, scale } = parseDecimalSafe(str);

  // Converte a escala atual para 2 casas (centavos)
  if (scale > 2) {
    // Reduz escala (ex.: "10.999" → arredondar)
    const factor = BigInt(10 ** (scale - 2));
    return int / factor;
  }

  if (scale < 2) {
    // Aumenta escala (ex.: "10" → "10.00")
    const factor = BigInt(10 ** (2 - scale));
    return int * factor;
  }

  return int;
}

/**
 * Converte moeda em centavos pra decimal (string exata).
 */
export function centsToDecimalString(cents: Currency): string {
  const sign = cents < 0n ? "-" : "";
  const abs = cents < 0n ? -cents : cents;

  const str = abs.toString().padStart(3, "0");
  const integer = str.slice(0, -2);
  const decimal = str.slice(-2);

  return `${sign}${integer}.${decimal}`;
}

/**
 * Formata para moeda BRL.
 */
export function formatCurrency(value: Currency,  locale = "pt-BR",currency = "BRL"): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(Number(centsToDecimalString(value)));
}

/**
 * Soma
 */
export function add(a: Currency, b: Currency): Currency {
  return a + b;
}

/**
 * Subtração
 */
export function subtract(a: Currency, b: Currency): Currency {
  return a - b;
}

/**
 * Multiplicação segura por BigInt:
 * Valor em centavos * multiplicador decimal (string ou número).
 *
 * EXEMPLOS:
 * multiply(1050n, "0.15") = 157n  (R$ 1,57)
 * multiply(1000n, "2.5")  = 2500n (R$ 25,00)
 */
export function multiply(value: Currency, multiplier: string | number): Currency {
  const { int: mInt, scale } = parseDecimalSafe(multiplier.toString());

  // value está em centavos (2 casas)
  // multiplicador pode ter N casas
  // Resultado deve voltar para 2 casas (centavos)

  // Fórmula: (value * mInt) / 10^scale
  const result = (value * mInt) / BigInt(10 ** scale);

  return result;
}

/**
 * Divisão segura por BigInt.
 *
 * value / divisorDecimal
 */
export function divide(value: Currency, divisor: string | number): Currency {
  const { int: dInt, scale } = parseDecimalSafe(divisor.toString());

  if (dInt === 0n) {
    throw new Error("Division by zero");
  }

  // Para manter precisão, primeiro aumenta escala:
  // (value * 10^scale) / dInt
  const result = (value * BigInt(10 ** scale)) / dInt;

  return result;
}
