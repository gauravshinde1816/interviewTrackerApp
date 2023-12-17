
import axios from 'axios';
import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

export interface Interview {
  interviewee: string;
  status: string;
  interview_feedback: string;
  rating: number;
}

const InterviewForm = () => {
  const [interviewData, setInterviewData] = useState<Interview>({
    interviewee: '',
    status: '',
    interview_feedback: '',
    rating: 0,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setInterviewData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const token = localStorage.getItem("token")
    const BASE_URL = "http://localhost:8080"

    interviewData.rating  = +interviewData.rating
    
    const res  = await axios.post(`${BASE_URL}/interviews` ,interviewData, {headers : {
        Authorization : token
    }})
    
    window.location.href = "/dashboard"

    // Reset the form after submission
    setInterviewData({
      interviewee: '',
      status: '',
      interview_feedback: '',
      rating: 0,
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="interviewee">
        <Form.Label>Interviewee</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter interviewee's name"
          name="interviewee"
          value={interviewData.interviewee}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="status">
        <Form.Label>Status</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter interview status"
          name="status"
          value={interviewData.status}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="interviewFeedback">
        <Form.Label>Interview Feedback</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          placeholder="Enter interview feedback"
          name="interview_feedback"
          value={interviewData.interview_feedback}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="rating">
        <Form.Label>Rating</Form.Label>
        <Form.Control
          type="number"
          placeholder="Enter interview rating"
          name="rating"
          value={interviewData.rating}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default InterviewForm;
