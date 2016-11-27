
function loadProblem(problemIndex) {
  $.getJSON("../problems.json", function(json) {
    if (problemIndex >= json.length) {
      writeHistoryToFile();
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
