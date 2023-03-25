const auth = require("json-server-auth");
const jsonServer = require("json-server");

const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middleware = jsonServer.defaults();
const port = process.env.PORT || 9000;

// Bind the router db to the app
server.db = router.db;

server.use(middleware);

const rules = auth.rewriter({
  users: 640,
  conversations: 660,
  messages: 660,
});

server.use(rules);
server.use(auth);
server.use(router);

server.listen(port, () => {
  console.log("JSON Server is running ");
  console.log("http://localhost:9000");
});
