function disappearsuccessmessage() {
  $("#showSuccess").hide();
}

$('#dateInput').keypress(function(event) {
  if (event.keyCode == 13 || event.which == 13) {
      $('#queryButton').click();
      event.preventDefault();
  }
});
$("#queryButton").on( "click", function () {
  var dateString = $('#dateInput').val();
  $("#hw").val("");
  $("#toBring").val("");
  $("#test").val("");
  $.ajax({
    method: "GET",
    url: "api/v1/todo?date=" + dateString
  })
    .done(function(data) {
      // alert(data);

      console.log(data);
      $("#hw").val(data.result.hw);
      // alert(data.result.hw);
      $("#toBring").val(data.result.toBring);
      $("#test").val(data.result.test);
    })
    .fail(function(data) {
      // alert("fail");
      console.log(data);
      $("#hw").text("");
      $("#toBring").text("");
      $("#test").text("");
    });
})


$("#sendButton").on("click", function(e) {
  // var hw = $("#hw").val();
  // console.log("hw is " + hw);
  // e.preventDefault();
  $("#hw").text("");
  $("#toBring").text("");
  $("#test").text("");
  $.ajax({
    method: "POST",
    url: "api/v1/todo",
    data: {
      hw: $("#hw").val(),
      toBring: $("#toBring").val(),
      test: $("#test").val(),
      date: $("#dateInput").val()
    }
    // dataType: "json",
    // contentType: "application/json"
  })
    .done(function (data) {
      console.log("success");
      console.log(data);
      $("#showSuccess").show();
      setTimeout("disappearsuccessmessage()", 3000);
    })
    .fail(function(data) {
      console.log("fail");
      console.log(data);
    });

});

$("#goViewPage").on("click", function () {
  var dateString = $('#dateInput').val();
  document.location.href='/blackboard?date=' + dateString;
});
