import React, { useEffect, useState } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { Container, Row, Col } from "react-bootstrap";
import InterviewColumn from "./InterviewColumn";
import { useParams, useNavigate } from "react-router-dom";

export interface Candidate {
  fullName: string;
  currentInterviewStep: string;
  averageScore: number;
  id: string;
  applicationId: string;
}

interface InterviewStep {
  id: number;
  name: string;
  orderIndex: number;
}

const KanbanBoard: React.FC = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [interviewSteps, setInterviewSteps] = useState<InterviewStep[]>([]);
  const [positionName, setPositionName] = useState<string>("");
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch interview flow
        const flowResponse = await fetch(
          `http://localhost:3010/positions/${id}/interviewFlow`
        );
        const flowData = await flowResponse.json();
        setInterviewSteps(flowData.interviewFlow.interviewFlow.interviewSteps);
        setPositionName(flowData.positionName);

        // Fetch candidates
        const candidatesResponse = await fetch(
          `http://localhost:3010/positions/${id}/candidates`
        );
        const candidatesData = await candidatesResponse.json();
        setCandidates(candidatesData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  const handleDragEnd = async (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const updatedCandidates = Array.from(candidates);
    const candidate = candidates.find(
      (c) => c.id == draggableId.replace("candidate-", "")
    );
    console.log(draggableId.replace("candidate-", ""), candidate);

    if (candidate) {
      try {
        const response = await fetch(
          `http://localhost:3010/candidates/${candidate.id}/stage`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              applicationId: candidate.applicationId,
              currentInterviewStep: destination.droppableId,
            }),
          }
        );

        if (response.ok) {
          candidate.currentInterviewStep =
            interviewSteps.find(
              (step) => step.id.toString() === destination.droppableId
            )?.name || "";

          setCandidates(updatedCandidates);
        }
      } catch (error) {
        console.error("Error updating candidate stage:", error);
      }
    }
  };

  return (
    <Container fluid className="py-4">
      <div className="d-flex align-items-center mb-4">
        <button className="btn btn-link p-0 me-3" onClick={() => navigate(-1)}>
          ←
        </button>
        <h1 className="text-center flex-grow-1 mb-0">{positionName}</h1>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Row className="g-4">
          {interviewSteps?.map((step) => (
            <Col key={step.id} xs={12} md={6} lg={3}>
              <InterviewColumn
                id={step.id.toString()}
                title={step.name}
                candidates={candidates.filter(
                  (c) => c.currentInterviewStep === step.name
                )}
              />
            </Col>
          ))}
        </Row>
      </DragDropContext>
    </Container>
  );
};

export default KanbanBoard;
