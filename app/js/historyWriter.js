var startTime = null;
historyItems = new Array();

function startSession() {
  startTime = new Date().getTime();
}

function logEvent(type, eventData) {
  var timestamp = new Date().getTime() - startTime;
  historyItems.push({
    timestamp: timestamp,
    type, type,
    eventData: eventData
  });
}

function writeHistoryToFile() {
  var serialized = JSON.stringify(historyItems);
  fs.writeFile(__dirname + "/../data/" + idNumber + ".txt", serialized, function(err) {
    if (err) {
      return console.log(err);
    }
  });
}
