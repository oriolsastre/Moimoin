require("dotenv").config({ path: __dirname + "/./../.env" });
const path = require("path");
const express = require("express");

const clientConfig = {
  port: process.env.CLIENT_PORT
};
const app = express();
app.disable("x-powered-by");
app.use(express.static(path.join(__dirname, "public")));
app.get('*', ( req, res ) => {
  res.sendFile( path.join( __dirname, 'public', 'NotFound.html' ) );
} );

app.listen(clientConfig.port, () => {
  console.log(`Client listening on port ${clientConfig.port}`);
});