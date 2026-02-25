interface BookPopUpProps {
  book: any;
  borderColor: string;
  onClose: () => void;
}

const BookPopUp: React.FC<BookPopUpProps> = ({ book, borderColor, onClose}) => {
  return (
    
    // background of book = blurred and clicks to return
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0,0,0,0.35)",
        backdropFilter: "blur(4px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
      onClick={onClose}
    >

      {/* actual book pop up */}
      <div
        style={{
          width: "80vw",
          height: "70vh",
          maxHeight: "1000px",
          maxWidth: "1400px",
          backgroundColor: borderColor,
          padding: "30px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          style={{
            backgroundColor: "#F4EFE6",
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
            <div style={{fontSize: "3rem"}}>
                {book.title}
            </div>
            <div style={{fontSize: "1.4rem"}}>
                By: {book.author}
            </div>
          </div>


          {/* Divider made up of stars! */}
          <div
            style={{
              writingMode: "vertical-rl",
              transform: "rotate(180deg)",
              fontSize: "3rem",
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
                        color: "#F4EFE6",
                        border: "none",
                        marginTop: "20px",
                        cursor: "pointer",
                        borderRadius: "999px",
                        fontSize: "1rem",
                        fontWeight: "bold",
                    }}
                    onClick={onClose}> 
                    ← back to my shelf
                </button>
            
            </div>
        </div>
      </div>
    </div>
  );
};

const bookDataStyle: React.CSSProperties = {
  fontSize: "1.3rem",
  marginTop: "10px",
  marginBottom: "10px",
}

const reviewTextStyle: React.CSSProperties = {
  margin: "16px 0px",
  fontSize: "1.1rem",
}



export default BookPopUp;