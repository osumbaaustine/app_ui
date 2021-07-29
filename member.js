var baseUrl = "https://l1braryapi.herokuapp.com";
var selectedRecord = null;
var selectedRecordID = null;

function onMemberSignUp() {
  var formData = {};
  formData["name"] = document.getElementById("name").value;
  formData["email"] = document.getElementById("email").value;
  formData["password"] = document.getElementById("password").value;
  signUp(formData);
  clearSignUpForm();
}

function onMemberLogin() {
  var formData = {};
  formData["email"] = document.getElementById("email").value;
  formData["password"] = document.getElementById("password").value;
  signIn(formData);
  clearSignInForm();
}

function editMember() {
  var formData = {};
  formData["name"] = document.getElementById("name").value;
  formData["email"] = document.getElementById("email").value;
  if (confirm("Are you want to edit the member?")) {
    editUser(formData);
    clearEditForm();
  } else {
    clearEditForm();
  }
}

function signUp(data) {
  var postData = JSON.stringify(data);
  $.ajax({
    type: "POST",
    url: baseUrl + "/members/signup",
    dataType: "json",
    data: postData,
    contentType: "application/json; charset=utf-8",
    cache: false,
    success: function (response) {
      if (!response.success) {
        alert(response.message);
      } else {
        window.location.href = "./index.html";
      }
    },
    error: function (response) {
      alert("Error");
    },
  });
}

function signIn(data) {
  var postData = JSON.stringify(data);
  $.ajax({
    type: "POST",
    url: baseUrl + "/members/signin",
    dataType: "json",
    data: postData,
    contentType: "application/json; charset=utf-8",
    cache: false,
    success: function (response) {
      if (!response.status) {
        alert(response.message);
      } else {
        window.location.href = "./index.html";
      }
    },
    error: function (response) {
      alert("Error");
    },
  });
}

function editUser(data) {
  var postData = JSON.stringify(data);
  $.ajax({
    type: "PUT",
    url: baseUrl + "/members/" + selectedRecordID,
    dataType: "json",
    data: postData,
    contentType: "application/json; charset=utf-8",
    cache: false,
    success: function (response) {
      if (!response.success) {
        alert(response.message);
      } else {
        alert("Updated successfully!");
      }
    },
    error: function (response) {
      alert("Error");
    },
  });
}

function addMemberToTable(data) {
  var allbks = document
    .getElementById("allmbs")
    .getElementsByTagName("tbody")[0];
  var newRecord = allbks.insertRow(allbks.length);

  var cell1 = newRecord.insertCell(0);
  cell1.innerHTML = data.memberid;
  var cell2 = newRecord.insertCell(1);
  cell2.innerHTML = data.name;
  var cell3 = newRecord.insertCell(2);
  cell3.innerHTML = data.email;
  var cell4 = newRecord.insertCell(3);
  cell4.innerHTML =
    '<a onclick="onMemberEdit(this)"><i class="fa fa-pencil" aria-hidden="true"></i></a>';
  var cell5 = newRecord.insertCell(4);
  cell5.innerHTML =
    '<a onclick="onByOne(this)"><i class="fa fa-search" aria-hidden="true"></i></a>';
}

function addByOneToTable(data) {
  var allby = document.getElementById("allby").getElementsByTagName("tbody")[0];
  var newRecord = allby.insertRow(allby.length);

  var cell1 = newRecord.insertCell(0);
  cell1.innerHTML = data.memberid;
  var cell2 = newRecord.insertCell(1);
  cell2.innerHTML = data.title;
  var cell3 = newRecord.insertCell(2);
  cell3.innerHTML = data.returndate;
}

function onMemberEdit(td) {
  selectedRecord = td.parentElement.parentElement;
  selectedRecordID = selectedRecord.cells[0].innerHTML;
  document.getElementById("name").value = selectedRecord.cells[1].innerHTML;
  document.getElementById("email").value = selectedRecord.cells[2].innerHTML;
  document.getElementById("info3").style.display = "block";
}

function onByOne(td) {
  selectedRecord = td.parentElement.parentElement;
  selectedRecordID = selectedRecord.cells[0].innerHTML;
  getByOne(selectedRecordID);
}

function clearSignUpForm() {
  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("password").value = "";
}

function clearSignInForm() {
  document.getElementById("email").value = "";
  document.getElementById("password").value = "";
}

function clearEditForm() {
  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
}

$(document).ready(function () {
  $.ajax({
    type: "GET",
    url: baseUrl + "/members/",
    cache: false,
    success: function (response) {
      var data = response.data;
      data.forEach((book) => {
        addMemberToTable(book);
      });
    },
  });
});

function getByOne(selectedRecordID) {
  $.ajax({
    type: "GET",
    url: baseUrl + "/borrow/member/" + selectedRecordID,
    cache: false,
    success: function (response) {
      if (!response.success) {
        alert(message);
      } else {
        $("#tbody").empty();
        var data = response.data;
        data.forEach((book) => {
          addByOneToTable(book);
        });
      }
    },
    error: function (response) {
      alert("Error", response);
    },
  });
}
