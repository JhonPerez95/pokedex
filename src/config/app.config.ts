export const EmvConfiguration = () => ({
  enviromet: process.env.NODE_ENV || 'dev',
  mongoDb: process.env.MONGODB,
  port: process.env.PORT || 3000,
  defaultLimit: +process.env.DEFAULT_LIMIT || 10,
})
