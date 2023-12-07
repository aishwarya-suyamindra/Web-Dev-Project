import videoService from "./service.js"
import multer from "multer"

function VideoRoutes(app) {
    const upload = multer()
    /**
     * Upload a video.
     */
    app.post("/upload", upload.single('video') ,async (req, res) => {
        const file = req.file
        const data = JSON.parse(req.body.data);
        await videoService.uploadVideo(file, data, "1234").then(video => 
            res.status(200).send(video)
        ).catch(error => {
            res.status(error.httpStatus).send(error.message)
        })
    })   
}

export default VideoRoutes;