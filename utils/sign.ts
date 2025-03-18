import { createHmac } from 'crypto';

/**
 * Función para firmar parámetros según el formato requerido por Flow.cl.
 * @param params Objeto con los parámetros a firmar.
 * @param secretKey La clave secreta para firmar.
 * @returns Un objeto con los parámetros originales más la firma (parámetro 's').
 */
export const signParams = (
  params: Record<string, string | number>,
  secretKey: string,
): Record<string, string> => {
  const sortedParams = Object.keys(params).sort();
  const toSign = sortedParams.map((key) => key + String(params[key])).join('');

  const hmac = createHmac('sha256', secretKey).update(toSign).digest('hex');

  return {
    ...params,
    s: hmac,
  };
};
