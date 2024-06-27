import http from"node:http"
import process from "node:process"
import express, { json } from "express"
import { WebSocketServer } from "ws"
import { url } from "node:inspector";
import { type } from "node:os";
import { MongoClient, ObjectId } from "mongodb";

let messageArray = [];
let lastMessage;

let messages;
let users;

async function main() {
  // Connectiong to database
  const dburl = "mongodb+srv://doadmin:x62jNC54Pi1W3t98@db-mongodb-pml30-2024-12312526.mongo.ondigitalocean.com/admin?tls=true&authSource=admin"
  const client = new MongoClient(dburl);

  const connection = await client.connect();
  const database = "PML30-2024-J";
  const db = connection.db(database);
  users = db.collection("VG6_3Dchat_Users");
  messages = db.collection("VG6_3Dchat_Messages");
  const ans = await messages.find().toArray();
  for (let elem of ans)
    messageArray.push({name: elem.name, text: elem.text, logo: elem.logo})
  
  // Server initialization
  const app = express();
  const server = http.createServer(app);
  const wss = new WebSocketServer({server});

  app.use(express.static("client"));
    // const host = "localhost"; ////192.168.30.82
    const port = 8000;
  server.listen(port, () => {
    console.log(`Server init`);
  })

  let js

  wss.on("connection", (ws) => {
    ws.on("message", async (message) => {
      try {
        js = JSON.parse(message.toString());
        if (js.type == "enter") {
          let ans = await users.find({name: js.value}).toArray();

          if (ans.length == 0) {
            if (js.value != "")
              users.insertOne({name: js.value});
            else
              return
          }
          ws.send(JSON.stringify({type: "enter", value: js.value, charecter: js.charecter}));

        } else if (js.type == "player move") {
          for (let elem of wss.clients) {
            elem.send(JSON.stringify({type: "player move", name: js.name, 
              pos: js.pos, matr: js.matr, charecter: js.charecter}))
          }
        }
        // CHAT MESSAGES RESPONSE
        else if (js.type == "message") {
          messageArray.push({name: js.name, text: js.text, logo: js.logo});
          messages.insertOne({name: js.name, text: js.text, logo: js.logo})
          for (let elem of wss.clients)
            elem.send(JSON.stringify({type: "message", name: js.name, text: js.text, logo: js.logo}));
        }
      } catch {}
    })
    ws.send(JSON.stringify({type: "message array", array: messageArray}))
  ws.on("close", async () => {
    for (let elem of wss.clients)
      elem.send(JSON.stringify({type: "event", event: "disconnection"}));

  });
  })
}

main();

