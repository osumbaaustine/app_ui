var baseUrl = "https://l1braryapi.herokuapp.com";
var selectedRecord = null;
var selectedRecordID = null;

function submitBook() {
  var formData = {};
  formData["title"] = document.getElementById("title").value;
  formData["copies"] = document.getElementById("copies").value;
  saveBook(formData);
  clearBookForm();
}

function ReqBook() {
  var formData = {};
  formData["titleid"] = document.getElementById("titleid").value;
  formData["memberid"] = document.getElementById("memberid").value;
  RequestBook(formData);
  clearReqForm();
}

function RequestBook(data) {
  var postData = JSON.stringify(data);
  $.ajax({
    type: "POST",
    url: baseUrl + "/borrow/",
    dataType: "json",
    data: postData,
    contentType: "application/json; charset=utf-8",
    cache: false,
    success: function (response) {
      if (!response.success) {
        alert(response.message);
      } else {
        var data = response.data;
        location = location;
      }
    },
    error: function (response) {
      alert("Error");
    },
  });
}

function saveBook(data) {
  var postData = JSON.stringify(data);
  $.ajax({
    type: "POST",
    url: baseUrl + "/book/",
    dataType: "json",
    data: postData,
    contentType: "application/json; charset=utf-8",
    cache: false,
    success: function (response) {
      var data = response.data;
      location = location;
      addBookToTable(data);
    },
  });
}

function addBookToTable(data) {
  var allbks = document
    .getElementById("allbks")
    .getElementsByTagName("tbody")[0];
  var newRecord = allbks.insertRow(allbks.length);

  var cell1 = newRecord.insertCell(0);
  cell1.innerHTML = data.bookid;
  var cell2 = newRecord.insertCell(1);
  cell2.innerHTML = data.title;
  var cell3 = newRecord.insertCell(2);
  cell3.innerHTML = data.copies;
  var cell4 = newRecord.insertCell(3);

  cell4.innerHTML =
    '<a onclick="onBookReq(this)"><i class="fa fa-plus" aria-hidden="true"></i></a>';
}

function onBookReq(td) {
  selectedRecord = td.parentElement.parentElement;
  selectedRecordID = selectedRecord.cells[0].innerHTML;
  document.getElementById("titleid").value = selectedRecord.cells[0].innerHTML;
}

function addBorrowToTable(data) {
  var allbrw = document
    .getElementById("allbrw")
    .getElementsByTagName("tbody")[0];
  var newRecord = allbrw.insertRow(allbks.length);

  var cell1 = newRecord.insertCell(0);
  cell1.innerHTML = data.borrowid;
  var cell2 = newRecord.insertCell(1);
  cell2.innerHTML = data.title;
  var cell3 = newRecord.insertCell(2);
  cell3.innerHTML = data.memberid;
  var cell4 = newRecord.insertCell(3);
  cell4.innerHTML = data.returndate;
  var cell5 = newRecord.insertCell(4);
  cell5.innerHTML =
    '<a onclick="onBookRet(this)"><i class="fa fa-minus-circle" aria-hidden="true"></i></a>';
}

function onBookRet(td) {
  selectedRecord = td.parentElement.parentElement;
  selectedRecordID = selectedRecord.cells[0].innerHTML;
  onReturnBook();
}

function onReturnBook() {
  console.log(selectedRecordID);
  $.ajax({
    type: "POST",
    url: baseUrl + "/borrow/" + selectedRecordID,
    dataType: "json",
    contentType: "application/json; charset=utf-8",
    cache: false,
    success: function (response) {
      var data = response.data;
      location = location;
    },
  });
}

function clearBookForm() {
  document.getElementById("title").value = "";
  document.getElementById("copies").value = "";
}

function clearReqForm() {
  document.getElementById("titleid").value = "";
  document.getElementById("memberid").value = "";
}

$(document).ready(function () {
  $.ajax({
    type: "GET",
    url: baseUrl + "/book/",
    cache: false,
    success: function (response) {
      var data = response.data;
      data.forEach((book) => {
        addBookToTable(book);
      });
    },
  });
});

$(document).ready(function () {
  $.ajax({
    type: "GET",
    url: baseUrl + "/borrow/",
    cache: false,
    success: function (response) {
      var data = response.data;
      data.forEach((book) => {
        addBorrowToTable(book);
      });
    },
    // headers: {
    //   Authorization: `token ${getCookie("authToken")}`,
    // },
  });
});
