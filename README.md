Welcome to the quiz-wiz-react app!

# Getting Started

- Fork this repo
- [Follow instructions to setup fork locally if needed](https://github.com/jjseymour/quiz-tracker-api/wiki/Setup-local-fork)

## Setup

1. Install

    ```
    npm install
    ```

2. Start server

    ```
    # server will run on localhost:8080
    npm start
    ```

# Login as an instructor

With the [API](https://github.com/jjseymour/quiz-tracker-api) up and running and in that repo directory:
  - `rails c`
  - `User.find_by(instructor: true)`
  - Use that instructor's email and the password `12345` to login

# Login as a student within the above instructor's cohort

With the [API](https://github.com/jjseymour/quiz-tracker-api) up and running and in that repo directory:
  - `rails c`
  - `instructor = User.find_by(instructor: true)`
  - `cohort = instructor.cohorts.first`
  - `cohort.students.first`
  - Use that student's email and the password `12345` to login


# git workflow

This repo uses the forked model, where each person works on their own version of the repo.
When it is time to merge your changes:
- make a pull request from your branch to the master branch of what you forked
- when the pull request is approved, another member will merge into master

- main repository: master

## git commit messages

Good code comes with good commit messages. This [article](https://chris.beams.io/posts/git-commit/) is a good overview on commit messages and how to write good commit messages.

Add link to story/issue in the pull request message with full URL. (JIRA story numbers can change!)

# Specs

Reference: http://www.betterspecs.org
