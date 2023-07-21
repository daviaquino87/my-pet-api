#!/bin/sh

npm install

npx prisma migrate dev
npm run start:dev
