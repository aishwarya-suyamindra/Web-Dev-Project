import { Video, Comment, Activity } from "./model.js"
import database from "../database.js"
import shortid from "shortid"

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
         * Returns the video metadata that matches a word in the description.
         * 
         * @param {string} searchKey - The word to search for in the video descriptions.
         * @returns {Array} - An array of video metadata objects that match the searchKey.
         */
        getVideoMetaDataMatching: async (searchKey) => {
            const allVideos = await Video.find();
            console.log("all vids: "+allVideos)
            if(allVideos!=undefined){
                return allVideos;
            }
            else{
                return {}
            }
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
         * Adds a comment to the DB.
         * 
         * @returns 
         */
        createComment: async (videoId, userId, comment) => {
            try {
                // Create a new comment instance
                const newComment = new Comment({
                  videoId,
                  userId,
                  comment,
                });
          
                // Save the comment to the database
                const out = await newComment.save();
                console.log("comment: "+out)
                return out;
              } catch (error) {
                // Handle errors, log them, and throw if necessary
                console.error('Error uploading comment:', error);
                throw new CustomHTTPError(error, 500)
              }
        
        },
        /**
         * Gets comment to the DB.
         * 
         * @returns 
         */
        getComment: async (videoId) => {
            try {
                // Query the database for comments with the specified videoId
                const comments = await Comment.find({ videoId });
          
                return comments;
              } catch (error) {
                // Handle errors, log them, and throw if necessary
                console.error('Error getting comments by videoId:', error);
                throw new CustomHTTPError(error, 500)
              }
        
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