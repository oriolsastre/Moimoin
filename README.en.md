# I scolded

Chat using_[socket.io](https://socket.io/)_separating the client and back-end into two different servers.

## technology used

<div align="center">
<a href="https://nodejs.org/" target="_blank"><img style="margin: 10px" src="https://profilinator.rishav.dev/skills-assets/nodejs-original-wordmark.svg" alt="Node.js" height="50" /></a>
<a href="https://expressjs.com/" target="_blank"><img style="margin: 10px" src="https://profilinator.rishav.dev/skills-assets/express-original-wordmark.svg" alt="Express" height="50" /></a>
<a href="https://socket.io/" target="_blank"><img style="margin: 10px" src="https://socket.io/images/logo.svg" alt="Socket.io" height="50" /></a>
<a href="https://www.mysql.com/" target="_blank"><img style="margin: 10px" src="https://profilinator.rishav.dev/skills-assets/mysql-original-wordmark.svg" alt="MySQL" height="50" /></a>
<a href="https://www.docker.com/" target="_blank"><img style="margin: 10px" src="https://profilinator.rishav.dev/skills-assets/docker-original-wordmark.svg" alt="Docker" height="50" /></a>
<a href="https://www.docker.com/" target="_blank"><img style="margin: 10px" src="https://profilinator.rishav.dev/skills-assets/jest.svg" alt="Jest" height="50" /></a>
</div>

## Requirements

To be able to use the chat you must have installed on your computer:

-   NodeJS (<https://nodejs.org/ca/>)
-   Servidor MySQL (<https://www.mysql.com/>)

Or

-   Docker (<https://www.docker.com/>)

## Download the repository

Download this repository to your local computer. If you have GIT installed you can do it from a terminal with the command

    git clone https://github.com/oriolsastre/Moimoin

## Installation with Docker

Open a terminal in the folder you just downloaded and run the command:

    docker compose up

Make sure ports 3000, 5000 and especially 3306 are not busy. 3306 is what MySQL uses by default and if you have it installed on your computer it could be busy. Stop any running MySQL service, if any, before starting the chat using Docker.

Any changes to the environment variables that you consider necessary will need to be made in the file`docker-compose.yml`which you will find in the root folder.

## Standard installation

### Set the environment variables

In the folder you just downloaded you will find a file called "_.env-template_". Make a copy of it, name it "_.env_" and complete the fields inside that belong to your system. Above all, configure the credentials of your MySQL server.

Els valors del port i host tant del client com del server (fa referència al backend) no els hauries de canviar si no és absolutament necessari. En cas de canviar algun valor, tenir en compte que potser s'ha de canviar també en alguna part tant del servidor client (per connectar amb l'API del back) com al backend (per habilitar CORS).

_CHAT-ADMIN-PSWD_refers to the password that the Admin user will have that is created by default when starting the chat. Choose freely by arrangement. By default or absence it will be '1234'.

_JWT-SECRET_choose freely It is used when generating the JWTs that are used for authentication.

### Install dependencies

To install the dependencies you need to install both the client and backend dependencies. From a terminal we place it in the folder_client_i_server_and execute, respectively, the order

    npm install

Once installed, also separately, we will raise the two servers by executing the command respectively.

    npm start

Through the client console we will see in which direction the server is and we will be able to connect to it from a browser.

## Characteristics

Where to chat with other users. Additional rooms can be created in which to hold conversations. At all times you can see who is connected to the chat. It is also announced if a user enters or leaves the chat, or if he enters or leaves the room where you are. In addition, you can see in which room you have nour messages to read (per session).

## BACKEND

For more information about the backend server see:[SERVER README](./server/README.md)

## FRONTEND

For more information about the front-end server:[CLIENT README](./client/README.md)
