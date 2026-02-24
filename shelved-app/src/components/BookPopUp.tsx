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

    // background of a book
    <div
      style={{
        width: "100vw", 
        height: "100vh",
        backgroundColor: "#7b4a3b",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "80vw",
          height: "70vh",
          maxHeight: "1000px",
          maxWidth: "1400px",
          backgroundColor: "#a4c8e3",
          padding: "30px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            backgroundColor: "#e8dfcf",
            display: "flex",
            width: "95%",
            height: "100%",
          }}
        >
          
          {/* Left Side */}
          <div
            style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                color: "#6b4032",
                margin: "50px",
                textAlign: "center",
                gap: "40px",
            }}
          >
            <div style={{fontSize: "60px"}}>
                {book.title}
            </div>
            <div style={{fontSize: "28px"}}>
                By: {book.author}
            </div>
          </div>


          {/* Divider made up of stars! */}
          <div
            style={{
              writingMode: "vertical-rl",
              transform: "rotate(180deg)",
              fontSize: "60px",
              color: "#7A4B3A",
              overflow: "hidden",
            }}
          >
            {"*".repeat(30)}
          </div>


            {/* Right Side */}
            <div
                style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "flex-start",
                marginLeft: "60px",
                marginRight: "60px",
                color: "#6b4032",
                }}
            >
                <div style={bookDataStyle}>
                    <b style={bookDataStyle}> Rating: </b>{"⭐️".repeat(book.rating)}</div>
                <div style={bookDataStyle}>
                    <b style={bookDataStyle}> Genre: </b>{book.genre}</div>
                <div style={bookDataStyle}>
                    <b style={bookDataStyle}> Number of Pages: </b>{book.pages}</div>
                <div style={bookDataStyle}>
                    <b style={bookDataStyle}> Year Published: </b>{book.year}</div>

                <div style={bookDataStyle}>
                    <b style={bookDataStyle}> Book Review: </b>
                    <br></br>
                    <div style={reviewTextStyle}>
                      {book.review != null ? book.review : "No review yet!"}
                    </div>
                </div>

                <button 
                    style={{
                        padding: "16px",
                        backgroundColor: "#6b4032",
                        color: "#e8dfcf",
                        border: "none",
                        marginTop: "20px",
                        cursor: "pointer",
                        borderRadius: "999px",
                        fontSize: "20px",
                        fontWeight: "bold",
                    }}
                    onClick={() => navigate("/")}> 
                    ← back to my shelf
                </button>
            
            </div>
        </div>
      </div>
    </div>
  );
};

const bookDataStyle: React.CSSProperties = {
  fontSize: "26px",
  marginTop: "10px",
  marginBottom: "10px",
}

const reviewTextStyle: React.CSSProperties = {
  margin: "16px 0px",
  fontSize: "22px",
}



export default BookPopUp;