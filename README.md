 # Custom Version Control Platform

  A MERN-based version control platform inspired by GitHub, built with custom repository management, authentication,
  issue tracking, and version-control commands.

  ## Features

  - User authentication using JWT and bcrypt
  - Create, update, delete, and search repositories
  - Repository visibility toggle
  - Issue creation and management
  - Owner-based repository fetching
  - Custom version-control commands: init, add, commit, push, pull, revert
  - Remote file storage using Supabase
  - GitHub-style dashboard and profile interface

  ## Tech Stack

  - React.js
  - Node.js
  - Express.js
  - MongoDB / Mongoose
  - Supabase
  - JWT
  - bcrypt
  - Git/GitHub

  ## Project Highlights

  - Implemented custom version-control logic using Node.js file-system APIs.
  - Used UUID-based commit snapshots for tracking file versions.
  - Built REST APIs for repository and issue management.
  - Integrated secure authentication and protected routes.
