import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { Card } from "react-bootstrap";
import { Candidate } from "./KanbanBoard";

interface CandidateCardProps {
  candidate: Candidate;
  index: number;
}

const CandidateCard: React.FC<CandidateCardProps> = ({ candidate, index }) => {
  const renderScoreDots = (score: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        className="d-inline-block me-1"
        style={{
          width: "12px",
          height: "12px",
          borderRadius: "50%",
          backgroundColor: i < score ? "#28a745" : "#e9ecef",
        }}
      />
    ));
  };

  return (
    <Draggable draggableId={`candidate-${candidate.id}`} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Card className="mb-2 shadow-sm">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <div className="fw-bold">{candidate.fullName}</div>
                <div>{renderScoreDots(candidate.averageScore)}</div>
              </div>
            </Card.Body>
          </Card>
        </div>
      )}
    </Draggable>
  );
};

export default CandidateCard;
