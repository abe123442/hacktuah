"use client";

import { useState } from 'react';
import { CommentFormProps } from '@/lib/utils';
import './commentForm.css';
import { BACKEND_URL } from '@/lib/utils'; 

export const CommentForm: React.FC<CommentFormProps> = ({ profileId }) => {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [rating, setRating] = useState<number | undefined>(undefined);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); 
    setSuccess(false); 

    // Basic validation
    if (!title || !desc || !rating) {
      setError('All fields are required.');
      return;
    }

    // Correct header key to `token`
    const token = "faf85f27-f0a3-4a2b-a117-dcacc25313eb"; // Static token for testing
    const response = await fetch(`${BACKEND_URL}/profile/${profileId}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'token': token, // Use 'token' instead of 'Authorization'
      },
      body: JSON.stringify({
        title,
        desc,
        rating,
      }),
    });

    if (response.ok) {
      setSuccess(true);
      setTitle('');
      setDesc('');
      setRating(undefined);
    } else {
      const responseData = await response.json();
      setError(responseData.error || 'Error posting the comment.');
    }
  };

  return (
    <form className="comment-form" onSubmit={handleSubmit}>
      <h2>Post a Comment</h2>

      {error && <p className="error">{error}</p>}
      {success && <p className="success">Comment posted successfully!</p>}

      <div className="form-group">
        <label>Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter comment title"
        />
      </div>

      <div className="form-group">
        <label>Description</label>
        <textarea
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          placeholder="Enter comment description"
        ></textarea>
      </div>

      <div className="form-group">
        <label>Rating</label>
        <input
          type="number"
          value={rating || ''}
          onChange={(e) => setRating(Number(e.target.value))}
          min="1"
          max="5"
          placeholder="Rate from 1 to 5"
        />
      </div>

      <button type="submit">Submit Comment</button>
    </form>
  );
};
