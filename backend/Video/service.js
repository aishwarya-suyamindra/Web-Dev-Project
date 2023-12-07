import videoDao from "./dao.js"
import CustomHTTPError from "../Util/customError.js"

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
                return await videoDao.uploadVideo(res._id, file, data.title)
                .then(video => video)
                .catch(error => {
                    throw new CustomHTTPError(error, 500)
                }) 
            }).catch(error => {
                throw new CustomHTTPError(error, 404)
            })
        }
    }
    
    return innerFunctions
}

export default videoService()