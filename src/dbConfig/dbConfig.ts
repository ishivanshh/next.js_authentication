import mongoose from "mongoose";

type MongooseCache = {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
};

declare global {
    var mongooseCache: MongooseCache | undefined;
}

const MONGO_URI = (process.env.MONGO_URI || process.env.MONGODB_URI || "").trim();

if (!MONGO_URI) {
    throw new Error("Please define the MONGO_URI or MONGODB_URI environment variable in .env");
}

const cached = global.mongooseCache ?? { conn: null, promise: null };

if (!global.mongooseCache) {
    global.mongooseCache = cached;
}

export async function connect() {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        cached.promise = mongoose.connect(MONGO_URI).then((mongooseInstance) => {
            console.log("MongoDB connected successfully");
            return mongooseInstance;
        });
    }

    try {
        cached.conn = await cached.promise;
        return cached.conn;
    } catch (error) {
        cached.promise = null;
        console.log("MongoDB connection error:", error);
        throw error;
    }
}
