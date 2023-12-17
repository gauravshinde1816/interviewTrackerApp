import axios from 'axios';
import React, { useState } from 'react';
import { Table, Button, Modal } from 'react-bootstrap';
import StarRating from './starRating';

interface Interview {
  _id: string;
  interviewee: string;
  status: string;
  interview_feedback: string;
  rating: number;
}

interface InterviewListProps {
  interviews: Interview[];
  getInterviewData: ()=>void
}

const InterviewList: React.FC<InterviewListProps> = ({ interviews , getInterviewData}) => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [interviewToDelete, setInterviewToDelete] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    setInterviewToDelete(id);
    const token = localStorage.getItem("token")
    const BASE_URL = "http://localhost:8080"
    await axios.delete(`${BASE_URL}/interviews/${id}`,  {headers : {
        Authorization  : token
    }})
    setShowConfirmation(true);
    getInterviewData()
  };

  const handleConfirmationClose = () => {
    setInterviewToDelete(null);
    setShowConfirmation(false);
  };

  const handleConfirmationDelete = () => {
    setShowConfirmation(false);
  };

  return (
    <>
      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>#</th>
            <th>Interviewee</th>
            <th>Status</th>
            <th>Feedback</th>
            <th>Rating</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {interviews.map((interview, index) => (
            <tr key={interview._id}>
              <td>{index + 1}</td>
              <td>{interview.interviewee}</td>
              <td>{interview.status}</td>
              <td>{interview.interview_feedback}</td>
              <td><StarRating rating={interview.rating}/></td>
              <td>
                <Button variant="danger" onClick={() => handleDelete(interview._id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showConfirmation} onHide={handleConfirmationClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this interview?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleConfirmationClose}>
            Close
          </Button>
          <Button variant="danger" onClick={handleConfirmationDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default InterviewList;
