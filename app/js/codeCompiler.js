const tempSourceFilePath = __dirname + "/../temp/temp.c";
const tempObjFilePath = __dirname + "/../temp/temp.out";
const tempInputFilePath = __dirname + "/../temp/input.txt";

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
        $("textarea#console").text("Error in compilation");
        return console.log("Error in compilation");
      }
      var execute = spawn(tempObjFilePath, []);
      console.log(input);
      execute.stdin.write(input + "\n");
      readline.createInterface({
        input: execute.stdout,
        terminal: false
      }).on("line", function(line) {
        $("textarea#console").append(line + "\n");
      });
      execute.on("close", function(code) {
        if (code != 0) {
          $("textarea#console").text("Runtime error");
          return console.log("Runtime error");
        }
      });
    });
  });

}
