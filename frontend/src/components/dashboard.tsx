import { Container, Row, Col } from 'react-bootstrap';
import InterviewForm, { Interview } from "./interviewForm";
import InterviewList from './interviewList';
import axios from 'axios';
import { useEffect, useState } from 'react';


const Dashboard: React.FC = () => {

    const interviewsData = [
        {
          _id: '1',
          interviewee: 'John Doe',
          status: 'Completed',
          interview_feedback: 'Good performance',
          rating: 4,
        },
        {
          _id: '2',
          interviewee: 'Jane Doe',
          status: 'Pending',
          interview_feedback: 'Needs improvement',
          rating: 2,
        },
      ];


    const [interviews, setInterviewData] = useState(interviewsData)
  
      const getInterviewData = async ()=>{
        const token = localStorage.getItem("token")
        const BASE_URL = "http://localhost:8080"
    
        const res  = await axios.get(`${BASE_URL}/interviews` ,{headers : {
            Authorization : token
        }})
        setInterviewData(res.data)
      }


      useEffect(()=>{
        getInterviewData()
      },[])

    return (
        <Container className="mt-3">
        <Row>
          <Col>
            <h1>Add Interview</h1>
            <InterviewForm />
          </Col>
        </Row>
        <Row>
          <Col>
            <h1>Interview List</h1>
            <InterviewList
              interviews={interviews}
              getInterviewData={getInterviewData}
            />
          </Col>
        </Row>
      </Container>
    );
  };


  export default Dashboard