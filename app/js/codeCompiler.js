const tempSourceFilePath = __dirname + "/../temp/temp.c";
const tempObjFilePath = __dirname + "/../temp/temp.out";
const tempInputFilePath = __dirname + "/../temp/input.txt";
const tempRunFilePath = __dirname + "/../temp/res.txt";

function runCode(doc) {
  $("textarea#console").text("");
  var content = doc.getValue();
  var input = $("input#inputField").val();

  fs.writeFile(tempSourceFilePath, content, function(err) {
    if (err) {
      return console.log(err);
    }
    var gcc = spawn("gcc", [tempSourceFilePath, "-o", tempObjFilePath]);

    gcc.on("close", function(code) {
      if (code != 0) {
        logEvent("code compiled", {
          verdict: "compile error"
        });
        $("textarea#console").text("Error in compilation");
        return console.log("Error in compilation");
      }
      var execute = spawn(tempObjFilePath, []);
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
        $("textarea#console").append(line + "\n");
      });
      execute.on("close", function(code) {
        if (code != 0) {
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
        for (var i = 0; i < testCases.length; i++) {
          fs.writeFileSync(tempInputFilePath, testCases[i].inputString);
          var out = fs.openSync(tempRunFilePath, "w");
          var input = fs.openSync(tempInputFilePath, "r");

          console.log(testCases[i].inputString + "\n");
          var execute = spawnSync(tempObjFilePath, [],  {
            stdio: [input, out, out]
          });
          var res = fs.readFileSync(tempRunFilePath, "utf8");
          res = res.replace(/\r?\n|\r/g, "");
          var out = testCases[i].outputString.replace(/\r?\n|\r/g, "");
          console.log("Checking: " + res + " and " + out);
          if (res != out) {
            console.log("Failed")
            verdict = false;
          }
        }
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
    });
  });
}
