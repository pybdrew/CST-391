import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './App.css';

const VersePage = ({ verses, setVerses, booksMap, setBooksMap }) => {
  const [translations, setTranslations] = useState([]);
  const [selectedTranslation, setSelectedTranslation] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  // Load translations on mount
  useEffect(() => {
    fetch("http://localhost:8080/translations")
      .then(res => res.json())
      .then(data => {
        setTranslations(data);
        if (data.length > 0) setSelectedTranslation(data[0].translation);
      })
      .catch(() => setError("Failed to load translations"));
  }, []);

  // Load books map whenever translation changes
  useEffect(() => {
    if (!selectedTranslation) return;

    fetch(`http://localhost:8080/books?translation=${selectedTranslation}`)
      .then(res => res.json())
      .then(data => {
        const map = {};
        data.forEach(b => { map[b.id] = b.name; });
        setBooksMap(map);
      })
      .catch(() => setError("Failed to load books"));
  }, [selectedTranslation, setBooksMap]);

  // Load all verses whenever translation changes
  useEffect(() => {
    if (!selectedTranslation) return;

    setLoading(true);
    setError(null);

    fetch(`http://localhost:8080/verses/all?translation=${selectedTranslation}`)
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch verses");
        return res.json();
      })
      .then(data => setVerses(data))
      .catch(() => setError("Failed to load verses"))
      .finally(() => setLoading(false));
  }, [selectedTranslation, setVerses]);

  return (
    <div className="container mt-4">
      <h1>Bible Verses</h1>

      {/* Translation Dropdown */}
      <div className="mb-3">
        <label htmlFor="translation" className="form-label">Select Translation</label>
        <select
          id="translation"
          className="form-select"
          value={selectedTranslation}
          onChange={e => setSelectedTranslation(e.target.value)}
        >
          {translations.map(t => (
            <option key={t.translation} value={t.translation}>
              {t.title || t.translation}
            </option>
          ))}
        </select>
      </div>

      {/* Display Verses */}
      {error && <p className="text-danger">{error}</p>}
      {loading ? (
        <p>Loading verses...</p>
      ) : (
        <ul className="list-group mt-3">
          {verses.length > 0 ? verses.map(v => (
            <li
              key={v.id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <span>
                <strong>{booksMap[v.book_id] || `Book ${v.book_id}`} {v.chapter}:{v.verseNumber} </strong> | {v.text}
              </span>
              <button
                className="btn btn-sm btn-primary"
                onClick={() => navigate(`/add-comment/${v.id}`)}
              >
                Comment
              </button>
            </li>
          )) : (
            <div className="text-muted mt-3">No verses loaded yet.</div>
          )}
        </ul>
      )}
    </div>
  );
};

export default VersePage;