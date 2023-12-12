import videoService from "./service.js"
import multer from "multer"

function VideoRoutes(app) {
    const upload = multer()
    /**
     * Upload a video.
     */
    app.post("/upload", upload.single('video'), async (req, res) => {
        const file = req.file
        const data = JSON.parse(req.body.data);
        await videoService.uploadVideo(file, data, "1234").then(video =>
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

    app.get('/trending', async (req, res) => {
        console.log("In here.")
        await videoService.getTrendingVideos().then(data =>
            res.status(200).send(data)
            ).catch(error => {
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
    app.post("/comment", async (req, res) => {
        console.log("In /comment")
        console.log(req.body)
        try {
            const { videoId, userId, comment } = req.body;
    
            await videoService.uploadComment(videoId, userId, comment);
    
            res.status(200).send({ success: true });
        } catch (error) {
            console.log("In catch /comment")
            res.status(error.httpStatus || 500).send(error.message || 'Internal Server Error');
        }
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