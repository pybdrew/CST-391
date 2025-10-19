import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import NavBar from "./NavBar";
import VersePage from "./VersePage";
import AddCommentPage from "./AddCommentPage";
import CommentsPage from "./CommentsPage";
import EditCommentPage from "./EditCommentPage";

const App = () => {
  const [verses, setVerses] = useState([]);
  const [booksMap, setBooksMap] = useState({});

  return (
    <Router>
      <NavBar />
      <div style={{ padding: "16px" }}>
        <Routes>
          <Route path="/" element={
            <div>
                <h1>Welcome to Inclusion</h1>
                <p> This site is a Bible study application. 
                    It uses a <strong>React</strong> frontend and an <strong>Express REST API</strong> backend to provide a seamless, interactive experience.
                </p>
                <p> Users can browse Bible verses from numerous translations, add and filter comments, and study passages in depth. 
                    The goal is to provide a space for Christians to review verses, share insights, and connect across different translations.
                </p>
                <p> Whether you are reading alone or engaging with a community, Inclusion helps you dive deeper into Scripture while fostering meaningful discussion.</p>
            </div>
          } />
          <Route
            path="/verses"
            element={
              <VersePage
                verses={verses}
                setVerses={setVerses}
                booksMap={booksMap}
                setBooksMap={setBooksMap}
              />
            }
          />
          <Route
            path="/add-comment/:verseId"
            element={<AddCommentPage verses={verses} booksMap={booksMap} />}
          />
          <Route
            path="/comments"
            element={<CommentsPage booksMap={booksMap} />}
          />
          <Route path="/edit-comment/:id" element={<EditCommentPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
