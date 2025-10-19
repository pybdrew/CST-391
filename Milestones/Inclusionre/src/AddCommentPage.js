import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const AddCommentPage = ({ verses, booksMap }) => {
  const { verseId } = useParams();
  const navigate = useNavigate();

  const [verse, setVerse] = useState(null);
  const [commentText, setCommentText] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [error, setError] = useState(null);

  // Find the verse from the verses list passed via props
  useEffect(() => {
    const v = verses.find((verse) => verse.id === Number(verseId));
    if (v) setVerse(v);
  }, [verseId, verses]);

  const handleSaveComment = () => {
    if (!commentText.trim()) {
      setError("Comment cannot be empty");
      return;
    }

    // Send correct field names matching Comment interface
    fetch("http://localhost:8080/comments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        verseId: verse.id,
        commentText: commentText,
        translation: verse.translation
      }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to save comment");
        return res.json();
      })
      .then(() => {
        setShowPopup(true);
        setError(null);
      })
      .catch(() => setError("Failed to save comment"));
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    navigate("/comments");
  };

  if (!verse) return <p className="text-muted">Verse not found.</p>;

  return (
    <div className="container mt-4">
      <h2>Add Comment</h2>

      <p>
        <strong>
          {booksMap[verse.book_id] || `Book ${verse.book_id}`} {verse.chapter}:{verse.verseNumber}
        </strong>{" "}
        | {verse.text}
      </p>

      {error && <p className="text-danger">{error}</p>}

      <div className="mb-3">
        <label htmlFor="comment" className="form-label">Your Comment</label>
        <textarea
          id="comment"
          className="form-control"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          rows={4}
        />
      </div>

      <button className="btn btn-primary" onClick={handleSaveComment}>
        Save Comment
      </button>

      {showPopup && (
        <div className="alert alert-success mt-3" role="alert">
          Comment saved successfully!
          <button className="btn btn-sm btn-secondary ms-2" onClick={handleClosePopup}>
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default AddCommentPage;