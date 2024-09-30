
import graphqlRequest from "../../utils/api/shopify/request";

// get a Shopify customer
export const getShopifyCustomer = async (data: { [key: string]: unknown }): Promise<unknown>  => {
    const buildQuery = (data: { [key: string]: unknown }) => {
        let queryParts = []
        if (data.email) {
            queryParts.push(`email:${data.email}`)
        }
        if (data.phone) {
            queryParts.push(`phone:${data.phone}`)
        }
        return queryParts.join(" OR ")
    }

    const query = `
        query getCustomer($query: String!) {
            customers(first: 10, query: $query) {
                edges {
                    node {
                        id
                        email
                        firstName
                        lastName
                        phone
                        note
                        state
                        emailMarketingConsent {
                            marketingOptInLevel
                            marketingState
                        }
                        smsMarketingConsent {
                            consentCollectedFrom
                            marketingOptInLevel
                            marketingState
                        }
                        tags
                    }
                }
            }
        }`

    const searchQuery = buildQuery(data)
    const variables = { query: searchQuery }

    try {

        const payload = {
            url: process.env.SHOPIFY_TOKEN || '',
            type: 'POST',
            token: process.env.SHOPIFY_TOKEN || '',
            query,
            variables
        }
        const response = await graphqlRequest(payload)
        return response
    } catch (error) {
        console.error('Failed to fetch Shopify customer:', error)
        throw error
    }
}


// create a Shopify customer
export const createShopifyCustomer = async (data: { [key: string]: unknown })  => {
    const query = `
        mutation customerCreate($input: CustomerInput!) {
            customerCreate(input: $input) {
                customer {
                    id
                    email
                    firstName
                    lastName
                    phone
                    note
                    tags
                    // Add other fields as needed
                }
                userErrors {
                    field
                    message
                }
            }
        }`;
    
        const variables = {
            input: {
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                phone: data.phone,
                note: data.note,
                tags: data.tags,
            }
        };

        try {
            const payload = {
                url: process.env.SHOPIFY_TOKEN || '',
                type: 'POST',
                token: process.env.SHOPIFY_TOKEN || '',
                query,
                variables
            }
            const response= await graphqlRequest(payload)
            console.log('created customer:', response)
            // if (response.customerCreate.userErrors.length > 0) {
            //     console.error('Errors:', response.customerCreate.userErrors);
            //     throw new Error('Failed to create customer due to user input errors.');
            // }
            // return response.customerCreate.customer;
        } catch (error) {
            console.error('Failed to create Shopify customer:', error);
            throw error;
        }
}