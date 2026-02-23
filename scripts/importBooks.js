// Script used to import the initial book collection from csv data into my user
// Already ran!!

const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");

const { initializeApp } = require("firebase/app");
const { getFirestore, collection, addDoc, Timestamp } =
  require("firebase/firestore");

// firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBb9lT-a44FIIZ4YteiRNcVd0wwO5s8cqo",
  authDomain: "shelved-6e915.firebaseapp.com",
  projectId: "shelved-6e915",
  storageBucket: "shelved-6e915.firebasestorage.app",
  messagingSenderId: "11074947966",
  appId: "1:11074947966:web:0225392722f2b8c45c812f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// my user id for adding initial data! 
const USER_ID = "ypEXlaefLYSyPlXCGNtOHbqg9h23";

const CSV_PATH = path.resolve("./scripts/books.csv");

async function importCSV() {
  const booksRef = collection(db, "users", USER_ID, "books");
  const rows = [];

  fs.createReadStream(CSV_PATH)
    .pipe(csv())
    .on("data", (data) => rows.push(data))
    .on("end", async () => {
      console.log(`Found ${rows.length} rows. Importing...`);

      for (const row of rows) {
        await addDoc(booksRef, {
          title: row.Title,
          author: row.Author,
          year: Number(row.Year),
          pages: Number(row.Pages),
          genre: row.Genre,
          rating: Number(row.Rating),
          review: row.Review?.trim() || null,
          addedAt: Timestamp.now(),
        });
      }

      console.log("✅ Import complete");
      process.exit(0);
    });
}

importCSV();