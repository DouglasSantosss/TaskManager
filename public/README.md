Task Manager 

Project Overview

- Full-stack web application to manage tasks.
- Allows users to register and log in.
- Users can create, view, update, and delete tasks.
- Supports adding comments to tasks.
- Enables breaking tasks down into subtasks.

ERD Screenshot



![ERD Screenshot](Images/TaskManager-2.png)


Business Rules

- USER ↔ TASK
  - `<USER> <create> <any number> <TASK>`  
    A user can create zero or many tasks.
  - `<TASK> <is created by> <exactly one> <USER>`  
    Each task must be created by exactly one user.

- USER ↔ COMMENT
  - `<USER> <write> <any number> <COMMENT>`  
    A user can write zero or many comments.
  - `<COMMENT> <is written by> <exactly one> <USER>`  
    Each comment must be written by exactly one user.

- TASK ↔ COMMENT
  - `<TASK> <contain> <any number> <COMMENT>`  
    A task can contain zero or many comments.
  - `<COMMENT> <belongs to> <exactly one> <TASK>`  
    Each comment must belong to exactly one task.

- TASK ↔ SUBTASK
  - `<TASK> <broken down into> <any number> <SUBTASK>`  
    A task may be broken down into zero or many subtasks.
  - `<SUBTASK> <must belong to> <exactly one> <TASK>`  
    Each subtask must belong to exactly one task.


