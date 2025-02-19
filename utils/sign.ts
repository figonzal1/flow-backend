import { createHmac } from 'crypto';

/**
 * Función para firmar parámetros según el formato requerido por Flow.cl.
 * @param params Objeto con los parámetros a firmar.
 * @param secretKey La clave secreta para firmar.
 * @returns Un objeto con los parámetros originales más la firma (parámetro 's').
 */
export const signParams = (
  params: Record<string, string>,
  secretKey: string,
): Record<string, string> => {
  // 1. Ordenar los parámetros alfabéticamente por nombre
  const sortedParams = Object.keys(params)
    .sort()
    .reduce(
      (acc, key) => {
        acc[key] = params[key];
        return acc;
      },
      {} as Record<string, string>,
    );

  // 2. Concatenar los parámetros en el formato requerido
  let stringToSign = '';
  for (const [key, value] of Object.entries(sortedParams)) {
    stringToSign += `${key}${value}`;
  }

  // 3. Firmar el string concatenado usando HMAC-SHA256
  const hmac = createHmac('sha256', secretKey)
    .update(stringToSign)
    .digest('hex');

  // 4. Retornar los parámetros originales más la firma
  return {
    ...params,
    s: hmac,
  };
};
