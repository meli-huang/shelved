import React, { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import Spine from "../components/Spine";
import KeyPopUp from "../components/KeyPopUp";

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
          fontSize: "24px",
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
          padding: "0px",
          marginTop: "60px",
          gap: "10px",
        }}
      >
        {/* Left Vertical Button */}
        <button
          onClick={() => navigate("/shelve")}
          style={{
            writingMode: "vertical-rl",
            transform: "rotate(180deg)",
            height: "50%",
            border: "2.5px solid #7A4B3A",
            borderRadius: "20px",
            color: "#7A4B3A",
            background: "transparent",
            padding: "20px",
            cursor: "pointer",
            fontSize: "32px",
            margin: "40px",
            marginRight: "150px",
          }}
        >
          + shelve a book!
        </button>

        {books.map((book, index) => (
          <Spine
            key={book.id}
            book={book}
            colorIndex={index}
            onClick={() => navigate(`/book/${book.id}`)}
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
            fontSize: "100px",
            cursor: "pointer",
          }}
        >
          *
        </button>

        <div style={{ fontSize: "80px" }}>shelved</div>
      </div>


      {/* Key Pop Up Modal */}
      <KeyPopUp
        isOpen={showKey}
        onClose={() => setShowKey(false)}
      />

    </div>
  );
};

export default Dashboard;