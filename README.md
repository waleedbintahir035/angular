# ProjectAssigmentLmkr

##  Setup Instructions
# Clone the project
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name

# Install dependencies
npm install

# Run the app
ng serve

# Credentials For login on http://localhost:4200/

--User : assigment@lmkr.com
--Password : assigment

# Project Structure

src/
│
├── app/
│   ├── login/login
│   │           └── login.component.ts / html
│   ├── Auth/
│   │   └── auth.guard.ts
|   |   └── auth.service.ts
│   ├── projects/
│   │   ├── project-list/
│   │   ├── project-tasks/
│   │   └── project-dialog/
│   │   └── project.service.ts
│   └── app-routing.module.ts



# Project & Task Management Dashboard (Angular + PrimeNG + TailwindCSS)

##  Features

-  **Login Screen** with session storage-based session User:assigment@lmkr.com , passowrd:assigment
-  **Project List View** with:
  - Filters for status (`All`, `Active`, `Completed`)
  - Add/Edit/Delete Project with Dialog form
  - Expandable summary row
  - Progress bar and task count display
- **Task Management View** for each project:
  - Add tasks via dialog
  - Inline editable task table
  - Overdue task counter
-  **Form Validations** using `ReactiveFormsModule` and `Template Driven Forms`
-  **Tailwind CSS Styling** for all form and UI components
-  **PrimeNG** components: Table, Dialog, Dropdown, Calendar, ProgressBar, Toastr
- **Routing Guard** for login protection
- **Toastr** Toastr message added on succesful login
- **Spinner** Spinner Added on login



- **Bonus optional**
- Task filtering by status
- Analytics cards (e.g., total tasks, overdue tasks)



