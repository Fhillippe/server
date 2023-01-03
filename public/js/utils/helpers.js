const bot = "Usefull bot";
const helpers = {
  socket: "",
  overviewDom: document.querySelector("#overview"),
  clearOverview() {
    this.clearElement(this.overviewDom);
  },
  displayName(name) {
    const nameBox = document.querySelector("#nameBox");
    this.clearElement(nameBox);
    const nameParagraph = this.createDomElement("p", ["name"], [name]);
    nameBox.appendChild(nameParagraph);
  },
  createDomElement(type, classlist = [], childrenlist = []) {
    const element = document.createElement(type);
    classlist.forEach((_class) => element.classList.add(_class));
    childrenlist.forEach((child) => {
      if (typeof child === "string") {
        element.innerHTML += child;
      } else {
        element.appendChild(child);
      }
    });
    return element;
  },
  outputMessage(msg, author = bot) {
    const messageBox = document.querySelector("#messageBox");
    const text = this.createDomElement("p", ["messageText"], [msg]);
    const meta = this.createDomElement("p", ["messageMeta"], [author]);
    const div = this.createDomElement("div", ["message"], [meta, text]);
    messageBox.appendChild(div);
    messageBox.scrollTop = messageBox.scrollHeight;
  },
  creatRoomTiles(overview) {
    const tiles = [];
    overview.forEach((room) => {
      const numberOfPlayers = room.players.length;
      if (numberOfPlayers !== 2) {
        const id = this.createDomElement("p", ["roomTileId"], [room.roomId]);
        const players = this.createDomElement(
          "p",
          ["roomTileAmountOfPlayers"],
          [`${numberOfPlayers}/2`]
        );
        const div = this.createDomElement("div", ["roomTile"], [id, players]);
        tiles.push(div);
      }
    });
    return tiles;
  },
  addTilesTo(element, tiles) {
    tiles.forEach((room) => {
      element.appendChild(room);
    });
  },
  clearElement(element) {
    element.innerHTML = "";
  },
  handleJoinRoom(e) {
    if (e.target.classList.contains("roomTile")) {
      const roomId = e.target.querySelector(".roomTileId").innerHTML;
      this.socket.emit("joinRoom", roomId);
    }
  },
  renderOverwiev(overview) {
    this.clearElement(this.overviewDom);
    const tiles = this.creatRoomTiles(overview);
    this.addTilesTo(this.overviewDom, tiles);
  },
};

document.querySelector("#overview").addEventListener("click", (e) => {
  helpers.handleJoinRoom(e);
});