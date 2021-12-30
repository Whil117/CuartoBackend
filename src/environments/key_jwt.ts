export const KeyJwt = (): string => {
  const key = process.env.DB_CONNECTION
  if (!key) throw new Error('variable mongo indefinida')
  return key
}
