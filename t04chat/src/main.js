let socket = new WebSocket("ws://localhost:8000");

let allMessage, messageBox1, myInput;
let messageBox, sendButton, user, textArea, regButton, regUser, writeStat;
let lastElem, whoAnsweringNow;

let logos = [];
logos.push("https://www.gravatar.com/avatar/0f2b5a5ee7b73f844210d21f682b975b?size=47&amp;default=retro")
logos.push("https://www.gravatar.com/avatar/55f1e47f0b27860a54f4004dad867acd?size=47&amp;default=retro")
logos.push("https://www.gravatar.com/avatar/074e408cabf4eb7a4d5d81da94ce0ad0?size=47&default=retro")
logos.push("https://www.gravatar.com/avatar/fee2a90ac22d2900fd883da16d64033b?size=47&amp;default=retro")
logos.push("https://www.gravatar.com/avatar/7c0010cad957e018d4ee46efab609163?size=47&default=retro")
logos.push("https://www.gravatar.com/avatar/94801ee4f3880d553d1436c5063aaf4a?size=47&default=retro")
logos.push("https://www.gravatar.com/avatar/2dde4e87449856d63d9950bea1598412?size=47&default=retro")
logos.push("https://www.gravatar.com/avatar/ec6bf1ace6722d888e7d69b8acc8c480?size=47&default=retro")
logos.push("https://www.gravatar.com/avatar/1db541b2befb88ad70b370a0a90924a3?size=47&default=retro")
logos.push("https://www.gravatar.com/avatar/5d7d37363987faf203f9d9ca56a05fe6?size=47&default=retro")
logos.push("https://www.gravatar.com/avatar/ddbdf085ff2383ef01530a38e6b7a312?size=47&default=retro")
logos.push("https://www.gravatar.com/avatar/2aa8a68c9415e494efedd32d9d303794?size=47&default=retro")
logos.push("https://www.gravatar.com/avatar/6563f5b54849e24beafccd95efd52d92?size=47&default=retro")
logos.push("https://www.gravatar.com/avatar/288b02dfeb5d20d1cedc0bd5d93c361c?size=47&default=monsterid")
logos.push("https://www.gravatar.com/avatar/50f8691fb4cd914cdba16020e9555957?size=47&default=monsterid")
logos.push("https://www.gravatar.com/avatar/b590b8af7f18b5151ed50c98ed8aa4bb?size=47&default=monsterid")
logos.push("https://www.gravatar.com/avatar/e0ac2956d75c0b71dc3b4110100823a7?size=47&default=monsterid")
logos.push("https://www.gravatar.com/avatar/0722bea731f4c3ba141dc9a2abbe4a32?size=47&default=monsterid")

function loadChat( src ) {
  if (regUser.value != "") {
    const regParent = myInput.parentNode;
    regParent.insertAdjacentHTML("beforeend", 
     `<table class = "myInput">
        <tr><td>Name<img src=${src} class="logo"></td>
        <td><input class = "myInput" name="message" id="user" value = ${regUser.value} readonly></td></tr>
      </table>
      <div id="messageBox1">
        <div id="writingStatuc"></div>
        <table id="messageBox"></table>
      </div>
      <table class = "myInput">
        <td>Text</td>
        <td><textarea name="message" id="myTextArea"></textarea></td>
        <td><button id="send">send</button></td>
      </table>`);
    regParent.removeChild(myInput);

    sendButton = document.getElementById("send");
    user = document.getElementById("user");
    textArea = document.getElementById("myTextArea");
    messageBox = document.getElementById("messageBox");
    messageBox1 = document.getElementById("messageBox1");

    sendButton.addEventListener("click", () =>{
      if (textArea.value != "" && user.value != "")
        socket.send(JSON.stringify({"type": "message", "user": user.value, "text": textArea.value, "logo": src}));
      textArea.value = "";  
    });

    let IslastKeyShift, timerID;

    textArea.addEventListener("keydown", (e) => {
      if (e.code == 'Enter' && !IslastKeyShift) {
        if (textArea.value != "" && user.value != "")
          socket.send(JSON.stringify({"type": "message", "user": user.value, "text": textArea.value, "logo": src}));
        textArea.value = "";  
      } else
        IslastKeyShift = e.key == 'Shift';

      if (e.code == 'AltLeft' || e.code == 'AltRight' || e.code ==  'Tab')
        return

      if (timerID)
        clearTimeout(timerID);
      else
        socket.send(JSON.stringify({"type": "status", "user": user.value, "status": "writing"}))
        
      timerID = setTimeout(() => {
        socket.send(JSON.stringify({"type": "status", "user": user.value, "status": "not writing"}));
        clearTimeout(timerID);
        timerID = undefined;
      }, 2000);
    })

    if (allMessage)
      for (let elem of allMessage) {
        if (elem.user == user.value)
          messageBox.insertAdjacentHTML("beforeend", '<td><div class="message"><div id="myMassege">' + elem.text + '</div></div></td>');
        else {
          if (lastElem && lastElem.user == elem.user)
            messageBox.insertAdjacentHTML("beforeend", '<td><div class="message"><div id="otherMessage">' + elem.text + '</div></div></td>');
          else
            messageBox.insertAdjacentHTML("beforeend", `<td><div class="message"><div id="otherMessage"><div id="otherUserName">${elem.user}<img src="${elem.logo}" class="messageLogo"></div>${elem.text}</div></div></td>`);
        }
        lastElem = elem;
        for (let span of document.querySelectorAll('.message')) { /*messageBox*/
          span.addEventListener("onclick", () => {
          document.innerHTML = "";
          });
        }
      }
    messageBox1.scrollTo(0, messageBox1.scrollHeight);
    
  }
}

