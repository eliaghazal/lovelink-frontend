import React, { useState } from 'react';
import axios from 'axios';

function MatchPage({ user, onLogout }) {
  const [matchResult, setMatchResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleMatch = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`http://localhost:5000/api/match/${user._id}`);
      setMatchResult(response.data.match);
    } catch (err) {
      setMatchResult({ error: "No match found or error occurred." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px', fontFamily: 'sans-serif' }}>
      <h2>Welcome, {user.name} 💘</h2>
      <p>Ready to find your perfect match?</p>
      <button onClick={handleMatch} disabled={loading}>
        {loading ? 'Matching...' : 'Find My Match 💘'}
      </button>

      {matchResult && (
        <div style={{ marginTop: '30px' }}>
          {matchResult.error ? (
            <p>{matchResult.error}</p>
          ) : (
            <>
              <h3>Match Found! 🎉</h3>
              <p><strong>Matched with:</strong> {matchResult.user2}</p>
              <p><strong>Match Score:</strong> {matchResult.score}/3</p>
              <p><strong>📅 Date booked for:</strong> {new Date(matchResult.matchedAt).toLocaleDateString()} at 7:00 PM</p>
            </>
          )}
        </div>
      )}

      <button onClick={onLogout} style={{ marginTop: '30px' }}>
        🚪 Logout
      </button>
    </div>
  );
}

export default MatchPage;
