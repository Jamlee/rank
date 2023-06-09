import { MongoClient } from 'mongodb'

// 默认连接数据库
let MONGODB_URI = process.env.MONGODB_URI
if (!MONGODB_URI) {
    throw new Error('env MONGODB_URI not found')
}

const uri = MONGODB_URI
const options = {}
let clientPromise: Promise<MongoClient>
let client = new MongoClient(uri, options)
clientPromise = client.connect()
export default clientPromise