window.addEventListener("load", () => {
  regButton = document.getElementById("regButton");
  regUser = document.getElementById("userRegister");
  myInput = document.getElementById("myTable");

  let imgs = [];
  let diva = document.getElementById("logosDiv")
  for (let i = 0; i < logos.length; i++) {
    diva.insertAdjacentHTML("beforeend", `<img id="logo${i}" src="${logos[i]}" class="logos">`);
    imgs[i] = document.getElementById(`logo${i}`);
    imgs[i].addEventListener("click", () => {loadChat(imgs[i].src)});
  }
});

let statusArray = [];

function initializeCommunication() {
  socket.onopen = (e) => {
    socket.send("Hello from client");
  }
  socket.onmessage = (e) => {
    if (e.data.startsWith(`[{"user":`)){ 
      allMessage = JSON.parse(e.data);
    } else if (e.data.startsWith(`{"user":`)){
        let js = JSON.parse(e.data);
        if (messageBox) {
          if (user.value == js.user)
            messageBox.insertAdjacentHTML("beforeend", '<td><div class="message"><div id="newMyMassege">' + js.text + '</div></div></td>');
          else 
            if (lastElem && lastElem.user == js.user)
              messageBox.insertAdjacentHTML("beforeend", '<td><div class="message"><div id="newOtherMessage">' + js.text + '</div></div></td>');
            else
              messageBox.insertAdjacentHTML("beforeend", `<td><div class="message"><div id="newOtherMessage"><div id="otherUserName">${js.user}<img src="${js.logo}" class="messageLogo"></div>${js.text}</div></div></td>`);
          lastElem = js;
          $("#newMyMassege").hide()
          $("#newMyMassege").toggle(1000).attr('id', 'myMassege');
          
          $("#newOtherMessage").hide()
          $("#newOtherMessage").toggle(1000).attr('id', 'otherMessage');

          setTimeout( () => {
            let sms;

            if (user.value == js.user)
              sms = document.getElementById("myMassege");
            else
              sms = document.getElementById("otherMessage");
            sms.addEventListener("click", () => {
              // if (whoAnsweringNow) {
                socket.send(JSON.stringify({"type": "request", "message": sms, "request": "getId"}));
                // messageBox1.insertAdjacentHTML("afterend", 
                //  `<div class="messageAnsverNow">
                //   <div class="answerUserName">Admin
                //   <img src="https://www.gravatar.com/avatar/2aa8a68c9415e494efedd32d9d303794?size=47&default=retro" class="messageLogo">
                //   </div>
                //   <div class="ansverText">I love cgsg, Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa, quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt, explicabo.</div>
                //   </div>`);
              // }

                whoAnsweringNow = sms;
            })
          }, 1000)

          let intervalID = setInterval(() => {
            messageBox1.scrollTo(0, messageBox1.scrollHeight);
            setTimeout(() => {
              clearInterval(intervalID);
            }, 1000)
          }, 10)
        } else {
          allMessage.push(js);
        }
    } else if (e.data.startsWith(`{"type":"status"`)) {
      writeStat = document.getElementById("writingStatuc");
      let myJs = JSON.parse(e.data);
      if (myJs.status == "not writing") {
        let text = `${myJs.user} is writing...`;
        let ind = statusArray.indexOf(text);
        if (ind != -1)
          statusArray.splice(ind, 1);
      } else {
        let text = `${myJs.user} is ${myJs.status}...`;
        if (!(statusArray.includes(text)) && myJs.user != user.value) {
          statusArray.push(text);
        }
      }
      writeStat.innerHTML = ""
      for (let elem of statusArray)
        writeStat.innerHTML += elem;
    }
  }
  socket.onclose = (e) => {
    socket.send(JSON.stringify({"type": "status", "user": user.value, "status": "not writing"}));
  }
};

initializeCommunication();

