"use strict";
<<<<<<< HEAD
=======
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mwn_1 = require("mwn");
const config_1 = __importStar(require("./config"));
const logger_1 = __importDefault(require("./logger"));
const log = logger_1.default.extend('bot');
const site = new config_1.Site(), user = new config_1.User(), { getKeyOf, getUserAgent } = user;
try {
    let bot = new mwn_1.mwn({
        apiUrl: site.getSiteApiUrl(),
        OAuthCredentials: {
            consumerSecret: getKeyOf('consumer_secret'),
            consumerToken: getKeyOf('consumer_token'),
            accessSecret: getKeyOf('access_secret'),
            accessToken: getKeyOf('access_token'),
        },
        password: getKeyOf('password'),
        username: config_1.default.username,
        userAgent: getUserAgent(),
        silent: !config_1.default.debug,
        maxRetries: 7,
        defaultParams: {
            assert: 'user',
        },
        shutoff: {
            onShutoff: (wikitext) => {
                throw new Error('Bot had been shutted off\nPage text is ⟩' + wikitext);
                process.exit(1);
            },
            page: 'User:AinalBOT/shutoff',
            condition: (wikitext) => {
                if (wikitext !== 'running')
                    return false;
                return true;
            }
        }
    });
    bot.login();
    bot.getTokensAndSiteInfo();
    export default bot;
}
catch (err) {
    console.log(err);
}
>>>>>>> main
