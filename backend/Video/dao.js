import { Video, Comment, Activity } from "./model.js"
import database from "../database.js"

const videoDAO = () => {
    const innerFunctions = {
        /**
         * Validates if a video with the given id is present in the database.
         * 
         * @param {String} id video Id
         */
        isvideoAvailable: async (id) => {
            const video = await Video.findById(id)
            return video ? true : false
        },

        /**
         * Returns the video metadata for the given id.
         * 
         * @param {*} id 
         */
        getVideoMetaData: async (id) => {
            return await Video.findById(id)
        },

        /**
         * Deletes the metadata for the given video id.
         * 
         * @param {*} id 
         */
        deleteVideoMetaData: async (id) => {
            return await Video.deleteOne({ _id: id })
        },

        /**
         * Returns the video for the given id.
         * 
         * @param {*} id 
         */
        getVideo: async (id) => {
            return await database.gridFSBucket.find({ _id: id });
        },

        /**
         * Saves given data as metadata for a video.
         * 
         * @param {*} file
         * @param {*} data 
         * @param {*} userId 
         * @returns 
         */
        createVideoMetadata: async (file, data, userId) => {
            return await Video.create({
                title: data.title,
                description: data.description,
                durationInMilliseconds: 100, //TEST.
                userId: userId,
                mimeType: file.mimetype
            })
        },

        /**
         * Saves the given video.
         * 
         * @param {*} id 
         * @param {*} filePath 
         */
        uploadVideo: async (id, file, filename) => {
            // upload the video to grid fs.
            const metadata = { _id: id }
            const videoUploadStream = await database.gridFSBucket.openUploadStream(filename, {
                metadata: metadata
            })
            await videoUploadStream.write(file.buffer)
            videoUploadStream.end()
            return {'id': id, 'filename': filename}
        }
    }

    return innerFunctions
}

export default videoDAO()