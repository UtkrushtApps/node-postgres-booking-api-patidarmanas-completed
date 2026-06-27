FROM node:18-alpine

WORKDIR /root/task

COPY package.json package-lock.json* ./

RUN npm install --production

COPY src ./src
COPY README.md ./README.md

EXPOSE 3000

CMD ["node", "src/server.js"]
