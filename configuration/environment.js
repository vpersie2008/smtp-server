let environmentConfig = {
    host: "http://localhost:3000",
};

if (process.env.NODE_ENV == "DEV") {
    return environmentConfig;
} else if (process.env.NODE_ENV == "GQC") {
    environmentConfig.host = "http://172.16.168.84:3000"
    return environmentConfig;
} else if (process.env.NODE_ENV == "PRE") {
    environmentConfig.host = "http://sandboxapis.newegg.org"
    return environmentConfig;
} else if (process.env.NODE_ENV == "PRD") {
    environmentConfig.host = "http://apis.newegg.org"
    return environmentConfig;
}

module.exports = environmentConfig