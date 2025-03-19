// CHANNEL_ID is defined in the index.ejs file

const drone = new Scaledrone("bgONY5HPC4DCLumW", {
  color: "0x69B4",
});
drone.on("open", (error) => {
  if (error) {
    return console.error(error);
  }
  fetch("auth/" + drone.clientId)
    .then((response) => response.text())
    .then((jwt) => drone.authenticate(jwt));
});

drone.on("close", (event) => console.log("Connection was closed", event));
drone.on("error", (error) => console.error(error));

const room = drone.subscribe("feed", {
  historyCount: 100, // ask for the 100 latest messages from history
});

room.on("history_message", ({ data }) => {
  console.log(data);
  addFeedItemToTop(data);
});

room.on("data", (data) => {
  console.log(data);
  addFeedItemToTop(data);
});

//------------- DOM STUFF

const DOM = {
  submitButton: document.querySelector("button"),
  input: document.querySelector("input"),
  feed: document.querySelector(".feed"),
};
const xhr = new XMLHttpRequest();
DOM.submitButton.addEventListener("click", sendMessage);

function sendMessage() {
  const value = DOM.input.value;
  if (!value) {
    return;
  }
  console.log(value);
  const val1 = 'Drax:  '+value;
  console.log(val1);
  drone.publish({
    room: "feed",
    message: {
      feedMessage: val1,
      color: "#FF69B4",
    },
  });
  const data = { value, value2: "Drax" };
  xhr.open('POST', '/submit',true);
  console.log(JSON.stringify(data));
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.send("message="+value);
  DOM.input.value = '';
}

function addFeedItemToTop(item) {
  DOM.feed.insertBefore(createFeedItem(item), DOM.feed.firstChild);
}

function createFeedItem(item) {
  const { feedMessage, color } = item;
  const el = document.createElement("div");
  el.appendChild(document.createTextNode(feedMessage));
  el.className = "feed-item";
  el.style.borderBottomColor = color;
  return el;
}
