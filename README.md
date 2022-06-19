## User's Task Manager Design
```mermaid
flowchart TD
    App[App] --> |/| User[User]
    App[App] --> |/:id| Task[Task]
    App[App] --> |/*| NoPage[NoPage]
    User[User] --> |Add or Delete User| Redux[Redux]
    Task[Task] --> |Add or Delete Task| Redux[Redux]
```
## Definitions
* / routes to Homepage <br />
* /:id routes to User Task Page <br />
* /* routes to Not-Page-Found <br />
* **User Component** It takes input from the user (by **TakeUser** Component) and add, edit & delete it to the Redux store
* **Task Component** Before Rendering, **CheckTaskUrl** Component check if URL has User-Name then render it. It's a function that returns a form that takes in a task name, status, and due date, and then adds, edit & delete that task to the user's task list in Redux store and also filter task by **SearchFilters** Component.
