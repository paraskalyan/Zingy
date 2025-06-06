import { Client, Storage } from "appwrite";

const client = new Client();

client
  .setEndpoint("https://fra.cloud.appwrite.io/v1") // Replace with your endpoint
  .setProject("6842ed370005c55c3380"); // Replace with your project ID

const storage = new Storage(client);

export { storage };
