const db_connection = (): string => {
  const url = process.env.DB_CONNECTION
  if (!url) throw new Error('var is not defined')
  return url
}
export default db_connection
