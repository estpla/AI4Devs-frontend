import React from "react";
import { Droppable } from "react-beautiful-dnd";
import { Card } from "react-bootstrap";
import CandidateCard from "./CandidateCard";
import { Candidate } from "./KanbanBoard";

interface InterviewColumnProps {
  title: string;
  candidates: Array<Candidate>;
  id: string;
}

const InterviewColumn: React.FC<InterviewColumnProps> = ({
  title,
  candidates,
  id,
}) => {
  return (
    <div className="interview-column h-100">
      <Card className="h-100">
        <Card.Header className="text-center fw-bold">{title}</Card.Header>
        <Droppable droppableId={id}>
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="p-2"
              style={{ minHeight: "100px" }}
            >
              {candidates.map((candidate, index) => (
                <CandidateCard
                  key={candidate.id}
                  candidate={candidate}
                  index={index}
                />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </Card>
    </div>
  );
};

export default InterviewColumn;
