# use prebuilt node:7 image from docker image registry to build our own
FROM node:8.11.3-alpine
# dir in the container where we store/copy our files into
WORKDIR /app
# pack node into our new image
RUN npm init -y
RUN npm install bench
# copy file into our container
COPY evalFunc.js /app
# run this command by default
CMD ['node', 'evalFunc.js']
