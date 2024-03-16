import { Account, Avatars, Client, Databases, Storage } from "appwrite"

export const appwriteConfig = {
    url:"https://cloud.appwrite.io/v1",
    projectId:import.meta.env.VITE_APPWRITE_PROJECT_ID,
    databaseId:import.meta.env.VITE_APPWRITE_DATABASE_ID,
    userCollectionId:import.meta.env.VITE_APPWRITE_USER_COLLECTION_ID,
    postCollectionId:import.meta.env.VITE_APPWRITE_POST_COLLECTION_ID,
    saveCollectionId:import.meta.env.VITE_APPWRITE_SAVE_COLLECTION_ID ,
    mediaId:import.meta.env.VITE_APPWRITE_MEDIA_ID
}

export const client = new Client();
client.setEndpoint(appwriteConfig.url);
client.setProject(appwriteConfig.projectId)

export const account = new Account(client);
export const storage = new Storage(client);
export const databases = new Databases(client);
export const avatars = new Avatars(client);