import videoDao from "./dao.js"
import CustomHTTPError from "../Util/customError.js"
import networkService from "../Services/networkService.js"
import * as fs from 'fs'

const videoService = () => {
    const innerFunctions = {
        /**
         * Uploads the video with the given data, for the user.
         * 
         * @param {*} file 
         * @param {*} data 
         * @param {*} userId 
         */
        uploadVideo: async(file, data, userId) => {
            return await videoDao.createVideoMetadata(file, data, userId).then(async (res) => {
                return await videoDao.uploadVideo(res._id, file)
                .then(video => video)
                .catch(error => {
                    throw new CustomHTTPError(error, 500)
                }) 
            }).catch(error => {
                throw new CustomHTTPError(error, 404)
            })
        },

        /**
         * Retrieves the video from the local database if available, else the remote API.
         * 
         * @param {String} id 
         * @param {Number} startRange
         * @param {Number} endRange
         */
        getVideo: async(id, startRange, endRange) => {
            // look for the video in the database
            const isvideoAvailable = await videoDao.isvideoAvailable(id)
            
            if (isvideoAvailable) {
                const videoFiles = await videoDao.getVideoFiles(id)
                // validate videoFiles
                const videoData = await videoDao.getVideoMetaData(id)
                const CHUNK_SIZE = 256 * 1024 // chunk size of 255KB.
                const end = Math.min(startRange + CHUNK_SIZE - 1, videoFiles[0].length - 1)
                const stream = await videoDao.downloadVideo(videoFiles[0]._id, startRange, Number(end))
                const obj = {
                    start: startRange,
                    end: end,
                    fileLength: videoFiles[0].length-1,
                    contentLength: end - startRange,
                    mimeType: videoData.mimeType,
                    stream: stream
                }
                return obj
            } else {
                // look for the video in the remote api
                const headers = {
                    'Range': 'bytes=' + startRange + "-" + endRange
                }
                networkService.get('/videos/${id}', headers)
                .then((data, statusCode) => {
                    if (statusCode >= 200 && statusCode < 300) {
                        console.log("Received data successfully!", data)
                        return data
                    } else {
                        console.log("Failed:", data, statusCode)
                        throw new CustomHTTPError(data, statusCode)
                    }
                })
                .catch(error => {
                    console.log("Error: ", error)
                })
            }
        }
    }
    
    return innerFunctions
}

export default videoService()