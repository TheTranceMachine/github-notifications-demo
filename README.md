# Github Notifications app

## Problem
An experienced SME in a corporate company has to deal with many PRs opened by members of their team and sometimes members of other teams.
Whith this many PRs, it's hard to have an overview and bigger picture of the incoming work. 
The email notifications coming into your inbox can sometimes be difficult to handle. Moreover, some PRs are opened by bots and are only spamming your inbox.

## Solution
A desktop app that will give you an overview of opened PRs and notify you via system notifications when a new PR is opened, when you're tagged in a PR or when anything changes.

## Features
- Categorize the view with filters.
- Mute PRs opened by bots
- Adjust the notifications parameters and sensitivity
- Open PRs directly from the desktop app
- View PR details
- Change status of PRs

## Tech stack
- Github API
- React.js
- Redux
- Redux Saga
- carbon-components
- Electron.js

## get it up and running.

After you clone this project, do the following:

```bash
npm install

# start app as Electron desktop app (MacOS)
npm run electron-dev

# start app in your browser
npm run start
```
Access locally: http://localhost:5555
