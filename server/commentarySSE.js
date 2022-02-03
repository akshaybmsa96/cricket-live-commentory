let clientResId = null;
function eventsHandler(request, response) {
  clientResId = response;
  const headers = {
    "Content-Type": "text/event-stream",
    Connection: "keep-alive",
    "Cache-Control": "no-cache",
  };
  response.writeHead(200, headers);
  console.log("here?");

  //response.write(`data: ${JSON.stringify({ data: "Stream started" })}\n\n`);

  request.on("close", () => {
    console.log(`Connection closed`);
  });
}

function validate(data) {
  if (data.ball && data.commentary && data.id) {
    return true;
  }
  return false;
}

function addCommentary(request, response) {
  const newCommentary = request.body;
  let error = false;
  if (Array.isArray(newCommentary)) {
    newCommentary.forEach((comment) => {
      error = validateAndSend(response, comment);
    });
  } else {
    error = validateAndSend(response, newCommentary);
  }
  if (!error) response.json(newCommentary);
}

function validateAndSend(res, newCommentary) {
  if (validate(newCommentary)) {
    senDataToClient(newCommentary);
  } else {
    res.send(
      `Not a valid format for ${JSON.stringify(
        newCommentary
      )}, use [{ball: 'string', id: 'number' ,commentary: 'string'}]`
    );
    return true;
  }

  return false;
}

function senDataToClient(data) {
  if (clientResId) {
    clientResId.write(`data: ${JSON.stringify(data)}\n\n`);
  }
}

module.exports.commentarySSE = eventsHandler;
module.exports.addCommentary = addCommentary;
