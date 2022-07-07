import Rollbar from "rollbar";

const rollbar = new Rollbar({
  accessToken: process.env.ROLLBAR_ACCESS_TOKEN,
  environment: process.env.NODE_ENV || "development",
  captureUncaught: true,
  captureUnhandledRejections: true,
});

export const logError = (key: any, msg: any) => {
  console.error(key, msg);
  rollbar.error({ key: key }, msg);
};

export const logInfo = (key: any, msg: any) => {
  console.info(key, msg);
  rollbar.info({ key: key }, msg);
};
