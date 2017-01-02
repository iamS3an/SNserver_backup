function disappearsuccessmessage() {
  $('#showSuccess').hide();
}

function query(dateString) {
  $('#hw').val('');
  $('#toBring').val('');
  $('#test').val('');
  $.ajax({
    method: 'GET',
    url: `schoolTodoListApi/v1/todo?date=${dateString}`,
  })
    .done((data) => {
      // alert(data);
      $('#waveLoader').hide();
      console.log(data);
      $('#hw').val(data.result.hw);
      // alert(data.result.hw);
      $('#toBring').val(data.result.toBring);
      $('#test').val(data.result.test);
    })
    .fail((data) => {
      // alert("fail");
      $('#waveLoader').hide();
      console.log(data);
      $('#hw').text('');
      $('#toBring').text('');
      $('#test').text('');
    });
}

$('#dateInput').keypress((event) => {
  if (event.keyCode === 13 || event.which === 13) {
    $('#queryButton').click();
    event.preventDefault();
  }
});

$('#queryButton').on('click', () => {
  const dateString = $('#dateInput').val();
  $('#hw').val('');
  $('#toBring').val('');
  $('#test').val('');
  $.ajax({
    method: 'GET',
    url: `schoolTodoListApi/v1/todo?date=${dateString}`,
  })
    .done((data) => {
      // alert(data);
      $('#waveLoader').hide();
      console.log(data);
      $('#hw').val(data.result.hw);
      // alert(data.result.hw);
      $('#toBring').val(data.result.toBring);
      $('#test').val(data.result.test);
    })
    .fail((data) => {
      // alert("fail");
      $('#waveLoader').hide();
      console.log(data);
      $('#hw').text('');
      $('#toBring').text('');
      $('#test').text('');
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

$('#sendButton').on('click', (e) => {
  // var hw = $("#hw").val();
  // console.log("hw is " + hw);
  // e.preventDefault();
  $('#hw').text('');
  $('#toBring').text('');
  $('#test').text('');
  $.ajax({
    method: 'POST',
    url: 'schoolTodoListApi/v1/todo',
    data: {
      hw: $('#hw').val(),
      toBring: $('#toBring').val(),
      test: $('#test').val(),
      date: $('#dateInput').val(),
    },
    // dataType: "json",
    // contentType: "application/json"
  })
    .done((data) => {
      console.log('success');
      console.log(data);
      $('#showSuccess').show();
      setTimeout('disappearsuccessmessage()', 3000);
    })
    .fail((data) => {
      console.log('fail');
      console.log(data);
    });
});

$('#goViewPage').on('click', () => {
  const dateString = $('#dateInput').val();
  document.location.href = `/schoolTodoListBlackboard?date=${dateString}`;
});

/*----------------------------------------------------------------------------*/

const date = $('#dateRead').text();
console.log(`date is ${date}`);
$.ajax({
  method: 'GET',
  url: `schoolTodoListApi/v1/todo?date=${date}`,
})
  .done((data) => {
    // alert(data);
    $('#circleLoader').hide();
    console.log(data);
    const hwArray = data.result.hw.split('\n');
    for (var i = 0; i < hwArray.length; i++) {
      // hwArray[i]
      $('#todayhw').append(`<h2 class='blackboard-content'>${hwArray[i]}</h2>`);
    }

    const tobringArray = data.result.toBring.split('\n');
    for (var i = 0; i < tobringArray.length; i++) {
      // tobringArray[i]
      $('#tomorrowbring').append(`<h2 class='blackboard-content'>${tobringArray[i]}</h2>`);
    }

    const testArray = data.result.test.split('\n');
    for (var i = 0; i < testArray.length; i++) {
      // testArray[i]
      $('#tomorrowtest').append(`<h2 class='blackboard-content'>${testArray[i]}</h2>`);
    }
    // console.log(hwArray);
    // $("#todayhw").text(data.result.hw);
    // console.log(data.result.hw);
    // alert(data.result.hw);
    // $("#tomorrowbring").text(data.result.toBring);
    // $("#tomorrowtest").text(data.result.test);
  })
  .fail((data) => {
    // alert("fail");
    $('#circleLoader').hide();
    console.log(data);
    $('#todayhw').text('');
    $('#tomorrowbring').text('Loading data fail !!!');
    $('#tomorrowtest').text('');
  });
