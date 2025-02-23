FROM node:20-alpine

WORKDIR /app

COPY package.json .

RUN npm install

COPY app.js /app/app.js
COPY init.js /app/init.js
COPY routes/ /app/routes/	
COPY schemas/ /app/schemas/	
COPY lib/ /app/lib/	

EXPOSE 3000

CMD ["node", "app.js"]