# Implementation from Plan

## Metadata
description: "Implement code according to an existing plan file"

## Purpose
Execute the implementation of a feature, bug fix, or chore by following an existing plan file. This is a Level 5 Higher-order prompt - the plan provides the dynamic work, this prompt provides consistent scaffolding.

## Variables
plan_file_path: $1

## Instructions

IMPORTANT: This is implementation execution, not planning.

- Read the entire plan file from beginning to end
- Understand the full scope before writing any code
- Follow the plan's step-by-step tasks exactly
- Execute tasks in order (don't skip around)
- Use TodoWrite to track progress through tasks
- Mark each task complete as you finish it

## Workflow

1. Read and analyze the plan
   - Read the entire plan file at `{plan_file_path}`
   - Understand: problem, solution, phases, tasks
   - Identify: relevant files, new files, dependencies
   - Note: acceptance criteria and validation commands

2. Set up task tracking
   - Use TodoWrite to create todos from plan's "Step by Step Tasks"
   - Convert each h3 task header into a todo item
   - Mark first task as in_progress

3. Execute implementation
   - Follow "Step by Step Tasks" section in exact order
   - For each task:
     - Mark task as in_progress
     - Execute all sub-tasks and bullet points
     - Test as you go (don't wait until the end)
     - Mark task as completed when done
     - Move to next task

4. Follow existing patterns
   - Look at similar code in the codebase
   - Match naming conventions
   - Use same file structure patterns
   - Follow same coding style
   - Reuse existing utilities and components

5. Handle dependencies
   - If plan mentions new libraries, install them first
   - Use package manager specified in plan (npm, bun, uv, etc.)
   - Verify installation before continuing

6. Test throughout
   - Don't save all testing for the end
   - Run relevant tests after each significant change
   - Fix issues immediately before moving forward
   - Keep all existing tests passing

7. Final validation
   - Execute all commands from plan's "Validation Commands" section
   - Verify all acceptance criteria are met
   - Ensure zero regressions
   - Confirm feature/fix works as expected

## Implementation Guidelines

### Code Quality
- Write clean, readable code
- Add comments for complex logic
- Use meaningful variable and function names
- Follow TypeScript best practices
- Handle errors appropriately

### File Organization
- Create new files in appropriate directories
- Follow project structure conventions
- Keep files focused and modular
- Import dependencies correctly

### Testing
- Write tests as you implement (not after)
- Cover happy path and edge cases
- Ensure tests are reliable and clear
- Update existing tests if behavior changes

### Git Hygiene
- Changes will be committed by orchestrator
- Focus on making atomic, logical changes
- Keep code organized and reviewable

## Error Handling

If you encounter blockers:
- Clearly state what's blocking you
- Explain what you tried
- Suggest next steps or alternatives
- Don't proceed if fundamentally blocked

If plan is unclear:
- Use your best judgment based on context
- Follow similar patterns in codebase
- Add note in your response about assumptions made

## Report

After implementation completes, report:

```
Implementation complete.

Tasks completed: <number>
Files modified: <list file paths>
Files created: <list file paths>
Tests passing: <yes/no>
Validation status: <pass/fail with details>

<Any important notes or issues encountered>
```
