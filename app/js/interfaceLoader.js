var freezed = false;

function loadProblem(problemIndex) {
  $.getJSON("../problems.json", function(json) {
    if (problemIndex >= json.length) {
      terminate();
      return;
    }
    problem = json[problemIndex];
    currentProblem = problemIndex;
    $("span#problemNumber").text(currentProblem + 1);
    $("p#problemStatement").html(problem.problemStatement);
    if (problem.sampleInput == "") {
      $("p#sampleInput").html("(no input)");
    }
    else {
      $("p#sampleOutput").html(problem.sampleInput);
    }
    $("p#sampleOutput").html(problem.sampleOutput);
    $("ul#constraints").html("");
    console.log(problem.constraints);
    var builder = "";
    for (var i = 0; i < problem.constraints.length; i++) {
      builder += "<li>" + problem.constraints[i] + "</li>";
    }
    if (builder == "") {
      $("ul#constraints").append("<li>(none)</li>");
    }
    else {
      $("ul#constraints").append(builder);
    }
    $("input#inputField").val("");
    $("textArea#console").text("");
    editor.getSession().getDocument().setValue("");
  });
}

function freeze() {
  freezed = true;
  $(".submitButton").prop("disabled", true);
  $(".runButton").prop("disabled", true);
  $("img#loader").css("display", "inline");
}

function unfreeze() {
  freezed = true;
  $(".submitButton").prop("disabled", false);
  $(".runButton").prop("disabled", false);
  $("img#loader").css("display", "none");
}

function terminate() {
  writeHistoryToFile();
  //writeVideoToFile();
  $("#finishedModal").modal("show");
}
