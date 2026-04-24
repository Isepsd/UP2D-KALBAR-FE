export function cdnUrl(str: string) {
  const appAlias = process.env.APP_ALIAS
  return '/media/'+str?.replace(`/${appAlias}/`, '')
}