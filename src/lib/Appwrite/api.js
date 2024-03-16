import { ID, Query } from "appwrite";
import {
  account,
  appwriteConfig,
  avatars,
  databases,
  storage,
} from "./appwriteConfig";

export const createUserAccount = async (user) => {
  try {
    const newUser = await account.create(
      ID.unique(),
      user.email,
      user.password,
      user.name
    );
    if (!newUser) throw error;
    //console.log("newuser",newUser)

    const avatarUrl = avatars.getInitials(user.name);
    //console.log(avatarUrl);

    const savedUser = await saveUserToDB({
      accountId: newUser.$id,
      name: newUser.name,
      email: newUser.email,
      username: user.username,
      imageUrl: avatarUrl,
      imageId: newUser.$id,
    });

    return savedUser;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const saveUserToDB = async (user) => {
  try {
    const savedUser = databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      user
    );
    return savedUser;
  } catch (error) {
    console.log(error);
  }
};

export const signInUserAccount = async (user) => {
  try {
    const session = account.createEmailSession(user.email, user.password);
    return session;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();
    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );

    if (!currentUser) throw error;
    //console.log("curr",currentUser)
    return currentUser.documents[0];
  } catch (error) {}
};

export const signOutUserAccount = async () => {
  try {
    const session = await account.deleteSession("current");
    return session;
  } catch (error) {
    console.log(error);
  }
};

export const createPost = async (post) => {
  try {
    const files = await storage.createFile(
      appwriteConfig.mediaId,
      ID.unique(),
      post.file
    );
    // console.log(files)

    if (!files) throw error;
    const fileUrl = storage.getFilePreview(appwriteConfig.mediaId, files.$id);
    if (!fileUrl) {
      await storage.deleteFile(appwriteConfig.mediaId, files.$id);
      throw error;
    }

    const newPost = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postCollectionId,
      ID.unique(),
      {
        creator: post.creator,
        caption: post.caption,
        imageUrl: fileUrl,
        imageId: files.$id,
        tags: post.tages,
        location: post.location,
      }
    );

    if (!newPost) {
      await storage.deleteFile(appwriteConfig.mediaId, files.$id);
      throw error;
    }

    return newPost;
  } catch (error) {}
};

export const getRecentPosts = async () => {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.postCollectionId,
      [Query.orderDesc("$createdAt"), Query.limit(20)]
    );

    if (!posts) throw error;
    return posts.documents;
  } catch (error) {
    console.log(error);
  }
};

export const likePost = async (postId, likesArray) => {
  try {
    const updatePost = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postCollectionId,
      postId,
      {
        likes: likesArray,
      }
    );

    if (!updatePost) throw error;
    return updatePost;
  } catch (error) {
    console.log(error);
  }
};

export const savePost = async (postId, userId) => {
  try {
    const updatePost = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.saveCollectionId,
      ID.unique(),
      {
        post: postId,
        user: userId,
      }
    );
    if (!updatePost) throw error;
    return updatePost;
  } catch (error) {
    console.log(error);
  }
};

export const deleteSavePost = async (savedRecordId) => {
  try {
    const updatePost = await databases.deleteDocument(
      appwriteConfig.databaseId,
      appwriteConfig.saveCollectionId,
      savedRecordId
    );
    if (!updatePost) throw error;
    return { status: "ok" };
  } catch (error) {
    console.log(error);
  }
};

export const getPostById = async (postId) => {
  try {
    const post = await databases.getDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postCollectionId,
      postId
    );
    if (!post) throw error;
    return post;
  } catch (error) {
    console.log(error);
  }
};

export const updatePost = async (post) => {
  try {
    //const file = await storage.getFile(post.)
    const updatePost = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postCollectionId,
      post.$id,
      post
    );
    return updatePost;
  } catch (error) {
    console.log(error);
  }
};

export const getSavedPost = async (post) => {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.saveCollectionId
    );

    const x = posts.documents
      .filter((ele) => !post.includes(ele.$id))
      .map((ele) => ele.post);
    console.log(x);
    return x;
  } catch (error) {
    console.log(error);
  }
};

export const getAllUsers = async () => {
  try {
    const users = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,

    );
    console.log(users.documents)
    return users.documents;
  } catch (error) {
    console.log(error);
  }
};
