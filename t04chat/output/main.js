!function(){"use strict";let e,t,a,s,d,r,i,n,o,l,u=new WebSocket("ws://localhost:8000"),c=[];function g(o){if(""!=n.value){const c=a.parentNode;let g,v;if(c.insertAdjacentHTML("beforeend",`<table class = "myInput">\n        <tr><td>Name<img src=${o} class="logo"></td>\n        <td><input class = "myInput" name="message" id="user" value = ${n.value} readonly></td></tr>\n      </table>\n      <div id="messageBox1">\n        <div id="writingStatuc"></div>\n        <table id="messageBox"></table>\n      </div>\n      <table class = "myInput">\n        <td>Text</td>\n        <td><textarea name="message" id="myTextArea"></textarea></td>\n        <td><button id="send">send</button></td>\n      </table>`),c.removeChild(a),d=document.getElementById("send"),r=document.getElementById("user"),i=document.getElementById("myTextArea"),s=document.getElementById("messageBox"),t=document.getElementById("messageBox1"),d.addEventListener("click",(()=>{""!=i.value&&""!=r.value&&u.send(JSON.stringify({type:"message",user:r.value,text:i.value,logo:o})),i.value=""})),i.addEventListener("keydown",(e=>{"Enter"!=e.code||g?g="Shift"==e.key:(""!=i.value&&""!=r.value&&u.send(JSON.stringify({type:"message",user:r.value,text:i.value,logo:o})),i.value=""),"AltLeft"!=e.code&&"AltRight"!=e.code&&"Tab"!=e.code&&(v?clearTimeout(v):u.send(JSON.stringify({type:"status",user:r.value,status:"writing"})),v=setTimeout((()=>{u.send(JSON.stringify({type:"status",user:r.value,status:"not writing"})),clearTimeout(v),v=void 0}),2e3))})),e)for(let t of e){t.user==r.value?s.insertAdjacentHTML("beforeend",'<td><div class="message"><div id="myMassege">'+t.text+"</div></div></td>"):l&&l.user==t.user?s.insertAdjacentHTML("beforeend",'<td><div class="message"><div id="otherMessage">'+t.text+"</div></div></td>"):s.insertAdjacentHTML("beforeend",`<td><div class="message"><div id="otherMessage"><div id="otherUserName">${t.user}<img src="${t.logo}" class="messageLogo"></div>${t.text}</div></div></td>`),l=t;for(let e of document.querySelectorAll(".message"))e.addEventListener("onclick",(()=>{document.innerHTML=""}))}t.scrollTo(0,t.scrollHeight)}}c.push("https://www.gravatar.com/avatar/0f2b5a5ee7b73f844210d21f682b975b?size=47&amp;default=retro"),c.push("https://www.gravatar.com/avatar/55f1e47f0b27860a54f4004dad867acd?size=47&amp;default=retro"),c.push("https://www.gravatar.com/avatar/074e408cabf4eb7a4d5d81da94ce0ad0?size=47&default=retro"),c.push("https://www.gravatar.com/avatar/fee2a90ac22d2900fd883da16d64033b?size=47&amp;default=retro"),c.push("https://www.gravatar.com/avatar/7c0010cad957e018d4ee46efab609163?size=47&default=retro"),c.push("https://www.gravatar.com/avatar/94801ee4f3880d553d1436c5063aaf4a?size=47&default=retro"),c.push("https://www.gravatar.com/avatar/2dde4e87449856d63d9950bea1598412?size=47&default=retro"),c.push("https://www.gravatar.com/avatar/ec6bf1ace6722d888e7d69b8acc8c480?size=47&default=retro"),c.push("https://www.gravatar.com/avatar/1db541b2befb88ad70b370a0a90924a3?size=47&default=retro"),c.push("https://www.gravatar.com/avatar/5d7d37363987faf203f9d9ca56a05fe6?size=47&default=retro"),c.push("https://www.gravatar.com/avatar/ddbdf085ff2383ef01530a38e6b7a312?size=47&default=retro"),c.push("https://www.gravatar.com/avatar/2aa8a68c9415e494efedd32d9d303794?size=47&default=retro"),c.push("https://www.gravatar.com/avatar/6563f5b54849e24beafccd95efd52d92?size=47&default=retro"),c.push("https://www.gravatar.com/avatar/288b02dfeb5d20d1cedc0bd5d93c361c?size=47&default=monsterid"),c.push("https://www.gravatar.com/avatar/50f8691fb4cd914cdba16020e9555957?size=47&default=monsterid"),c.push("https://www.gravatar.com/avatar/b590b8af7f18b5151ed50c98ed8aa4bb?size=47&default=monsterid"),c.push("https://www.gravatar.com/avatar/e0ac2956d75c0b71dc3b4110100823a7?size=47&default=monsterid"),c.push("https://www.gravatar.com/avatar/0722bea731f4c3ba141dc9a2abbe4a32?size=47&default=monsterid"),window.addEventListener("load",(()=>{document.getElementById("regButton"),n=document.getElementById("userRegister"),a=document.getElementById("myTable");let e=[],t=document.getElementById("logosDiv");for(let a=0;a<c.length;a++)t.insertAdjacentHTML("beforeend",`<img id="logo${a}" src="${c[a]}" class="logos">`),e[a]=document.getElementById(`logo${a}`),e[a].addEventListener("click",(()=>{g(e[a].src)}))}));let v=[];u.onopen=e=>{u.send("Hello from client")},u.onmessage=a=>{if(a.data.startsWith('[{"user":'))e=JSON.parse(a.data);else if(a.data.startsWith('{"user":')){let d=JSON.parse(a.data);if(s){r.value==d.user?s.insertAdjacentHTML("beforeend",'<td><div class="message"><div id="newMyMassege">'+d.text+"</div></div></td>"):l&&l.user==d.user?s.insertAdjacentHTML("beforeend",'<td><div class="message"><div id="newOtherMessage">'+d.text+"</div></div></td>"):s.insertAdjacentHTML("beforeend",`<td><div class="message"><div id="newOtherMessage"><div id="otherUserName">${d.user}<img src="${d.logo}" class="messageLogo"></div>${d.text}</div></div></td>`),l=d,$("#newMyMassege").hide(),$("#newMyMassege").toggle(1e3).attr("id","myMassege"),$("#newOtherMessage").hide(),$("#newOtherMessage").toggle(1e3).attr("id","otherMessage"),setTimeout((()=>{let e;e=r.value==d.user?document.getElementById("myMassege"):document.getElementById("otherMessage"),e.addEventListener("click",(()=>{u.send(JSON.stringify({type:"request",message:e,request:"getId"}))}))}),1e3);let e=setInterval((()=>{t.scrollTo(0,t.scrollHeight),setTimeout((()=>{clearInterval(e)}),1e3)}),10)}else e.push(d)}else if(a.data.startsWith('{"type":"status"')){o=document.getElementById("writingStatuc");let e=JSON.parse(a.data);if("not writing"==e.status){let t=`${e.user} is writing...`,a=v.indexOf(t);-1!=a&&v.splice(a,1)}else{let t=`${e.user} is ${e.status}...`;v.includes(t)||e.user==r.value||v.push(t)}o.innerHTML="";for(let e of v)o.innerHTML+=e}},u.onclose=e=>{u.send(JSON.stringify({type:"status",user:r.value,status:"not writing"}))}}();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXMiOlsiLi4vc3JjL21haW4uanMiXSwic291cmNlc0NvbnRlbnQiOlsibGV0IHNvY2tldCA9IG5ldyBXZWJTb2NrZXQoXCJ3czovL2xvY2FsaG9zdDo4MDAwXCIpO1xyXG5cclxubGV0IGFsbE1lc3NhZ2UsIG1lc3NhZ2VCb3gxLCBteUlucHV0O1xyXG5sZXQgbWVzc2FnZUJveCwgc2VuZEJ1dHRvbiwgdXNlciwgdGV4dEFyZWEsIHJlZ0J1dHRvbiwgcmVnVXNlciwgd3JpdGVTdGF0O1xyXG5sZXQgbGFzdEVsZW0sIHdob0Fuc3dlcmluZ05vdztcclxuXHJcbmxldCBsb2dvcyA9IFtdO1xyXG5sb2dvcy5wdXNoKFwiaHR0cHM6Ly93d3cuZ3JhdmF0YXIuY29tL2F2YXRhci8wZjJiNWE1ZWU3YjczZjg0NDIxMGQyMWY2ODJiOTc1Yj9zaXplPTQ3JmFtcDtkZWZhdWx0PXJldHJvXCIpXHJcbmxvZ29zLnB1c2goXCJodHRwczovL3d3dy5ncmF2YXRhci5jb20vYXZhdGFyLzU1ZjFlNDdmMGIyNzg2MGE1NGY0MDA0ZGFkODY3YWNkP3NpemU9NDcmYW1wO2RlZmF1bHQ9cmV0cm9cIilcclxubG9nb3MucHVzaChcImh0dHBzOi8vd3d3LmdyYXZhdGFyLmNvbS9hdmF0YXIvMDc0ZTQwOGNhYmY0ZWI3YTRkNWQ4MWRhOTRjZTBhZDA/c2l6ZT00NyZkZWZhdWx0PXJldHJvXCIpXHJcbmxvZ29zLnB1c2goXCJodHRwczovL3d3dy5ncmF2YXRhci5jb20vYXZhdGFyL2ZlZTJhOTBhYzIyZDI5MDBmZDg4M2RhMTZkNjQwMzNiP3NpemU9NDcmYW1wO2RlZmF1bHQ9cmV0cm9cIilcclxubG9nb3MucHVzaChcImh0dHBzOi8vd3d3LmdyYXZhdGFyLmNvbS9hdmF0YXIvN2MwMDEwY2FkOTU3ZTAxOGQ0ZWU0NmVmYWI2MDkxNjM/c2l6ZT00NyZkZWZhdWx0PXJldHJvXCIpXHJcbmxvZ29zLnB1c2goXCJodHRwczovL3d3dy5ncmF2YXRhci5jb20vYXZhdGFyLzk0ODAxZWU0ZjM4ODBkNTUzZDE0MzZjNTA2M2FhZjRhP3NpemU9NDcmZGVmYXVsdD1yZXRyb1wiKVxyXG5sb2dvcy5wdXNoKFwiaHR0cHM6Ly93d3cuZ3JhdmF0YXIuY29tL2F2YXRhci8yZGRlNGU4NzQ0OTg1NmQ2M2Q5OTUwYmVhMTU5ODQxMj9zaXplPTQ3JmRlZmF1bHQ9cmV0cm9cIilcclxubG9nb3MucHVzaChcImh0dHBzOi8vd3d3LmdyYXZhdGFyLmNvbS9hdmF0YXIvZWM2YmYxYWNlNjcyMmQ4ODhlN2Q2OWI4YWNjOGM0ODA/c2l6ZT00NyZkZWZhdWx0PXJldHJvXCIpXHJcbmxvZ29zLnB1c2goXCJodHRwczovL3d3dy5ncmF2YXRhci5jb20vYXZhdGFyLzFkYjU0MWIyYmVmYjg4YWQ3MGIzNzBhMGE5MDkyNGEzP3NpemU9NDcmZGVmYXVsdD1yZXRyb1wiKVxyXG5sb2dvcy5wdXNoKFwiaHR0cHM6Ly93d3cuZ3JhdmF0YXIuY29tL2F2YXRhci81ZDdkMzczNjM5ODdmYWYyMDNmOWQ5Y2E1NmEwNWZlNj9zaXplPTQ3JmRlZmF1bHQ9cmV0cm9cIilcclxubG9nb3MucHVzaChcImh0dHBzOi8vd3d3LmdyYXZhdGFyLmNvbS9hdmF0YXIvZGRiZGYwODVmZjIzODNlZjAxNTMwYTM4ZTZiN2EzMTI/c2l6ZT00NyZkZWZhdWx0PXJldHJvXCIpXHJcbmxvZ29zLnB1c2goXCJodHRwczovL3d3dy5ncmF2YXRhci5jb20vYXZhdGFyLzJhYThhNjhjOTQxNWU0OTRlZmVkZDMyZDlkMzAzNzk0P3NpemU9NDcmZGVmYXVsdD1yZXRyb1wiKVxyXG5sb2dvcy5wdXNoKFwiaHR0cHM6Ly93d3cuZ3JhdmF0YXIuY29tL2F2YXRhci82NTYzZjViNTQ4NDllMjRiZWFmY2NkOTVlZmQ1MmQ5Mj9zaXplPTQ3JmRlZmF1bHQ9cmV0cm9cIilcclxubG9nb3MucHVzaChcImh0dHBzOi8vd3d3LmdyYXZhdGFyLmNvbS9hdmF0YXIvMjg4YjAyZGZlYjVkMjBkMWNlZGMwYmQ1ZDkzYzM2MWM/c2l6ZT00NyZkZWZhdWx0PW1vbnN0ZXJpZFwiKVxyXG5sb2dvcy5wdXNoKFwiaHR0cHM6Ly93d3cuZ3JhdmF0YXIuY29tL2F2YXRhci81MGY4NjkxZmI0Y2Q5MTRjZGJhMTYwMjBlOTU1NTk1Nz9zaXplPTQ3JmRlZmF1bHQ9bW9uc3RlcmlkXCIpXHJcbmxvZ29zLnB1c2goXCJodHRwczovL3d3dy5ncmF2YXRhci5jb20vYXZhdGFyL2I1OTBiOGFmN2YxOGI1MTUxZWQ1MGM5OGVkOGFhNGJiP3NpemU9NDcmZGVmYXVsdD1tb25zdGVyaWRcIilcclxubG9nb3MucHVzaChcImh0dHBzOi8vd3d3LmdyYXZhdGFyLmNvbS9hdmF0YXIvZTBhYzI5NTZkNzVjMGI3MWRjM2I0MTEwMTAwODIzYTc/c2l6ZT00NyZkZWZhdWx0PW1vbnN0ZXJpZFwiKVxyXG5sb2dvcy5wdXNoKFwiaHR0cHM6Ly93d3cuZ3JhdmF0YXIuY29tL2F2YXRhci8wNzIyYmVhNzMxZjRjM2JhMTQxZGM5YTJhYmJlNGEzMj9zaXplPTQ3JmRlZmF1bHQ9bW9uc3RlcmlkXCIpXHJcblxyXG5mdW5jdGlvbiBsb2FkQ2hhdCggc3JjICkge1xyXG4gIGlmIChyZWdVc2VyLnZhbHVlICE9IFwiXCIpIHtcclxuICAgIGNvbnN0IHJlZ1BhcmVudCA9IG15SW5wdXQucGFyZW50Tm9kZTtcclxuICAgIHJlZ1BhcmVudC5pbnNlcnRBZGphY2VudEhUTUwoXCJiZWZvcmVlbmRcIiwgXHJcbiAgICAgYDx0YWJsZSBjbGFzcyA9IFwibXlJbnB1dFwiPlxyXG4gICAgICAgIDx0cj48dGQ+TmFtZTxpbWcgc3JjPSR7c3JjfSBjbGFzcz1cImxvZ29cIj48L3RkPlxyXG4gICAgICAgIDx0ZD48aW5wdXQgY2xhc3MgPSBcIm15SW5wdXRcIiBuYW1lPVwibWVzc2FnZVwiIGlkPVwidXNlclwiIHZhbHVlID0gJHtyZWdVc2VyLnZhbHVlfSByZWFkb25seT48L3RkPjwvdHI+XHJcbiAgICAgIDwvdGFibGU+XHJcbiAgICAgIDxkaXYgaWQ9XCJtZXNzYWdlQm94MVwiPlxyXG4gICAgICAgIDxkaXYgaWQ9XCJ3cml0aW5nU3RhdHVjXCI+PC9kaXY+XHJcbiAgICAgICAgPHRhYmxlIGlkPVwibWVzc2FnZUJveFwiPjwvdGFibGU+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgICA8dGFibGUgY2xhc3MgPSBcIm15SW5wdXRcIj5cclxuICAgICAgICA8dGQ+VGV4dDwvdGQ+XHJcbiAgICAgICAgPHRkPjx0ZXh0YXJlYSBuYW1lPVwibWVzc2FnZVwiIGlkPVwibXlUZXh0QXJlYVwiPjwvdGV4dGFyZWE+PC90ZD5cclxuICAgICAgICA8dGQ+PGJ1dHRvbiBpZD1cInNlbmRcIj5zZW5kPC9idXR0b24+PC90ZD5cclxuICAgICAgPC90YWJsZT5gKTtcclxuICAgIHJlZ1BhcmVudC5yZW1vdmVDaGlsZChteUlucHV0KTtcclxuXHJcbiAgICBzZW5kQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzZW5kXCIpO1xyXG4gICAgdXNlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidXNlclwiKTtcclxuICAgIHRleHRBcmVhID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJteVRleHRBcmVhXCIpO1xyXG4gICAgbWVzc2FnZUJveCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibWVzc2FnZUJveFwiKTtcclxuICAgIG1lc3NhZ2VCb3gxID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtZXNzYWdlQm94MVwiKTtcclxuXHJcbiAgICBzZW5kQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PntcclxuICAgICAgaWYgKHRleHRBcmVhLnZhbHVlICE9IFwiXCIgJiYgdXNlci52YWx1ZSAhPSBcIlwiKVxyXG4gICAgICAgIHNvY2tldC5zZW5kKEpTT04uc3RyaW5naWZ5KHtcInR5cGVcIjogXCJtZXNzYWdlXCIsIFwidXNlclwiOiB1c2VyLnZhbHVlLCBcInRleHRcIjogdGV4dEFyZWEudmFsdWUsIFwibG9nb1wiOiBzcmN9KSk7XHJcbiAgICAgIHRleHRBcmVhLnZhbHVlID0gXCJcIjsgIFxyXG4gICAgfSk7XHJcblxyXG4gICAgbGV0IElzbGFzdEtleVNoaWZ0LCB0aW1lcklEO1xyXG5cclxuICAgIHRleHRBcmVhLmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIChlKSA9PiB7XHJcbiAgICAgIGlmIChlLmNvZGUgPT0gJ0VudGVyJyAmJiAhSXNsYXN0S2V5U2hpZnQpIHtcclxuICAgICAgICBpZiAodGV4dEFyZWEudmFsdWUgIT0gXCJcIiAmJiB1c2VyLnZhbHVlICE9IFwiXCIpXHJcbiAgICAgICAgICBzb2NrZXQuc2VuZChKU09OLnN0cmluZ2lmeSh7XCJ0eXBlXCI6IFwibWVzc2FnZVwiLCBcInVzZXJcIjogdXNlci52YWx1ZSwgXCJ0ZXh0XCI6IHRleHRBcmVhLnZhbHVlLCBcImxvZ29cIjogc3JjfSkpO1xyXG4gICAgICAgIHRleHRBcmVhLnZhbHVlID0gXCJcIjsgIFxyXG4gICAgICB9IGVsc2VcclxuICAgICAgICBJc2xhc3RLZXlTaGlmdCA9IGUua2V5ID09ICdTaGlmdCc7XHJcblxyXG4gICAgICBpZiAoZS5jb2RlID09ICdBbHRMZWZ0JyB8fCBlLmNvZGUgPT0gJ0FsdFJpZ2h0JyB8fCBlLmNvZGUgPT0gICdUYWInKVxyXG4gICAgICAgIHJldHVyblxyXG5cclxuICAgICAgaWYgKHRpbWVySUQpXHJcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVySUQpO1xyXG4gICAgICBlbHNlXHJcbiAgICAgICAgc29ja2V0LnNlbmQoSlNPTi5zdHJpbmdpZnkoe1widHlwZVwiOiBcInN0YXR1c1wiLCBcInVzZXJcIjogdXNlci52YWx1ZSwgXCJzdGF0dXNcIjogXCJ3cml0aW5nXCJ9KSlcclxuICAgICAgICBcclxuICAgICAgdGltZXJJRCA9IHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgIHNvY2tldC5zZW5kKEpTT04uc3RyaW5naWZ5KHtcInR5cGVcIjogXCJzdGF0dXNcIiwgXCJ1c2VyXCI6IHVzZXIudmFsdWUsIFwic3RhdHVzXCI6IFwibm90IHdyaXRpbmdcIn0pKTtcclxuICAgICAgICBjbGVhclRpbWVvdXQodGltZXJJRCk7XHJcbiAgICAgICAgdGltZXJJRCA9IHVuZGVmaW5lZDtcclxuICAgICAgfSwgMjAwMCk7XHJcbiAgICB9KVxyXG5cclxuICAgIGlmIChhbGxNZXNzYWdlKVxyXG4gICAgICBmb3IgKGxldCBlbGVtIG9mIGFsbE1lc3NhZ2UpIHtcclxuICAgICAgICBpZiAoZWxlbS51c2VyID09IHVzZXIudmFsdWUpXHJcbiAgICAgICAgICBtZXNzYWdlQm94Lmluc2VydEFkamFjZW50SFRNTChcImJlZm9yZWVuZFwiLCAnPHRkPjxkaXYgY2xhc3M9XCJtZXNzYWdlXCI+PGRpdiBpZD1cIm15TWFzc2VnZVwiPicgKyBlbGVtLnRleHQgKyAnPC9kaXY+PC9kaXY+PC90ZD4nKTtcclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgIGlmIChsYXN0RWxlbSAmJiBsYXN0RWxlbS51c2VyID09IGVsZW0udXNlcilcclxuICAgICAgICAgICAgbWVzc2FnZUJveC5pbnNlcnRBZGphY2VudEhUTUwoXCJiZWZvcmVlbmRcIiwgJzx0ZD48ZGl2IGNsYXNzPVwibWVzc2FnZVwiPjxkaXYgaWQ9XCJvdGhlck1lc3NhZ2VcIj4nICsgZWxlbS50ZXh0ICsgJzwvZGl2PjwvZGl2PjwvdGQ+Jyk7XHJcbiAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIG1lc3NhZ2VCb3guaW5zZXJ0QWRqYWNlbnRIVE1MKFwiYmVmb3JlZW5kXCIsIGA8dGQ+PGRpdiBjbGFzcz1cIm1lc3NhZ2VcIj48ZGl2IGlkPVwib3RoZXJNZXNzYWdlXCI+PGRpdiBpZD1cIm90aGVyVXNlck5hbWVcIj4ke2VsZW0udXNlcn08aW1nIHNyYz1cIiR7ZWxlbS5sb2dvfVwiIGNsYXNzPVwibWVzc2FnZUxvZ29cIj48L2Rpdj4ke2VsZW0udGV4dH08L2Rpdj48L2Rpdj48L3RkPmApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsYXN0RWxlbSA9IGVsZW07XHJcbiAgICAgICAgZm9yIChsZXQgc3BhbiBvZiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcubWVzc2FnZScpKSB7IC8qbWVzc2FnZUJveCovXHJcbiAgICAgICAgICBzcGFuLmFkZEV2ZW50TGlzdGVuZXIoXCJvbmNsaWNrXCIsICgpID0+IHtcclxuICAgICAgICAgIGRvY3VtZW50LmlubmVySFRNTCA9IFwiXCI7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIG1lc3NhZ2VCb3gxLnNjcm9sbFRvKDAsIG1lc3NhZ2VCb3gxLnNjcm9sbEhlaWdodCk7XHJcbiAgICBcclxuICB9XHJcbn1cclxuXHJcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwibG9hZFwiLCAoKSA9PiB7XHJcbiAgcmVnQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJyZWdCdXR0b25cIik7XHJcbiAgcmVnVXNlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidXNlclJlZ2lzdGVyXCIpO1xyXG4gIG15SW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm15VGFibGVcIik7XHJcblxyXG4gIGxldCBpbWdzID0gW107XHJcbiAgbGV0IGRpdmEgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImxvZ29zRGl2XCIpXHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBsb2dvcy5sZW5ndGg7IGkrKykge1xyXG4gICAgZGl2YS5pbnNlcnRBZGphY2VudEhUTUwoXCJiZWZvcmVlbmRcIiwgYDxpbWcgaWQ9XCJsb2dvJHtpfVwiIHNyYz1cIiR7bG9nb3NbaV19XCIgY2xhc3M9XCJsb2dvc1wiPmApO1xyXG4gICAgaW1nc1tpXSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGBsb2dvJHtpfWApO1xyXG4gICAgaW1nc1tpXS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge2xvYWRDaGF0KGltZ3NbaV0uc3JjKX0pO1xyXG4gIH1cclxufSk7XHJcblxyXG5sZXQgc3RhdHVzQXJyYXkgPSBbXTtcclxuXHJcbmZ1bmN0aW9uIGluaXRpYWxpemVDb21tdW5pY2F0aW9uKCkge1xyXG4gIHNvY2tldC5vbm9wZW4gPSAoZSkgPT4ge1xyXG4gICAgc29ja2V0LnNlbmQoXCJIZWxsbyBmcm9tIGNsaWVudFwiKTtcclxuICB9XHJcbiAgc29ja2V0Lm9ubWVzc2FnZSA9IChlKSA9PiB7XHJcbiAgICBpZiAoZS5kYXRhLnN0YXJ0c1dpdGgoYFt7XCJ1c2VyXCI6YCkpeyBcclxuICAgICAgYWxsTWVzc2FnZSA9IEpTT04ucGFyc2UoZS5kYXRhKTtcclxuICAgIH0gZWxzZSBpZiAoZS5kYXRhLnN0YXJ0c1dpdGgoYHtcInVzZXJcIjpgKSl7XHJcbiAgICAgICAgbGV0IGpzID0gSlNPTi5wYXJzZShlLmRhdGEpO1xyXG4gICAgICAgIGlmIChtZXNzYWdlQm94KSB7XHJcbiAgICAgICAgICBpZiAodXNlci52YWx1ZSA9PSBqcy51c2VyKVxyXG4gICAgICAgICAgICBtZXNzYWdlQm94Lmluc2VydEFkamFjZW50SFRNTChcImJlZm9yZWVuZFwiLCAnPHRkPjxkaXYgY2xhc3M9XCJtZXNzYWdlXCI+PGRpdiBpZD1cIm5ld015TWFzc2VnZVwiPicgKyBqcy50ZXh0ICsgJzwvZGl2PjwvZGl2PjwvdGQ+Jyk7XHJcbiAgICAgICAgICBlbHNlIFxyXG4gICAgICAgICAgICBpZiAobGFzdEVsZW0gJiYgbGFzdEVsZW0udXNlciA9PSBqcy51c2VyKVxyXG4gICAgICAgICAgICAgIG1lc3NhZ2VCb3guaW5zZXJ0QWRqYWNlbnRIVE1MKFwiYmVmb3JlZW5kXCIsICc8dGQ+PGRpdiBjbGFzcz1cIm1lc3NhZ2VcIj48ZGl2IGlkPVwibmV3T3RoZXJNZXNzYWdlXCI+JyArIGpzLnRleHQgKyAnPC9kaXY+PC9kaXY+PC90ZD4nKTtcclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgIG1lc3NhZ2VCb3guaW5zZXJ0QWRqYWNlbnRIVE1MKFwiYmVmb3JlZW5kXCIsIGA8dGQ+PGRpdiBjbGFzcz1cIm1lc3NhZ2VcIj48ZGl2IGlkPVwibmV3T3RoZXJNZXNzYWdlXCI+PGRpdiBpZD1cIm90aGVyVXNlck5hbWVcIj4ke2pzLnVzZXJ9PGltZyBzcmM9XCIke2pzLmxvZ299XCIgY2xhc3M9XCJtZXNzYWdlTG9nb1wiPjwvZGl2PiR7anMudGV4dH08L2Rpdj48L2Rpdj48L3RkPmApO1xyXG4gICAgICAgICAgbGFzdEVsZW0gPSBqcztcclxuICAgICAgICAgICQoXCIjbmV3TXlNYXNzZWdlXCIpLmhpZGUoKVxyXG4gICAgICAgICAgJChcIiNuZXdNeU1hc3NlZ2VcIikudG9nZ2xlKDEwMDApLmF0dHIoJ2lkJywgJ215TWFzc2VnZScpO1xyXG4gICAgICAgICAgXHJcbiAgICAgICAgICAkKFwiI25ld090aGVyTWVzc2FnZVwiKS5oaWRlKClcclxuICAgICAgICAgICQoXCIjbmV3T3RoZXJNZXNzYWdlXCIpLnRvZ2dsZSgxMDAwKS5hdHRyKCdpZCcsICdvdGhlck1lc3NhZ2UnKTtcclxuXHJcbiAgICAgICAgICBzZXRUaW1lb3V0KCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBzbXM7XHJcblxyXG4gICAgICAgICAgICBpZiAodXNlci52YWx1ZSA9PSBqcy51c2VyKVxyXG4gICAgICAgICAgICAgIHNtcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibXlNYXNzZWdlXCIpO1xyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgc21zID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJvdGhlck1lc3NhZ2VcIik7XHJcbiAgICAgICAgICAgIHNtcy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgIC8vIGlmICh3aG9BbnN3ZXJpbmdOb3cpIHtcclxuICAgICAgICAgICAgICAgIHNvY2tldC5zZW5kKEpTT04uc3RyaW5naWZ5KHtcInR5cGVcIjogXCJyZXF1ZXN0XCIsIFwibWVzc2FnZVwiOiBzbXMsIFwicmVxdWVzdFwiOiBcImdldElkXCJ9KSk7XHJcbiAgICAgICAgICAgICAgICAvLyBtZXNzYWdlQm94MS5pbnNlcnRBZGphY2VudEhUTUwoXCJhZnRlcmVuZFwiLCBcclxuICAgICAgICAgICAgICAgIC8vICBgPGRpdiBjbGFzcz1cIm1lc3NhZ2VBbnN2ZXJOb3dcIj5cclxuICAgICAgICAgICAgICAgIC8vICAgPGRpdiBjbGFzcz1cImFuc3dlclVzZXJOYW1lXCI+QWRtaW5cclxuICAgICAgICAgICAgICAgIC8vICAgPGltZyBzcmM9XCJodHRwczovL3d3dy5ncmF2YXRhci5jb20vYXZhdGFyLzJhYThhNjhjOTQxNWU0OTRlZmVkZDMyZDlkMzAzNzk0P3NpemU9NDcmZGVmYXVsdD1yZXRyb1wiIGNsYXNzPVwibWVzc2FnZUxvZ29cIj5cclxuICAgICAgICAgICAgICAgIC8vICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAvLyAgIDxkaXYgY2xhc3M9XCJhbnN2ZXJUZXh0XCI+SSBsb3ZlIGNnc2csIFNlZCB1dCBwZXJzcGljaWF0aXMgdW5kZSBvbW5pcyBpc3RlIG5hdHVzIGVycm9yIHNpdCB2b2x1cHRhdGVtIGFjY3VzYW50aXVtIGRvbG9yZW1xdWUgbGF1ZGFudGl1bSwgdG90YW0gcmVtIGFwZXJpYW0gZWFxdWUgaXBzYSwgcXVhZSBhYiBpbGxvIGludmVudG9yZSB2ZXJpdGF0aXMgZXQgcXVhc2kgYXJjaGl0ZWN0byBiZWF0YWUgdml0YWUgZGljdGEgc3VudCwgZXhwbGljYWJvLjwvZGl2PlxyXG4gICAgICAgICAgICAgICAgLy8gICA8L2Rpdj5gKTtcclxuICAgICAgICAgICAgICAvLyB9XHJcblxyXG4gICAgICAgICAgICAgICAgd2hvQW5zd2VyaW5nTm93ID0gc21zO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgfSwgMTAwMClcclxuXHJcbiAgICAgICAgICBsZXQgaW50ZXJ2YWxJRCA9IHNldEludGVydmFsKCgpID0+IHtcclxuICAgICAgICAgICAgbWVzc2FnZUJveDEuc2Nyb2xsVG8oMCwgbWVzc2FnZUJveDEuc2Nyb2xsSGVpZ2h0KTtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChpbnRlcnZhbElEKTtcclxuICAgICAgICAgICAgfSwgMTAwMClcclxuICAgICAgICAgIH0sIDEwKVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBhbGxNZXNzYWdlLnB1c2goanMpO1xyXG4gICAgICAgIH1cclxuICAgIH0gZWxzZSBpZiAoZS5kYXRhLnN0YXJ0c1dpdGgoYHtcInR5cGVcIjpcInN0YXR1c1wiYCkpIHtcclxuICAgICAgd3JpdGVTdGF0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ3cml0aW5nU3RhdHVjXCIpO1xyXG4gICAgICBsZXQgbXlKcyA9IEpTT04ucGFyc2UoZS5kYXRhKTtcclxuICAgICAgaWYgKG15SnMuc3RhdHVzID09IFwibm90IHdyaXRpbmdcIikge1xyXG4gICAgICAgIGxldCB0ZXh0ID0gYCR7bXlKcy51c2VyfSBpcyB3cml0aW5nLi4uYDtcclxuICAgICAgICBsZXQgaW5kID0gc3RhdHVzQXJyYXkuaW5kZXhPZih0ZXh0KTtcclxuICAgICAgICBpZiAoaW5kICE9IC0xKVxyXG4gICAgICAgICAgc3RhdHVzQXJyYXkuc3BsaWNlKGluZCwgMSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgbGV0IHRleHQgPSBgJHtteUpzLnVzZXJ9IGlzICR7bXlKcy5zdGF0dXN9Li4uYDtcclxuICAgICAgICBpZiAoIShzdGF0dXNBcnJheS5pbmNsdWRlcyh0ZXh0KSkgJiYgbXlKcy51c2VyICE9IHVzZXIudmFsdWUpIHtcclxuICAgICAgICAgIHN0YXR1c0FycmF5LnB1c2godGV4dCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIHdyaXRlU3RhdC5pbm5lckhUTUwgPSBcIlwiXHJcbiAgICAgIGZvciAobGV0IGVsZW0gb2Ygc3RhdHVzQXJyYXkpXHJcbiAgICAgICAgd3JpdGVTdGF0LmlubmVySFRNTCArPSBlbGVtO1xyXG4gICAgfVxyXG4gIH1cclxuICBzb2NrZXQub25jbG9zZSA9IChlKSA9PiB7XHJcbiAgICBzb2NrZXQuc2VuZChKU09OLnN0cmluZ2lmeSh7XCJ0eXBlXCI6IFwic3RhdHVzXCIsIFwidXNlclwiOiB1c2VyLnZhbHVlLCBcInN0YXR1c1wiOiBcIm5vdCB3cml0aW5nXCJ9KSk7XHJcbiAgfVxyXG59O1xyXG5cclxuaW5pdGlhbGl6ZUNvbW11bmljYXRpb24oKTtcclxuXHJcbiJdLCJuYW1lcyI6WyJhbGxNZXNzYWdlIiwibWVzc2FnZUJveDEiLCJteUlucHV0IiwibWVzc2FnZUJveCIsInNlbmRCdXR0b24iLCJ1c2VyIiwidGV4dEFyZWEiLCJyZWdVc2VyIiwid3JpdGVTdGF0IiwibGFzdEVsZW0iLCJzb2NrZXQiLCJXZWJTb2NrZXQiLCJsb2dvcyIsImxvYWRDaGF0Iiwic3JjIiwidmFsdWUiLCJyZWdQYXJlbnQiLCJwYXJlbnROb2RlIiwiSXNsYXN0S2V5U2hpZnQiLCJ0aW1lcklEIiwiaW5zZXJ0QWRqYWNlbnRIVE1MIiwicmVtb3ZlQ2hpbGQiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwiYWRkRXZlbnRMaXN0ZW5lciIsInNlbmQiLCJKU09OIiwic3RyaW5naWZ5IiwidHlwZSIsInRleHQiLCJsb2dvIiwiZSIsImNvZGUiLCJrZXkiLCJjbGVhclRpbWVvdXQiLCJzdGF0dXMiLCJzZXRUaW1lb3V0IiwidW5kZWZpbmVkIiwiZWxlbSIsInNwYW4iLCJxdWVyeVNlbGVjdG9yQWxsIiwiaW5uZXJIVE1MIiwic2Nyb2xsVG8iLCJzY3JvbGxIZWlnaHQiLCJwdXNoIiwid2luZG93IiwiaW1ncyIsImRpdmEiLCJpIiwibGVuZ3RoIiwic3RhdHVzQXJyYXkiLCJvbm9wZW4iLCJvbm1lc3NhZ2UiLCJkYXRhIiwic3RhcnRzV2l0aCIsInBhcnNlIiwianMiLCIkIiwiaGlkZSIsInRvZ2dsZSIsImF0dHIiLCJzbXMiLCJtZXNzYWdlIiwicmVxdWVzdCIsImludGVydmFsSUQiLCJzZXRJbnRlcnZhbCIsImNsZWFySW50ZXJ2YWwiLCJteUpzIiwiaW5kIiwiaW5kZXhPZiIsInNwbGljZSIsImluY2x1ZGVzIiwib25jbG9zZSJdLCJtYXBwaW5ncyI6InlCQUFBLElBRUlBLEVBQVlDLEVBQWFDLEVBQ3pCQyxFQUFZQyxFQUFZQyxFQUFNQyxFQUFxQkMsRUFBU0MsRUFDNURDLEVBSkFDLEVBQVMsSUFBSUMsVUFBVSx1QkFNdkJDLEVBQVEsR0FvQlosU0FBU0MsRUFBVUMsR0FDakIsR0FBcUIsSUFBakJQLEVBQVFRLE1BQWEsQ0FDdkIsTUFBTUMsRUFBWWQsRUFBUWUsV0E2QjFCLElBQUlDLEVBQWdCQyxFQXlCcEIsR0FyREFILEVBQVVJLG1CQUFtQixZQUM1QiwyREFDMEJOLCtGQUN5Q1AsRUFBUVEsMldBVzVFQyxFQUFVSyxZQUFZbkIsR0FFdEJFLEVBQWFrQixTQUFTQyxlQUFlLFFBQ3JDbEIsRUFBT2lCLFNBQVNDLGVBQWUsUUFDL0JqQixFQUFXZ0IsU0FBU0MsZUFBZSxjQUNuQ3BCLEVBQWFtQixTQUFTQyxlQUFlLGNBQ3JDdEIsRUFBY3FCLFNBQVNDLGVBQWUsZUFFdENuQixFQUFXb0IsaUJBQWlCLFNBQVMsS0FDYixJQUFsQmxCLEVBQVNTLE9BQTZCLElBQWRWLEVBQUtVLE9BQy9CTCxFQUFPZSxLQUFLQyxLQUFLQyxVQUFVLENBQUNDLEtBQVEsVUFBV3ZCLEtBQVFBLEVBQUtVLE1BQU9jLEtBQVF2QixFQUFTUyxNQUFPZSxLQUFRaEIsS0FDckdSLEVBQVNTLE1BQVEsRUFBRSxJQUtyQlQsRUFBU2tCLGlCQUFpQixXQUFZTyxJQUN0QixTQUFWQSxFQUFFQyxNQUFvQmQsRUFLeEJBLEVBQTBCLFNBQVRhLEVBQUVFLEtBSkcsSUFBbEIzQixFQUFTUyxPQUE2QixJQUFkVixFQUFLVSxPQUMvQkwsRUFBT2UsS0FBS0MsS0FBS0MsVUFBVSxDQUFDQyxLQUFRLFVBQVd2QixLQUFRQSxFQUFLVSxNQUFPYyxLQUFRdkIsRUFBU1MsTUFBT2UsS0FBUWhCLEtBQ3JHUixFQUFTUyxNQUFRLElBSUwsV0FBVmdCLEVB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