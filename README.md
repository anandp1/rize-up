# Rize Up

## Getting Started

#### Prerequisites

Ensure that you have Docker and `docker-compose` installed on your development computer: [Docker website](https://www.docker.com). Windows computers will need to use WSL2 (Windows Subsystem for Linux) as a backend following [this guide](https://learn.microsoft.com/en-us/windows/wsl/install).

Note: Mac users will not need to install WSL2 as it already uses Linux as a backend.

Ensure you have `npm` and `node` installed on your development computer: [Node.js website](https://nodejs.org/en/).
Ensure you have `mvnw` installed on your development computer
Note: If you are using Windows, you will need to install [Git Bash](https://git-scm.com/downloads) to run the `mvnw` command.
Note: If you are using Mac OS, you will not need to install Maven as it is already installed on your computer.

- [Java 17 SDK](https://www.oracle.com/java/technologies/javase/jdk17-archive-downloads.html)
- [Node.js](https://nodejs.org/en/)
- [Maven](https://maven.apache.org/install.html)

### Running the application

# Clone this repo

```
git clone https://github.com/anandp1/rize-up.git
cd rize-up
```

# Run this command in root directory

`docker-compose up --build --force-recreate`,
This will build the docker image and run the container so that the MySQL server is running and
accessible through instructions above.

You can now check the database connection using a GUI tool like [MySQL Workbench](https://www.mysql.com/products/workbench/).

When running the container the server will automatically create a database based on the `database.sql` file located in the `db` folder. You can connect to the server from your machine using the port `26289`. The default username is `test` and password is `cpsc471` as specified in `login.sql`.

**MySQL Database Login Information**
| paramater | value |
|----------------|---------------------------------|
| database url | localhost:26289/RIZEUP |
| username | test |
| password | cpsc471 |

# Start Maven project

Navigate to 'backend' folder and run the following commands and start the spring boot server:

```
cd backend
./mvnw spring-boot:run
```

This server will be running on port 8080.

# Start React NextJs

Open a new terminal and navigate to the `frontend` folder and run the following commands:

```
cd frontend
npm install
npm run dev
```

This will install all dependencies and start the React NextJs server on port 3000.

# You can now access the application at http://localhost:3000
