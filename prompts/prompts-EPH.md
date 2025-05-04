# Prompts

## Prompt 1

````md
# Kanban-Style Interface for Candidate Management

Create a responsive **Kanban-style interface** for managing candidates of a specific job position using **React**, **TypeScript**, and **Bootstrap**. The screen should integrate with the provided backend API and render candidates in columns representing each stage of the interview process.

---

## 🎯 Objective

Allow recruiters to view and manage candidates for a given job opening. Each stage of the hiring process should be shown as a column, and candidates should be displayed as draggable cards that can move between stages.

---

## 🧩 Functional Requirements

- Display the **job title** centered at the top.
- Include a **back arrow** to return to the positions list.
- Dynamically render **columns** based on the interview steps from the API.
- Each **candidate card** must:
  - Appear in the correct column (based on their current interview step).
  - Show their **full name** and **average score**, with the score rendered using green visual indicators (e.g. circles).
- Support **drag-and-drop** functionality:
  - When a candidate is dropped into a new column, trigger a `PUT` to update their stage.

---

## 🌐 API Contract

### ✅ GET `/positions/:id/interviewFlow`

Fetches the interview flow configuration for a given position.

#### Sample Response

```json
{
  "positionName": "Senior backend engineer",
  "interviewFlow": {
    "id": 1,
    "description": "Standard development interview process",
    "interviewSteps": [
      {
        "id": 1,
        "interviewFlowId": 1,
        "interviewTypeId": 1,
        "name": "Initial Screening",
        "orderIndex": 1
      },
      {
        "id": 2,
        "interviewFlowId": 1,
        "interviewTypeId": 2,
        "name": "Technical Interview",
        "orderIndex": 2
      },
      {
        "id": 3,
        "interviewFlowId": 1,
        "interviewTypeId": 3,
        "name": "Manager Interview",
        "orderIndex": 3
      }
    ]
  }
}
```
````

---

### ✅ GET `/positions/:id/candidates`

Returns the list of all candidates for the given position.

#### Sample Response

```json
[
  {
    "fullName": "Jane Smith",
    "currentInterviewStep": "Technical Interview",
    "averageScore": 4
  },
  {
    "fullName": "Carlos García",
    "currentInterviewStep": "Initial Screening",
    "averageScore": 0
  },
  {
    "fullName": "John Doe",
    "currentInterviewStep": "Manager Interview",
    "averageScore": 5
  }
]
```

---

### ✅ PUT `/candidates/:id/stage`

Updates the current interview stage for a candidate after they are moved to a new column.

#### Request Body

```json
{
  "applicationId": "1",
  "currentInterviewStep": "3"
}
```

#### Successful Response

```json
{
  "message": "Candidate stage updated successfully",
  "data": {
    "id": 1,
    "positionId": 1,
    "candidateId": 1,
    "applicationDate": "2024-06-04T13:34:58.304Z",
    "currentInterviewStep": 3,
    "notes": null,
    "interviews": []
  }
}
```

---

## 📱 Responsive Design

- On **desktop**, show columns side-by-side.
- On **mobile**, stack columns vertically and allow horizontal scrolling if necessary.

---

## 🧰 Tech Stack

- **React** with functional components and hooks
- **TypeScript** for strong typing (use interfaces for API response data)
- **Bootstrap** for layout and responsive styling
- A **drag-and-drop library** such as `react-beautiful-dnd`

---

## 📎 Additional Notes

- Do not assume a fixed number of columns — the interview steps are dynamic.
- Maintain separation of concerns: UI state (drag-drop) vs. persisted state (API update).
- Handle loading and error states gracefully.

---

`````

## Prompt 2

````md
# Describe Code Changes for Pull Request

You are helping me write the description for a Pull Request.

Please analyze the current state of the project and summarize the key changes made in the codebase. Include:

- What has been added, removed, or modified.
- The purpose or motivation behind each major change.
- Any API contracts or component structures that were updated.
- Relevant technical decisions or refactors.
- Any parts of the app that now behave differently as a result.

The project is a frontend application using **React**, **TypeScript**, and **Bootstrap**, implementing a **kanban-style interface** to manage candidates across interview stages for a specific job position. The screen integrates with API endpoints related to interview steps and candidate progression.

Format the response in clear, markdown-friendly sections that I can directly paste into a PR description. For example:

```
### ✨ What's New
- Implemented a kanban board interface for candidate tracking.
- Added drag-and-drop support using `react-beautiful-dnd`.

### 🔧 Technical Details
- Fetched interview flow and candidates via `/positions/:id/interviewFlow` and `/positions/:id/candidates`.
- Updated candidate stage via PUT `/candidates/:id/stage`.

### 📦 Refactors or Cleanups
- Introduced new types/interfaces for API responses.
- Cleaned up unused imports and optimized state management.

### 📌 Notes
- Columns and cards are responsive and mobile-friendly.
```

Only include meaningful and intentional changes. Ignore auto-generated files, config noise, or unrelated formatting unless relevant.
`````
