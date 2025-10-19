import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";

const EditCommentPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const booksMap = location.state?.booksMap || {};

  const [comment, setComment] = useState(null);
  const [verse, setVerse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newText, setNewText] = useState("");

  // Load comment and verse on mount
  useEffect(() => {
    const fetchComment = async () => {
      try {
        const res = await fetch(`http://localhost:8080/comments/${id}`);
        if (!res.ok) throw new Error("Failed to load comment");
        const data = await res.json();
        setComment(data);
        setNewText(data.commentText || data.comment_text);

        // Fetch verse for this comment
        const verseRes = await fetch(`http://localhost:8080/verses/${data.verse_id}`);
        if (!verseRes.ok) throw new Error("Failed to load verse");
        const verseData = await verseRes.json();
        setVerse(verseData);

      } catch {
        setError("Failed to load comment or verse");
      } finally {
        setLoading(false);
      }
    };

    fetchComment();
  }, [id]);

  const handleUpdate = async () => {
    try {
      const res = await fetch(`http://localhost:8080/comments/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...comment, commentText: newText }),
      });
      if (!res.ok) throw new Error("Failed to update comment");

      const updatedComment = await res.json();
      setComment(updatedComment);

      // Redirect back to comments page with success message
      navigate("/comments", { state: { message: "Comment updated" } });

    } catch {
      alert("Failed to update comment");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div className="container mt-4">
      <h2>Edit Comment</h2>

      {verse && (
        <p>
          <strong>
            {booksMap[verse.book_id] || `Book ${verse.book_id}`} {verse.chapter}:{verse.verseNumber}
          </strong> | {verse.text}
        </p>
      )}

      <div className="mb-3">
        <label htmlFor="comment" className="form-label">Your Comment</label>
        <textarea
          id="comment"
          className="form-control"
          rows={5}
          value={newText}
          onChange={e => setNewText(e.target.value)}
        />
      </div>

      <button className="btn btn-primary me-2" onClick={handleUpdate}>Update</button>
      <button className="btn btn-secondary" onClick={() => navigate("/comments")}>Close</button>
    </div>
  );
};

export default EditCommentPage;