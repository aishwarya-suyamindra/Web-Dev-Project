import http from "http"

const networkService = () => {
    const BASE_URL = process.env.BASE_REMOTE_API_URL
    const API_AUTH_TOKEN = process.env.API_AUTH_TOKEN

    const innerFunctions = {
        /**
         * 
         * Makes a GET request to the remote API with the given headers and returns a Promise.
         * 
         * @param {String} path The request path
         * @param {Object} headers The http headers to add to the request
         * @param {Boolean} authorise True by default, adds the bearer token for the remote api
         */
        get: async (path, headers, authorise = true) => {
            return new Promise((resolve, reject) => {
                const url = BASE_URL + path
                url.headers = {
                    'Content-Type': 'application/json',
                    ...headers,
                    ...(authorise) ? { 'Authorization': 'Bearer ' + API_AUTH_TOKEN } : {}
                }

                const req = http.get(url, res => {
                    var data
                    res.on('data', chunk => {
                        data += chunk
                    })

                    // entire data has been received
                    res.on('end', () => {
                        resolve(data, res.statusCode)
                    })
                })

                req.on('error', error => {
                    console.log("Http error:", error)
                    reject(new Error('Request failed:' + error))
                })
            })
        }
    }
    return innerFunctions
}

export default networkService()
