import conf from "../../conf-var/config";

import { Client, ID, Databases, Storage, Query } from "appwrite";

export class service {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async createPost({ title, slug, content, featuredImage, status, userID }) {
    try {
      return await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug, // ye slug ko document ID ki trh treat krenge
        {
          title,
          content,
          featuredImage,
          status,
          userID,
        }
      );
    } catch (error) {
      console.log("Appwrite service :: createPost :: error", error);
    }
  }

  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      return await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
          title,
          content,
          status,
          featuredImage,
        }
      );
    } catch (error) {
      console.log("Appwrite service :: updatePost :: error", error);
    }
  }

  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
      return true;
    } catch (error) {
      console.log("Appwrite service :: deletePost :: error", error);
      return false;
    }
  }

  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
    } catch (error) {
      console.log("Appwrite service :: getPost :: error", error);
      return false;
    }
  }
  async getEditablePost(slug, userID) {
    try {
      console.log(slug, userID);
      const queries = [Query.equal("userID", userID.toString())];
      return await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        queries
      );
    } catch (error) {
      console.log("Appwrite service :: getEditablePost :: error", error);
      return false;
    }
  }

  async allPost(queries = [Query.equal("status", "active")]) {
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        queries
      );
    } catch (error) {
      console.log("Appwrite service :: allPost :: error", error);
      return false;
    }
  }

  // file upload services

  async uploadFile(file) {
    try {
      return await this.bucket.createFile(
        conf.appwriteBucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log("Appwrite service :: uploadFile :: error", error);
      return false;
    }
  }

  async deleteFile(fileID) {
    // Appwrite me file delete karne ke liye exact fileID dena zaroori hai, parameter me kuch v pass kr skte h but andr v wo consist krna chahiye
    try {
      await this.bucket.deleteFile(conf.appwriteBucketId, fileID);
      return true;
    } catch (error) {
      console.log("Appwrite service :: deleteFIle :: error", error);
      return false;
    }
  }

  getFileView(fileID) {
    return this.bucket.getFileView(conf.appwriteBucketId, fileID); // filePreview not working because of free tier
  }
}

const SERVICE = new service();

export default SERVICE;

// bhot se jgh slug ko as id use kiya gya h
