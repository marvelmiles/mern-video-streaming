import admin from "firebase-admin";
import dotenv from "dotenv";
dotenv.config();

export const serviceAccount = {
  type: "service_account",
  project_id: "mern-tube",
  private_key_id: process.env.PRIVATE_KEY_ID,
  private_key: process.env.PRIVATE_KEY,
  client_email: "firebase-adminsdk-uo2s2@mern-tube.iam.gserviceaccount.com",
  client_id: "115110927710436830744",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url:
    "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-uo2s2%40mern-tube.iam.gserviceaccount.com"
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

export default admin;
