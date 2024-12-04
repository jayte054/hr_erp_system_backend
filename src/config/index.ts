import dotenv from 'dotenv';
dotenv.config();
import merge from 'lodash.merge'


const stage = process.env.STAGE;

let envConfig;

if (stage === "production") {
    envConfig = require("./prod").default;
} else if (stage === "local") {
    envConfig = require("./local").default;
}

export default merge({stage}, envConfig)
