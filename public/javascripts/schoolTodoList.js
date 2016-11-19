function disappearsuccessmessage() {
  $("#showSuccess").hide();
}

function query(dateString){
  $("#hw").val("");
  $("#toBring").val("");
  $("#test").val("");
  $.ajax({
    method: "GET",
    url: "schoolTodoListApi/v1/todo?date=" + dateString
  })
    .done(function(data) {
      // alert(data);
      $("#waveLoader").hide();
      console.log(data);
      $("#hw").val(data.result.hw);
      // alert(data.result.hw);
      $("#toBring").val(data.result.toBring);
      $("#test").val(data.result.test);
    })
    .fail(function(data) {
      // alert("fail");
      $("#waveLoader").hide();
      console.log(data);
      $("#hw").text("");
      $("#toBring").text("");
      $("#test").text("");
    });
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
    url: "schoolTodoListApi/v1/todo?date=" + dateString
  })
    .done(function(data) {
      // alert(data);
      $("#waveLoader").hide();
      console.log(data);
      $("#hw").val(data.result.hw);
      // alert(data.result.hw);
      $("#toBring").val(data.result.toBring);
      $("#test").val(data.result.test);
    })
    .fail(function(data) {
      // alert("fail");
      $("#waveLoader").hide();
      console.log(data);
      $("#hw").text("");
      $("#toBring").text("");
      $("#test").text("");
    });
});

// $("#dateInput").change( function () {
//   var dateString = $('#dateInput').val();
//   $("#hw").val("");
//   $("#toBring").val("");
//   $("#test").val("");
//   $.ajax({
//     method: "GET",
//     url: "schoolTodoListApi/v1/todo?date=" + dateString
//   })
//     .done(function(data) {
//       // alert(data);
//
//       console.log(data);
//       $("#hw").val(data.result.hw);
//       // alert(data.result.hw);
//       $("#toBring").val(data.result.toBring);
//       $("#test").val(data.result.test);
//     })
//     .fail(function(data) {
//       // alert("fail");
//       console.log(data);
//       $("#hw").text("");
//       $("#toBring").text("");
//       $("#test").text("");
//     });
// });

$("#sendButton").on("click", function(e) {
  // var hw = $("#hw").val();
  // console.log("hw is " + hw);
  // e.preventDefault();
  $("#hw").text("");
  $("#toBring").text("");
  $("#test").text("");
  $.ajax({
    method: "POST",
    url: "schoolTodoListApi/v1/todo",
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
  document.location.href='/schoolTodoListBlackboard?date=' + dateString;
});

/*----------------------------------------------------------------------------*/

var date = $('#dateRead').text();
console.log('date is ' + date);
$.ajax({
  method: "GET",
  url: "schoolTodoListApi/v1/todo?date=" + date
})
  .done(function(data) {
    // alert(data);
    $("#circleLoader").hide();
    console.log(data);
    var hwArray = data.result.hw.split('\n');
    for (var i = 0; i < hwArray.length; i++) {
      // hwArray[i]
      $( "#todayhw" ).append( "<h2 class='blackboard-content'>" + hwArray[i] + "</h2>" );
    }

    var tobringArray = data.result.toBring.split('\n');
    for (var i = 0; i < tobringArray.length; i++) {
      // tobringArray[i]
      $( "#tomorrowbring" ).append( "<h2 class='blackboard-content'>" + tobringArray[i] + "</h2>" );
    }

    var testArray = data.result.test.split('\n');
    for (var i = 0; i < testArray.length; i++) {
      // testArray[i]
      $( "#tomorrowtest" ).append( "<h2 class='blackboard-content'>" + testArray[i] + "</h2>" );
    }
    // console.log(hwArray);
    // $("#todayhw").text(data.result.hw);
    // console.log(data.result.hw);
    // alert(data.result.hw);
    // $("#tomorrowbring").text(data.result.toBring);
    // $("#tomorrowtest").text(data.result.test);
  })
  .fail(function(data) {
    // alert("fail");
    $("#circleLoader").hide();
    console.log(data);
    $("#todayhw").text("");
    $("#tomorrowbring").text("Loading data fail !!!");
    $("#tomorrowtest").text("");
  });
