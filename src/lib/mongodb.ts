import { MongoClient, Collection, Db, Document } from 'mongodb';
const USERNAME = process.env.USERNAME_MONGO;
const PASSWORD = process.env.PASS_MONGO;
const MONGO_LOCAL = process.env.MONGO_LOCAL;
const MONGO_DB_NAME = process.env.NAME_DB_MONGO;


const MONGO_CLIENT_URI = MONGO_LOCAL || `mongodb+srv://${USERNAME}:${PASSWORD}@${MONGO_DB_NAME}.un9ru7t.mongodb.net/`;




function createClientPromise(): Promise<MongoClient> {
    const client = new MongoClient(MONGO_CLIENT_URI);
    return client.connect()
        .then((connectedClient) => {
            console.log("✅ Conectado exitosamente a MongoDB Atlas");
            return connectedClient;
        })
        .catch((err) => {
            console.error("❌ Error conectando a MongoDB:", err);
            throw err;
        });
}

let clientDB: Promise<MongoClient>;
declare global {
    var _mongoClientPromise: Promise<MongoClient> | undefined;
}
if (process.env.NODE_ENV === 'development') {
    if (!global._mongoClientPromise) {
        global._mongoClientPromise = createClientPromise();
    }
    clientDB = global._mongoClientPromise;
} else {
    clientDB = createClientPromise();
}
export default clientDB;


// GET COLLECTIONS PARA USAR EN EL API

export const getCollectionsFn = async <T extends Document = Document>({ dbName = "pms-clinic-database", collectionName }: { dbName: string, collectionName: string }): Promise<{ db: Db, collectionFound: Collection<T> }> => {
    const client = await clientDB;
    const db = await client.db(dbName);
    const collectionFound = db.collection<T>(collectionName);

    return { db, collectionFound };
}