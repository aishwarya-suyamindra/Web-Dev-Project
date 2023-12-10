import { Video, Comment, Activity } from "./model.js"
import database from "../database.js"
import shortid from "shortid"
import Readable from "stream"

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
            const video = await Video.findById(id)
            return video._doc
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
         * Returns the video files for the given id.
         * 
         * @param {*} id 
         */
        getVideoFiles: async (id) => {
            const res = []
            const cursor = database.gridFSBucket.find({ filename: id })
            for await (const doc of cursor) {
                res.push(doc)
            }
            return res
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
                _id: shortid(),
                title: data.title,
                description: data.description,
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
        uploadVideo: async (id, file) => {
            return new Promise(async (resolve, reject) => {
                const videoUploadStream = await database.gridFSBucket.openUploadStream(id)
                await videoUploadStream.write(file.buffer)
                videoUploadStream.end()
                videoUploadStream.on("finish", () => {
                    console.log("donez.")
                    resolve({ 'id': id })
                })
            })

        },

        downloadVideo: async (id, start, end) => {
            const videoDownloadStream = await database.gridFSBucket.openDownloadStream(id, {
                start: start,
                end: end
            })
            videoDownloadStream.on('error', (error) => {
                // Handle errors
                console.error('Error downloading file:', error);
            })
            return videoDownloadStream
        }
    }

    return innerFunctions
}

export default videoDAO()