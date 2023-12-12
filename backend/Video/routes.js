import videoService from "./service.js"
import multer from "multer"
import authenticateToken from "../Util/authMiddleware.js"

function VideoRoutes(app) {
    const upload = multer()
    /**
     * Upload a video.
     */
    app.post("/upload", authenticateToken, upload.single('video'), async (req, res) => {
        const file = req.file
        const data = JSON.parse(req.body.data);
        const userId = req.user._id
        await videoService.uploadVideo(file, data, userId).then(video =>
            res.status(200).send(video)
        ).catch(error => {
            res.status(error.httpStatus).send(error.message)
        })
    })

    /**
     * Return a video based on the id.
     */
    app.get("/video/:id", async (req, res) => {
        const videoId = req.params.id
        const range = req.headers.range
        // Validate range header
        if (!range) {
            res.status(400).send("Range header is required.")
            return
        }
        const rangeComponents = range.replace(/bytes=/, '').split('-')
        if (rangeComponents.length !== 2) {
            res.status(400).send("Invalid range header.")
            return
        }
        const start = Number(rangeComponents[0])
        const end = rangeComponents[1]
        await videoService.getVideo(videoId, start, end).then(data => {
            // Set HTTP headers
            res.setHeader('Content-Range', `bytes ${data.start}-${data.end}/${data.fileLength}`);
            res.setHeader('Accept-Ranges', 'bytes');
            res.setHeader('Content-Length', data.contentLength);
            res.setHeader('Content-Type', data.mimeType);
            res.status(206)
            data.stream.pipe(res)
        }).catch(error => {
            res.status(error.httpStatus).send(error.message)
        })
    })

    /**
     * Return trending videos.
     */
    app.get('/trending', async (req, res) => {
        console.log("In here.")
        await videoService.getTrendingVideos().then(data =>
            res.status(200).send(data)
            ).catch(error => {
                res.status(error.httpStatus).send(error.message)
            })
    })

    /**
     * Add a comment for the video.
     */
    app.post('/comments/:id', authenticateToken, async (req, res) => {
        const data = req.body.data;
        const videoId = req.params.id
        const userId = req.user._id
        await videoService.addComment(userId, videoId, data).then(_ => 
            res.sendStatus(200))
        .catch(error => {
            res.status(error.httpStatus).send(error.message)
        })
    })

    /**
     * Get all comments for a video.
     */
    app.get('/comments/:id', async (req, res) => {
        const videoId = req.params.id
        await videoService.getComments(videoId).then((data) =>
            res.status(200).send(data))
        .catch(error => {
            res.status(error.httpStatus).send(error.message)
        })
    })
    app.get('/searchBar/:searchKey', async (req, res) => {
        console.log("In search.:")
        console.log(req.params.searchKey)
        await videoService.getSearchVideos(req.params.searchKey).then(data =>
            res.status(200).send(data)
            ).catch(error => {
                res.status(error.httpStatus).send(error.message)
            })
    })

    app.get("/getComment/:videoId", async (req, res) => {
        await videoService.getComments(req.params.videoId).then(data =>
            res.status(200).send(data)
            ).catch(error => {
                res.status(error.httpStatus).send(error.message)
            })
    })
}

export default VideoRoutes;