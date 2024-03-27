const express = require("express");
const mqtt = require("mqtt");

const app = express();
const client = mqtt.connect("mqtt://broker.hivemq.com");

const toEsp = "/gaurav210233@gmail.com/in";
const fromEsp = "/gaurav210233@gmail.com/out";

// Serve the HTML file
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

client.on("connect", () => {
  client.subscribe(toEsp, (err) => {
    if (!err) {
      console.log("Connected to MQTT broker");
    } else {
      console.error("Error subscribing:", err);
    }
  });
});

// Handle MQTT message reception
client.on("message", (topic, message) => {
  console.log(message.toString());
});

// Handle button click event
app.post("/send-message", (req, res) => {
  // Publish message when button is clicked
  client.publish(toEsp, "Button clicked");
  res.send("Message sent to MQTT broker");
});

process.on("SIGINT", () => {
  client.end();
});
