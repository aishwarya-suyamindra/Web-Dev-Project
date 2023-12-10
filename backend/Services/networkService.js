import axios from "axios"

const networkService = () => {


    const innerFunctions = {
        /**
         * 
         * Makes a GET request to the remote API with the given headers and returns a Promise.
         * 
         * @param {String} path The request path
         * @param {Object} headers The http headers to add to the request
         * @param {Object} params The query parameters
         */
        get: async (path, headers, params) => {
            const BASE_URL = process.env.BASE_API_URL
            return new Promise((resolve, reject) => {
                var url = BASE_URL + path
                axios.get(url, {
                    params: params,
                    headers: headers
                }).then((res) => {
                    const data = res.data
                    const statusCode = res.status
                    resolve({data, statusCode})
                }).catch((error) => {
                    reject(new Error('Request failed:' + error))
                })
            })
        }
    }
    return innerFunctions
}

export default networkService()
