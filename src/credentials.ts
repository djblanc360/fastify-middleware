
const setGlobalVariables = () => {
    const domainCredentials = {
        environment: process.env.ENV_DEV,
        shopify_token: process.env.SHOPIFY_TOKEN,
        shopify_base_url: process.env.SHOPIFY_BASE_URL,
    }
    global.credentials = domainCredentials
}

export default setGlobalVariables