import conf from "../../conf-var/config"; // Importing configuration variables from a separate file

import { Client, Account, ID } from "appwrite";

export class authService {
  client = new Client();
  account;

  constructor() {
    // class ka cunstructor automatic call hota h jb v existing class ka use kr k new class bnaya jta h.
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);

    this.account = new Account(this.client);
  }
  async createAccount({ name, email, password  }) {
    // yha hm without culry braces prop v pass kr skte the but user accout me prop.email etc dena prta
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email.trim(),
        password,
        name
      );
      if (userAccount) {
        // call another method
        return this.login({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      console.log("Appwrite service :: create :: error", error);
      throw error;
    }
  }

  async login({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      console.log(
        "Appwrite service :: createEmailPasswordSession :: error",
        error
      );
      throw error;
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log("Appwrite service :: getCurrentUser :: error", error);
      
    }

    return null;
  }

  async logout() {
    try {
      await this.account.deleteSessions();
    } catch (error) {
      console.log("Appwrite service :: logout :: error", error);
      throw error;
    }
  }
}

const Authentication = new authService();

export default Authentication;

// 🔐 authService.js - Authentication Utility using Appwrite

/*
1️⃣ Client Setup:
----------------
- `Client()` → Appwrite ka core object hota hai jo server se connection banata hai.
- `setEndpoint()` → Appwrite instance ka URL set karta hai.
- `setProject()` → Project ID set karta hai (jo Appwrite console se milta hai).
- `this.account = new Account(this.client)` → Account se related sabhi actions ke liye ek object banta hai.

2️⃣ createAccount():
--------------------
- New user account banata hai Appwrite ke `account.create()` function se.
- Parameters: unique ID, email, password, name.
- Agar account successfully ban gaya, toh automatically `login()` call hoti hai.
- ⚠️ Error aane par console me error log hota hai. (Optionally `throw error` add karo.)

3️⃣ login():
------------
- User ko login karta hai using email & password.
- Appwrite ka function: `createEmailPasswordSession()`
- ⚠️ Agar login fail ho jaata hai, toh error log karta hai. (Return value handle karo.)

4️⃣ getCurrentUser():
---------------------
- Logged-in user ki current info fetch karta hai.
- Appwrite function: `account.get()`
- ⚠️ Agar session expire ya invalid ho, toh null return karta hai.

5️⃣ logout():
-------------
- Current user ke sabhi sessions ko destroy karta hai.
- Iska use full logout ke liye hota hai.
- Appwrite function: `account.deleteSessions()`

6️⃣ Export:
-----------
- Class ka ek instance `Authentication` banaya gaya hai.
- Usko `export default` kiya gaya hai taaki baahar ke files me direct use ho sake:
  Example: 
    import Authentication from "../services/authService";
    await Authentication.login({ email, password });

🔁 Structure Overview:
----------------------
authService class
├── this.client   → Appwrite Client instance
├── this.account  → Appwrite Account instance
├── createAccount()
├── login()
├── getCurrentUser()
└── logout()
*/
