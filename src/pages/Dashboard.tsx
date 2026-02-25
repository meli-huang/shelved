import React, { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import Spine from "../components/Spine";
import KeyPopUp from "../components/KeyPopUp";
import BookPopUp from "../components/BookPopUp";

interface Book {
  id: string;
  title: string;
  rating: number;
  pages: number;
  genre: string;
}

interface DashboardProps {
  userId: string;
}

const Dashboard: React.FC<DashboardProps> = ({ userId }) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [showKey, setShowKey] = useState(false);
  const navigate = useNavigate();

  const [selectedBook, setSelectedBook] = useState<{
    book: Book;
    color: string;
  } | null>(null);

  // use onSnapshot to open a websocket connection to the firestore db
  // always continuous refreshing of the pages
  // onSnapshot returns unsubscribe() function, you call it at the end to clean up
  useEffect(() => {
    const ref = collection(db, "users", userId, "books");
    const unsubscribe = onSnapshot(ref, (snapshot) => {
      const data: Book[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Book, "id">),
      }));
      setBooks(data);
    });

    return () => unsubscribe();

  }, [userId]);


  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#F4EFE6",
      }}
    >


      {/* Wraps the background content in a conditional blur for the book pop up */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          filter: selectedBook ? "blur(6px)" : "none",
          transition: "filter 0.2s ease",
        }}
      >

      {/* Logout button */}
      <button
        onClick={handleLogout}
        style={{
          position: "absolute",
          top: "40px",
          left: "40px",
          padding: "8px 16px",
          cursor: "pointer",
          color: "#7A4B3A",
          backgroundColor: "#F4EFE6",
          border: "2.5px solid #7A4B3A",
          borderRadius: "999px",
          fontSize: "1.2rem",
          fontWeight: "normal",
        }}
      >
        ← log out
      </button>


      {/* Shelf Area */}
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "flex-end",
          marginTop: "60px",
          gap: "10px",
          overflowX: "auto",     // horizontal scroll
          overflowY: "hidden",
          paddingLeft: "240px",
        }}
      >
        {/* Left Vertical Button */}
        <button
          onClick={() => navigate("/shelve")}
          style={{
            position: "fixed",
            writingMode: "vertical-rl",
            transform: "rotate(180deg)",
            height: "40%",
            border: "2.5px solid #7A4B3A",
            borderRadius: "20px",
            color: "#7A4B3A",
            backgroundColor: "#F4EFE6",
            padding: "0px 20px",
            cursor: "pointer",
            fontSize: "1.6rem",
            marginLeft: "-200px",
            marginBottom: "40px",
            zIndex: "100",
          }}
        >
          + shelve a book!
        </button>

        
        {books.map((book, index) => (
          <Spine
            key={book.id}
            book={book}
            colorIndex={index}
            onClick={(color) => setSelectedBook({ book, color })}
          />
        ))}
      </div>

      {/* Bottom Bar */}
      <div
        style={{
          height: "140px",
          backgroundColor: "#7A4B3A",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 40px",
          color: "#F4EFE6",
        }}
      >
        <button
          onClick={() => setShowKey(true)}
          style={{
            background: "transparent",
            border: "none",
            color: "#F4EFE6",
            fontSize: "5rem",
            cursor: "pointer",
          }}
        >
          *
        </button>

        <div style={{ fontSize: "4rem" }}>shelved</div>
      </div>


      {/* Key Pop Up Modal */}
      <KeyPopUp
        isOpen={showKey}
        onClose={() => setShowKey(false)}
      />

      </div>


      {/* Book pop up depending on what book is selected */}
      {selectedBook && (
        <BookPopUp
          book={selectedBook.book}
          borderColor={selectedBook.color}
          onClose={() => setSelectedBook(null)}
        />
      )}


    </div>
  );
};

export default Dashboard;