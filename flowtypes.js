type AppState = {
  coordinates: {
    x: number,
  },
  fullscreenToggle: boolean,
  readout: Array<Object>,
  sessionId: string,
  uniqueId: string,
};

declare module "finalhandler" {
  declare module.exports: any;
}

declare module "../server/config.js" {
  declare module.exports: any;
}

declare module "../web_modules/base64url.js" {
  declare module.exports: any;
}

declare module "../web_modules/dotenv.js" {
  declare module.exports: any;
}

declare module "../web_modules/immer.js" {
  declare module.exports: any;
}

declare module "../web_modules/screenfull.js" {
  declare module.exports: any;
}

declare module "../web_modules/preact.js" {
  declare module.exports: any;
}

declare module "../web_modules/preact-render-to-string.js" {
  declare module.exports: any;
}

declare module "serve-static" {
  declare module.exports: any;
}

declare module "glob" {
  declare module.exports: any;
}

declare module "../web_modules/should/as-function.js" {
  declare module.exports: any;
}

declare module "../web_modules/preact/hooks.js" {
  declare module.exports: any;
}

declare module "../web_modules/simplestyle-js.js" {
  declare module.exports: any;
}

declare module "../web_modules/htm.js" {
  declare module.exports: any;
}

declare module "../web_modules/preact-router.js" {
  declare module.exports: any;
}

declare module "../web_modules/history.js" {
  declare module.exports: any;
}
