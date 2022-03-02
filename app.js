let btnKullaniciEkleme = document.querySelector("#kullaniciEkleme");
let inpName = document.querySelector("#name");
let inpBalance = document.querySelector("#balance");
let userList = document.querySelector(".user-list");
var fromUsers = document.querySelector("#fromUsers");
var toUsers = document.querySelector("#toUsers");
var amount = document.querySelector("#amount");
let history = document.querySelector(".history");
let transferHistoryList = document.querySelector(".transfer-history-list");
var transferButton = document.querySelector("#transfer");

let users = [];
let transferHistory = [];

var balance1 = 250;
var balance2 = 249;

if (balance1 <= balance2) {
    console.log(true);
}else{
    console.log(false);
}

transferButton.addEventListener("click", function () {
  if (toUsers.value || fromUsers.value || amount.value) {
    if (toUsers.value == fromUsers.value) {
      alert("Aynı kişiye transfer yapamzsın!");
    } else {
      var foundUserFrom = users[fromUsers.value];
      var foundUserTo = users[toUsers.value];

      if (Number(foundUserFrom.balance) >= Number(amount.value)) {
        foundUserFrom.balance =
          Number(foundUserFrom.balance) - Number(amount.value);
        foundUserTo.balance =
          Number(foundUserTo.balance) + Number(amount.value);
        const date = new Date();

        transferHistory = [
          
          {
            username: foundUserFrom.username,
            balance: foundUserFrom.balance,
            date: date,
            message: `<strong>${foundUserFrom.username}</strong> adlı kullanıcı <strong>${foundUserTo.username}</strong> adlı kullanıcıya <strong>${amount.value} ₺</strong> gönderdi.`,
          },
          ...transferHistory,
        ];
        renderUserHistory();
        renderTransferHistory();
      } else {
        alert("Yetersiz bakiye!");
      }
    }
  } else {
    alert("alıcı, gönderici ve bakiye boş gönderilemez.");
  }
});

btnKullaniciEkleme.addEventListener("click", function () {
  if (inpName.value && inpBalance.value) {
    users = [
      ...users,
      {
        username: inpName.value,
        balance: inpBalance.value,
      },
    ];

    const date = new Date();

    transferHistory = [
      {
        username: inpName.value,
        balance: inpBalance.value,
        date: date,
        message: `<strong>${inpName.value}</strong> adlı kullanıcı <strong>${inpBalance.value} ₺</strong> bakiye yükledi.`,
      },
      ...transferHistory,

    ];
  }

  var userHistoryPrinter = "";
  var registeredUsersListPrinter = "";
  users.map((item, index) => {
    userHistoryPrinter += `<li class="list-group-item" key="${index}"><span style="float: right;">${item.balance} ₺</span> ${item.username}</li>`;
    registeredUsersListPrinter += `<option value="${index}">${item.username}</option>`;
  });

  userList.innerHTML = userHistoryPrinter;
  toUsers.innerHTML = registeredUsersListPrinter;
  fromUsers.innerHTML = registeredUsersListPrinter;

  inpName.value = null;
  inpBalance.value = null;

  renderTransferHistory();

  
});

function renderUserHistory() {
  var userHistoryPrinter = "";

  users.map((item, index) => {
    userHistoryPrinter += `<li class="list-group-item" key="${index}"><span style="float: right;">${item.balance} ₺</span> ${item.username}</li>`;
  });

  userList.innerHTML = userHistoryPrinter;
}

function renderTransferHistory() {
  var transferHistoryPrinter = "";

  transferHistory.map((item, index) => {
    transferHistoryPrinter += `<li class="list-group-item" key="${index}"><span style="float: right;">${item.date.getHours()}:${item.date.getMinutes()}</span> ${item.message}</li>`;
  });
  transferHistoryList.innerHTML = transferHistoryPrinter;
}
