# Task Conventions

Always use the task list tools to track work items during sessions. For any request involving 2 or more steps, create tasks to track progress. This provides visibility of progress and ensures complex work is properly organised.

## Task Tool Reference

| Tool         | Purpose                                   | When to Use                          |
| ------------ | ----------------------------------------- | ------------------------------------ |
| `TaskCreate` | Create new task with subject, description | Starting any multi-step work         |
| `TaskUpdate` | Update status, add dependencies, modify   | Marking progress, setting blockers   |
| `TaskList`   | View all tasks and their status           | Checking what's pending/blocked      |
| `TaskGet`    | Retrieve full task details by ID          | Getting context before starting work |

## Task Workflow

```
1. TaskCreate - Create tasks for each major step
2. TaskUpdate (addBlockedBy) - Set dependencies between tasks
3. TaskUpdate (status: in_progress) - Mark task as started
4. [Do the work]
5. TaskUpdate (status: completed) - Mark task as done
6. TaskList - Check for next available task
```

## Status Values

- `pending` - Not started, waiting for dependencies
- `in_progress` - Currently being worked on
- `completed` - Successfully finished
- `deleted` - Removed (use sparingly)

## Best Practices

- Use `activeForm` for spinner text (present continuous: "Creating meeting note")
- Set `blockedBy` for tasks that depend on others completing first
- Update status to `in_progress` before starting work
- Always mark tasks `completed` when done (don't leave orphaned tasks)
