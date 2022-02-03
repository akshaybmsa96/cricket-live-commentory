class CricketCommentary {
  constructor(commentaryLink) {
    this.eventURL = commentaryLink;
    this.scoreContainer = document.getElementById("scoreContainer");
  }

  getNewCommentry(data) {
    const newScore = this.getCommentaryHtml(data);
    newScore && this.updateCommentary(newScore);
  }

  getCommentaryHtml({ ball, commentary, id }) {
    if (document.getElementById(id)) {
      const scoreBox = document.getElementById(id);
      scoreBox.children[scoreBox.children.length - 2].innerHTML = ball;
      scoreBox.lastChild.innerHTML = commentary;
      return null;
    }
    const scoreBox = document.createElement("div");
    scoreBox.id = id;
    scoreBox.classList.add("score");
    const scoreBall = document.createElement("span");
    scoreBall.classList.add("score-ball");
    scoreBall.innerHTML = ball;
    const scoreCommentary = document.createElement("p");
    scoreCommentary.classList.add("score-commentary");
    scoreCommentary.innerHTML = commentary;

    if (ball.includes(".6")) {
      const divider = document.createElement("hr");
      scoreBox.appendChild(divider);
      scoreBox.classList.add("endOver");
    }
    scoreBox.appendChild(scoreBall);
    scoreBox.appendChild(scoreCommentary);

    return scoreBox;
  }

  updateCommentary(score) {
    if (this.scoreContainer.firstChild) {
      this.scoreContainer.insertBefore(score, this.scoreContainer.firstChild);
    } else {
      this.scoreContainer.appendChild(score);
    }
  }

  getMessageFromServer(message) {
    switch (message.type) {
      case "OPEN":
        break;
      case "ERROR":
        break;
      case "CLOSE":
        break;
      case "RECEIVED":
        this.getNewCommentry(JSON.parse(message.data));
        break;
      default:
    }
  }

  initialiseServive() {
    this.worker = new Worker("worker.js");
    this.worker.postMessage(
      JSON.stringify({ type: "start", url: this.eventURL })
    );
    this.worker.onmessage = (message) => {
      console.log("msg from server", message.data);
      const data = JSON.parse(message.data);
      this.getMessageFromServer(data);
    };
  }
}

const COMMENTARY_URL = "http://localhost:3000/commentary";

window.addEventListener("DOMContentLoaded", (e) => {
  const cricketCommentary = new CricketCommentary(COMMENTARY_URL);
  cricketCommentary.initialiseServive();
});
