import mongoose from "mongoose"
import {videoSchema, commentsSchema, activitySchema} from "./schema.js"

export const Video = mongoose.model("videos", videoSchema)

export const Comment = mongoose.model("comments", commentsSchema)

export const Activity = mongoose.model("activity", activitySchema)

