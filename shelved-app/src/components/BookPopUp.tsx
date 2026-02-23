import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../firebase";

const BookPopUp: React.FC<{ userId: string }> = ({ userId }) => {
  const { bookId } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState<any>(null);

  useEffect(() => {
    const fetchBook = async () => {
      if (!bookId) return;

      const ref = doc(db, "users", userId, "books", bookId);
      const snap = await getDoc(ref);
      if (snap.exists()) {
        setBook(snap.data());
      }
    };

    fetchBook();
  }, [bookId, userId]);

  if (!book) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>{book.title}</h2>
        <p>Rating: {book.rating}</p>
        <p>Pages: {book.pages}</p>
        <p>Genre: {book.genre}</p>

        <button onClick={() => navigate("/")}>Close</button>
      </div>
    </div>
  );
};

export default BookPopUp;