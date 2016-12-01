const tempSourceFilePath = __dirname + "/../temp/temp.c";
const tempObjFilePath = __dirname + "/../temp/temp.out";
const tempInputFilePath = __dirname + "/../temp/input.txt";
const tempRunFilePath = __dirname + "/../temp/res.txt";

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

function runCode(doc) {
  freeze();
  $("textarea#console").text("");
  var content = doc.getValue();
  var input = $("input#inputField").val();

  fs.writeFile(tempSourceFilePath, content, function(err) {
    if (err) {
      return console.log(err);
    }

    var gcc = spawn("gcc", [tempSourceFilePath, "-o", tempObjFilePath]);

    gcc.on("close", function(code) {
      completed = true;
      if (code != 0) {
        logEvent("code compiled", {
          verdict: "compile error"
        });
        $("textarea#console").text("Error in compilation");
        unfreeze();
        return console.log("Error in compilation");
      }
      var execute = spawn(tempObjFilePath, []);
      var completed = false;
      var infinite = false;
      setTimeout(function() {
        console.log("Completed");
        if (completed == false) {
          console.log("Killed");
          infinite = true;
          execute.kill();
        }
      }, 1500);
      try {
        if (input != "") {
          execute.stdin.write(input + "\n");
        }
      } catch (err) {
        logEvent("code compiled", {
          verdict: "excessive input"
        });
        $("textarea#console").text("Excessive input");
        return console.log("Excessive input");
      }
      readline.createInterface({
        input: execute.stdout,
        terminal: false
      }).on("line", function(line) {
        if (infinite == false) {
          $("textarea#console").append(line + "\n");
        }
      });
      execute.on("close", function(code) {
        completed = true;
        unfreeze();
        if (infinite == true) {
          logEvent("code compiled", {
            verdict: "infinite loop"
          });
          $("textarea#console").text("Program did not terminate on time (possibly infinite loop).");
          return console.log("Infinite loop");
        }
        else if (code != 0) {
          logEvent("code compiled", {
            verdict: "runtime error"
          });
          $("textarea#console").text("Runtime error");
          return console.log("Runtime error");
        }
        else {
          logEvent("code compiled", {
            verdict: "no error"
          });
        }
      });
    });
  });
}

function runTests(doc) {
  freeze();
  var content = doc.getValue();
  var testCases = problem.testCases;

  fs.writeFile(tempSourceFilePath, content, function(err) {
    if (err) {
      return console.log(err);
    }
    var gcc = spawn("gcc", [tempSourceFilePath, "-o", tempObjFilePath]);
    gcc.on("close", function(code) {
      var verdict = true;
      if (code != 0) {
        verdict = false;
      }
      else {
        function checkTestCase(number, callback) {
          console.log("Checking: " + number);
          var outputString = testCases[number].outputString.replace(/^\s\n+|\s\n+$/g,'');
          var inputString = testCases[number].inputString;

          var execute = spawn(tempObjFilePath, []);
          var completed = false;
          var res = "";

          execute.stdin.write(inputString + "\n");

          setTimeout(function() {
            if (completed == false) {
              console.log("Timed out");
              execute.kill();
            }
          }, 1500);

          readline.createInterface({
            input: execute.stdout,
            terminal: false
          }).on("line", function(line) {
            res += line;
          });

          execute.on("close", function(code) {
            completed = true;
            if (code == 0) {
              res = res.replace(/^\s\n+|\s\n+$/g,'');
              console.log("Checking: " + outputString + " " + res);
              if (outputString == res) {
                callback(true);
              }
              else {
                callback(false);
              }
            }
            else {
              callback(false);
            }
          });
        }

        var numCorrect = 0;
        var totalFinished = 0;
        function acceptResult(correct) {
          totalFinished++;
          if (correct == true) {
            numCorrect++;
          }
          if (totalFinished == testCases.length) {
            displayVerdict();
          }
        }

        for (var i = 0; i < testCases.length; i++) {
          checkTestCase(i, acceptResult);
        }

        function displayVerdict() {
          unfreeze();
          if (numCorrect != testCases.length) {
            verdict = false;
          }
          if (verdict == true) {
            $("#modal .closeButton").unbind("click");
            $("#modal .modal-title").text("Correct!");
            $("#modal .modal-body p").text("Your code has passed all the test cases. You may move on to the next problem.");
            logEvent("code submitted", {
              verdict: "passed"
            });
            $("#modal").modal("show");
            $("#modal .closeButton").click(function() {
              $("#modal .closeButton").unbind("click");
              loadProblem(currentProblem + 1);
              $("#modal").modal("hide");
            });

          }
          else if (verdict == false) {
            $("#modal .closeButton").unbind("click");
            $("#modal .modal-title").text("Wrong!");
            $("#modal .modal-body p").text("Your code failed in at least one of the test cases. Please try again.");
            logEvent("code submitted", {
              verdict: "failed"
            });
            $("#modal").modal("show");
            $("#modal .closeButton").click(function() {
              $("#modal .closeButton").unbind("click");
              $("#modal").modal("hide");
            });
          }
        }
      }
    });
  });
}
