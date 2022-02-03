let serverEvent = null;

const estabilishConnection = (url) => {
  console.log(url);
  serverEvent = new EventSource(url);

  serverEvent.addEventListener("open", (e) => {
    console.log("Connection estabilished with server", e);
    postMessage(JSON.stringify({ type: "OPEN" }));
  });

  serverEvent.addEventListener("close", () => {
    console.log("Connection closed with server");
    postMessage(JSON.stringify({ type: "CLOSE" }));
  });

  serverEvent.addEventListener("error", function (event) {
    console.log("Got error: ", event);
    postMessage(JSON.stringify({ type: "ERROR" }));
  });

  serverEvent.onmessage = function (event) {
    let message = event?.data;
    console.log(event);
    postMessage(JSON.stringify({ type: "RECEIVED", data: message }));
  };

  console.log("serverEvent", serverEvent);
};

onmessage = function (e) {
  console.log("Worker: Message received from main script");
  const data = JSON.parse(e.data);
  switch (data.type) {
    case "start":
      estabilishConnection(data.url);
      break;
    case "stop":
      break;
  }
};

// const start
