import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from 'react-router-dom';

const CommentsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const successMessage = location.state?.message;

  const [allTranslations, setAllTranslations] = useState([]);
  const [translationsWithComments, setTranslationsWithComments] = useState([]);
  const [selectedTranslation, setSelectedTranslation] = useState("all");

  const [booksMap, setBooksMap] = useState({});
  const [allComments, setAllComments] = useState([]);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [deletedCommentId, setDeletedCommentId] = useState(null);

  // Load all translations
  useEffect(() => {
    fetch("http://localhost:8080/translations")
      .then(res => res.json())
      .then(data => setAllTranslations(data))
      .catch(() => setError("Failed to load translations"));
  }, []);

  // Load books map
  useEffect(() => {
    fetch("http://localhost:8080/books")
      .then(res => res.json())
      .then(data => {
        const map = {};
        data.forEach(b => { map[b.id] = b.name; });
        setBooksMap(map);
      })
      .catch(() => setError("Failed to load books"));
  }, []);

  // Load all comments once and attach verse info
  useEffect(() => {
    setLoading(true);
    setError(null);

    fetch("http://localhost:8080/comments")
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch comments");
        return res.json();
      })
      .then(async data => {
        setAllComments(data);

        // Filter translations with comments
        const usedTranslations = Array.from(new Set(data.map(c => c.translation)));
        const filteredTranslations = allTranslations.filter(t => usedTranslations.includes(t.translation));
        setTranslationsWithComments(filteredTranslations);

        // Attach verse info
        const commentsWithVerse = await Promise.all(
          data.map(async c => {
            try {
              const res = await fetch(`http://localhost:8080/verses/${c.verse_id}`);
              if (!res.ok) throw new Error("Failed to fetch verse");
              const verse = await res.json();
              return { ...c, book_id: verse.book_id, chapter: verse.chapter, verseNumber: verse.verseNumber };
            } catch {
              return { ...c, book_id: null, chapter: null, verseNumber: null };
            }
          })
        );

        setComments(commentsWithVerse);
      })
      .catch(() => setError("Failed to load comments"))
      .finally(() => setLoading(false));
  }, [allTranslations]);

  // Filter comments based on selectedTranslation
  const displayedComments = selectedTranslation === "all"
    ? comments
    : comments.filter(c => c.translation === selectedTranslation);

  // Handle delete
  const handleDelete = async (commentId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this comment? This action cannot be undone."
    );
    if (!confirmDelete) return;

    try {
      const res = await fetch(`http://localhost:8080/comments/${commentId}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete comment");

      setDeletedCommentId(commentId);
      setComments(prev => prev.filter(c => c.id !== commentId));
      alert("Comment deleted");
    } catch {
      alert("Failed to delete comment");
    }
  };

  return (
    <div className="container mt-4">
      <h1>Study Comments</h1>

      {successMessage && <div className="alert alert-success">{successMessage}</div>}

      <div className="mb-3">
        <label htmlFor="translation" className="form-label">Select Translation</label>
        <select
          id="translation"
          className="form-select"
          value={selectedTranslation}
          onChange={e => setSelectedTranslation(e.target.value)}
        >
          <option value="all">All</option>
          {translationsWithComments.map(t => (
            <option key={t.translation} value={t.translation}>
              {t.title || t.translation}
            </option>
          ))}
        </select>
      </div>

      {error && <p className="text-danger">{error}</p>}

      {loading ? (
        <p>Loading comments...</p>
      ) : displayedComments.length > 0 ? (
        <ul className="list-group mt-3">
          {displayedComments.map(c => (
            <li
              key={c.id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <span>
                <strong>{booksMap[c.book_id] || `Book ${c.book_id}`} {c.chapter}:{c.verseNumber}</strong> | {c.commentText || c.comment_text}
              </span>
              <div>
                <button className="btn btn-sm btn-warning me-2" 
                  onClick={() => navigate(`/edit-comment/${c.id}`, { state: { booksMap } })}
                >Edit</button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDelete(c.id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="text-muted mt-3">
          {deletedCommentId ? "Comment deleted" : "No comments loaded yet."}
        </div>
      )}
    </div>
  );
};

export default CommentsPage;