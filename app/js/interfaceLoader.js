var freezed = false;

function loadProblem(problemIndex) {
  $.getJSON("../problems.json", function(json) {
    if (problemIndex >= json.length) {
      writeHistoryToFile();
      writeVideoToFile();
      $("#finishedModal").modal("show");
      return;
    }
    problem = json[problemIndex];
    currentProblem = problemIndex;
    $("span#problemNumber").text(currentProblem + 1);
    $("p#problemStatement").html(problem.problemStatement);
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
