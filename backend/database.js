import mongoose from "mongoose";

class Database {
    instance;
    gridFSBucket;
    get gridFSBucket() {
        return this.gridFSBucket
    }
    set gridFSBucket(value) {
        this.gridFSBucket = value
    }

    async connect(url) {
        try {
            // connect to the database
            mongoose.connect(url)
            // gridfs
            this.gridFSBucket = new mongoose.mongo.GridFSBucket(mongoose.connection, {
                bucketName: 'videos'
            })
        } catch (error) {
            console.error('Error connecting to the database', error.message);
        }
    }

    static dbInstance() { 
        if (!this.instance) {
            this.instance = new Database()
        }
        return this.instance
    }
}

const db = Database.dbInstance()
export default db