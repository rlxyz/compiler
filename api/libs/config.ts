import dotenv from 'dotenv';

if (process.env.NODE_ENV === 'development') {
  dotenv.config();
}

export const config = {
  magicSecretKey: process.env.MAGIC_SECRET_KEY,
  apiSecretKey: process.env.API_SECRET_KEY || 'very secret string',
  databaseUrl: process.env.DATABASE_URL,
  slackWebhookKey: process.env.SLACK_WEBHOOK_KEY || '',
  sendgridApiKey: process.env.SENDGRID_API_KEY || '',
  welcomeEmailTemplateId: process.env.SENDGRID_WELCOME_EMAIL_TEMPLATE_ID || '',
  withdrawalEmailTemplateId: process.env.SENDGRID_WITHDRAWAL_EMAIL_TEMPLATE_ID || '',
  depositEmailTemplateId: process.env.SENDGRID_DEPOSIT_EMAIL_TEMPLATE_ID || '',
  rollbarAccessToken: process.env.ROLLBAR_ACCESS_TOKEN || '',
  environment: process.env.APP_ENV || 'development',
  hubspotApiKey: process.env.HUBSPOT_API_KEY || '',
  clientUrl: process.env.CLIENT_URL || '',
  squareAccessToken: process.env.SQUARE_ACCESS_TOKEN || '',
  wyreApiKey: process.env.WYRE_API_KEY || '',
  wyreApiSecretKey: process.env.WYRE_API_SECRET_KEY || '',
  wyreAccountId: process.env.WYRE_ACCOUNT_ID || '',
  wyreApiUrl: process.env.WYRE_API_URL || 'https://api.testwyre.com',
  wyreCallbackUrl: process.env.WYRE_CALLBACK_URL || '',
};
