import "server-only";
import { initializeApp, getApps, cert, App } from "firebase-admin/app";
import { getFirestore, Firestore } from "firebase-admin/firestore";
import { getStorage } from "firebase-admin/storage";

let adminApp: App;

function getAdminApp(): App {
  if (getApps().length > 0) {
    adminApp = getApps()[0]!;
  } else {
    const privateKey = process.env.FIREBASE_ADMIN_PRIVATE_KEY;
    const clientEmail = process.env.FIREBASE_ADMIN_CLIENT_EMAIL;
    const projectId = process.env.FIREBASE_ADMIN_PROJECT_ID;

    if (!privateKey || !clientEmail || !projectId) {
      throw new Error(
        "Missing Firebase Admin environment variables. " +
          "Ensure FIREBASE_ADMIN_PRIVATE_KEY, FIREBASE_ADMIN_CLIENT_EMAIL, " +
          "and FIREBASE_ADMIN_PROJECT_ID are set in .env.local"
      );
    }

    adminApp = initializeApp({
      credential: cert({
        projectId,
        clientEmail,
        privateKey: privateKey.replace(/\\n/g, "\n"),
      }),
    });
  }

  return adminApp;
}

let _db: Firestore | undefined;

export function getAdminDb(): Firestore {
  if (!_db) {
    _db = getFirestore(getAdminApp());
    _db.settings({ ignoreUndefinedProperties: true });
  }
  return _db;
}

export function getAdminStorage() {
  return getStorage(getAdminApp()).bucket("stratix-solutions.firebasestorage.app");
}
