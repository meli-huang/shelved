import { useState } from "react";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "../firebase"; 
import { useNavigate } from "react-router-dom";
import type { Book } from "../types/Book"; 

const GENRES = [
  "contemporary fiction",
  "historical fiction",
  "science fiction",
  "literary fiction",
  "other",
];

type FormState = {
  title: string;
  author: string;
  year: string;
  pages: string;
  rating: number | null;
  genre: string | null;
  review: string;
};

const initialState: FormState = {
  title: "",
  author: "",
  year: "",
  pages: "",
  rating: null,
  genre: null,
  review: "",
};

interface ShelveFormProps {
  userId: string;
}

export default function ShelveForm({ userId } : ShelveFormProps) {
  const [form, setForm] = useState<FormState>(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    
    // handle errors; user must fill in entire form
    if (!form.title.trim() || !form.author.trim() || !form.year || !form.pages || !form.rating || !form.genre) {
      setError("Please fill in all required fields.");
      return;
    }

    setError(null);
    setLoading(true);

    // function to add book into firestore db
    try {
      const newBook: Omit<Book, "id"> = {
        title: form.title.trim(),
        author: form.author.trim(),
        year: parseInt(form.year, 10),
        pages: parseInt(form.pages, 10),
        genre: form.genre,
        rating: form.rating,
        review: form.review.trim() || null,
        addedAt: Timestamp.now(),
      };

      // add document and reset state
      await addDoc(collection(db, "users", userId, "books"), newBook);
      setForm(initialState);
      navigate("/dashboard");

    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>

        {/* Need custom styles css because placeholder not possible otherwise */}
        <style>{`
            input::placeholder,
            textarea::placeholder {
                color: ${CREAM};
                opacity: 0.6;
            }
            input::-webkit-input-placeholder,
            textarea::-webkit-input-placeholder {
                color: ${CREAM};
                opacity: 0.6;
            }

            @keyframes shelve-slide-in {
                from { transform: translateX(-100%); }
                to   { transform: translateX(0); }
            }
            @keyframes shelve-fade-in {
                from { opacity: 0; }
                to   { opacity: 1; }
            }

            backBtn:hover { opacity: 0.7; }
        `}</style>


        {/* Dimmed backdrop of the Dash — click to dismiss */}
        <div
            className="backdrop"
            style={styles.backdrop}
            onClick={() => navigate("/dashboard")}
        />

        {/* Form container -- sliding panel */}
        <div style={styles.container}>

            <button 
                style={styles.backBtn}
                onClick={() => navigate("/")}> 
                ← back
            </button>


            <h2 style={styles.heading}>about this book ...</h2>

            {/* Title */}
            <input
                style={styles.input}
                placeholder="title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
            />

            {/* Author */}
            <input
                style={styles.input}
                placeholder="author"
                value={form.author}
                onChange={(e) => setForm({ ...form, author: e.target.value })}
            />

            {/* Year + Pages */}
            <div style={styles.row}>
                <input
                style={{ ...styles.input, flex: 1 }}
                placeholder="year of publication"
                value={form.year}
                type="number"
                onChange={(e) => setForm({ ...form, year: e.target.value })}
                />
                <input
                style={{ ...styles.input, flex: 1 }}
                placeholder="number of pages"
                value={form.pages}
                type="number"
                onChange={(e) => setForm({ ...form, pages: e.target.value })}
                />
            </div>

            {/* Rating */}
            <label style={styles.label}>rating:</label>
            <div style={styles.row}>
                {[1, 2, 3, 4, 5].map((star) => (
                <button
                    key={star}
                    style={{
                    ...styles.pill,
                    ...(form.rating === star ? styles.pillActive : {}),
                    }}
                    onClick={() => setForm({ ...form, rating: star })}
                >
                    {"⭐️".repeat(star)}
                </button>
                ))}
            </div>

            {/* Genre */}
            <label style={styles.label}>genre:</label>
            <div style={styles.genreGrid}>
                {GENRES.map((g) => (
                <button
                    key={g}
                    style={{
                    ...styles.pill,
                    ...(form.genre === g ? styles.pillActive : {}),
                    }}
                    onClick={() => setForm({ ...form, genre: g })}
                >
                    {g}
                </button>
                ))}
            </div>

            {/* Review */}
            <textarea
                style={styles.textarea}
                placeholder="notes or thoughts? (optional)"
                value={form.review}
                onChange={(e) => setForm({ ...form, review: e.target.value })}
                rows={4}
            />

            {error && <p style={styles.error}>{error}</p>}

            {/* Submit */}
            <button
                style={{
                ...styles.submitBtn,
                opacity: loading ? 0.7 : 1,
                cursor: loading ? "not-allowed" : "pointer",
                }}
                onClick={handleSubmit}
                disabled={loading}
            >
                {loading ? "shelving ..." : "let's shelve it! →"}
            </button>
        </div>
    </div>
  );
}

// constants for styling! 
const BROWN = "#7B4A3B";
const CREAM = "#f5f0e8";
const BLUE_ACTIVE = "#a8c9d8";
const FONT = "'Courier New', Courier, monospace";


const styles: Record<string, React.CSSProperties> = {

  backdrop: {
    position: "fixed",
    inset: 0,
    backgroundColor: "rgba(0,0,0,0.1)",
    backdropFilter: "blur(10px)",
    zIndex: 100,
    animation: "shelve-fade-in 0.28s ease",
  },
  container: {
    position: "fixed",
    top: 0,
    left: 0,
    bottom: 0,
    backgroundColor: BROWN,
    color: CREAM,
    fontFamily: FONT,
    fontSize: "1rem",
    padding: "2rem 2rem 2.5rem",
    borderRadius: "0",
    display: "flex",
    flexDirection: "column",
    gap: "0.75rem",
    maxWidth: "800px",
    minHeight: "100%",
    boxSizing: "border-box",
    justifyContent: "center",
    overflowY: "auto",
    zIndex: 101,
    boxShadow: "6px 0 40px rgba(0,0,0,0.3)",
    animation: "shelve-slide-in 0.28s cubic-bezier(0.22, 1, 0.36, 1)",
  },
  heading: {
    fontFamily: FONT,
    fontWeight: "normal",
    fontSize: "2rem",
    margin: "0 0 0.5rem 0",
    color: CREAM,
    letterSpacing: "0.05em",
  },
  input: {
    backgroundColor: "transparent",
    border: "none",
    borderBottom: `1.5px solid ${CREAM}`,
    outline: "none",
    color: CREAM,
    fontFamily: FONT,
    fontSize: "1.2rem",
    padding: "0.5rem 0.4rem",
    width: "100%",
    boxSizing: "border-box",
    borderRadius: "4px 4px 0 0",
    letterSpacing: "0.03em",
  },
  row: {
    display: "flex",
    gap: "1rem",
    flexWrap: "wrap",
    alignItems: "center",
  },
  label: {
    color: CREAM,
    fontFamily: FONT,
    fontSize: "1.2rem",
    marginTop: "20px",
    marginBottom: "10px",
  },
  pill: {
    backgroundColor: "transparent",
    border: `1.5px solid ${CREAM}`,
    borderColor: CREAM,
    color: CREAM,
    fontFamily: FONT,
    fontSize: "1.2rem",
    padding: "0.5rem 0.75rem",
    borderRadius: "999px",
    cursor: "pointer",
    letterSpacing: "0.04em",
    transition: "background 0.15s, color 0.15s",
    whiteSpace: "nowrap",
  },
  pillActive: {
    backgroundColor: BLUE_ACTIVE,
    borderColor: BLUE_ACTIVE,
    color: BROWN,
  },
  genreGrid: {
    display: "flex",
    flexWrap: "wrap",
    gap: "1rem",
  },
  textarea: {
    backgroundColor: "transparent",
    border: `1.5px solid ${CREAM}`,
    borderRadius: "6px",
    color: CREAM,
    fontFamily: FONT,
    fontSize: "1.2rem",
    padding: "0.75rem 0.75rem",
    resize: "vertical",
    outline: "none",
    letterSpacing: "0.02em",
    lineHeight: "1.5",
    width: "100%",
    height: "250px",
    maxHeight: "400px",
    boxSizing: "border-box",
    marginBottom: "20px",
    marginTop: "30px",
  },
  submitBtn: {
    backgroundColor: BLUE_ACTIVE,
    border: "none",
    borderRadius: "20px",
    color: BROWN,
    fontFamily: FONT,
    fontSize: "2rem",
    padding: "0.75rem 1.5rem",
    cursor: "pointer",
    letterSpacing: "0.04em",
    marginTop: "0.5rem",
    transition: "opacity 0.15s",
    alignSelf: "stretch",
    textAlign: "center",
  },
  error: {
    color: "#f4a0a0",
    fontFamily: FONT,
    fontSize: "0.8rem",
    margin: 0,
  },
  backBtn: {
    padding: "10px",
    backgroundColor: BROWN,
    color: "#e8dfcf",
    border: "1px solid #e8dfcf",
    borderRadius: "999px",
    width: "20%",
    marginBottom: "30px",
    fontSize: "1.2rem",
    textAlign: "center",   
    cursor: "pointer",
  }
};