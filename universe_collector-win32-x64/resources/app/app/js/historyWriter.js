var startTime = null;
const timeLimit = 2700000;
historyItems = new Array();

function startSession() {
  startTime = new Date().getTime();
  setTimeout(function() {
    terminate();
  }, timeLimit)
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
