export const CREATE_TOOL_DESCRIPTION = `
Create a sprint task.

Only provide the following fields:

* title (required)
* description (optional)
* status (optional)
* priority (optional)
* storyPoints (optional)

Default values:

* If the user does not specify a description, add description based on title.
* If the user does not specify a status, use BACKLOG.
* If the user does not specify a priority, use MEDIUM.
* If the user does not specify story points, use 5.

Do not include any fields other than those listed above.
`;

export const MOVE_TOOL_DESCRIPTION = `
Move a sprint task to a different status/column.

Required fields:
* taskId (required) - the task's unique identifier (e.g. "TASK-42")
* status (required) - the target status to move the task to

Valid statuses: BACKLOG, TODO, IN_PROGRESS, IN_REVIEW, DONE
`;

export const DELETE_TOOL_DESCRIPTION = `
Delete a sprint task permanently.

Required fields:
* taskId (required) - the task's unique identifier (e.g. "TASK-42")

Returns the deleted task's ID and title as confirmation.
`;

export const UPDATE_TOOL_DESCRIPTION = `
Update the details of an existing sprint task.

Required fields:
* taskId (required) - the task's unique identifier (e.g. "TASK-42")

Optional fields (only provided fields will be updated):
* title
* description
* status
* priority
* storyPoints

Do not include fields the user did not explicitly ask to change.
`;

export const TOGGLE_THEME_DESCRIPTION =
  "Toggle the app UI theme. Call this when the user asks to switch to dark mode, light mode, or system preference.";
