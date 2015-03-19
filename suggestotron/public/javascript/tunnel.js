function RealMintTunnel() {
var TUNNEL_NULL = 0;
var TUNNEL_NEW = 1;
var TUNNEL_CONNECTED = 2;
var TUNNEL_EOF = 3;
var TUNNEL_FAIL = 4;
var tunnelState = TUNNEL_NULL;
// Provide the XMLHttpRequest class for IE 5.x-6.x:
if( typeof XMLHttpRequest == "undefined" ) XMLHttpRequest = function() {
try { return new ActiveXObject("Msxml2.XMLHTTP.6.0") } catch(e) {}
try { return new ActiveXObject("Msxml2.XMLHTTP.3.0") } catch(e) {}
try { return new ActiveXObject("Msxml2.XMLHTTP") } catch(e) {}
try { return new ActiveXObject("Microsoft.XMLHTTP") } catch(e) {}
};
// Set up buffer stream
var request = new XMLHttpRequest();
var reqSeq = 0;
var sendSeq = 0;
this.connect = function() {
if (request)
requestData();
else
errorOutputHandler("Tunnel error - XMLHttpRequest (AJAX) not supported by your browser.");
}
var receiveHandler = null;
this.setReceiveHandler = function(rh) { receiveHandler = rh; }
var messageOutputHandler = null;
this.setMessageOutputHandler = function(moh) { messageOutputHandler = moh; }
var errorOutputHandler = null;
this.setErrorOutputHandler = function(eoh) { errorOutputHandler = eoh; }
function requestData() {
request.open("GET", "backend/tunnel.jsp?rseq=" + reqSeq, true);
reqSeq++;
request.onreadystatechange = function() {
if (request.readyState == 4 && request.status == 200) {
if (request.responseText.substring(0, 7) == "(DATA) " || request.responseText.substring(0, 7) == "(BOOM) ") {
if (request.responseText.substring(0, 7) == "(BOOM) ")
errorOutputHandler("WARNING: Tunnel buffer too full - output truncated.");
if (tunnelState == TUNNEL_NULL) {
messageOutputHandler("Resuming connection...");
tunnelState = TUNNEL_CONNECTED;
}
if (tunnelState != TUNNEL_CONNECTED) {
errorOutputHandler("FATAL: Tunnel received data when in unexpected state.");
tunnelState = TUNNEL_FAIL;
}
else {
var receivedData = request.responseText.substring(7);
receiveHandler(unescape(receivedData));
requestData();
}
}
else if (request.responseText.substring(0, 5) == "(NEW)") {
if (tunnelState != TUNNEL_NULL) {
errorOutputHandler("FATAL: Attempted to recreate tunnel. Do you have cookies disabled? Did you delete the cookie?");
tunnelState = TUNNEL_FAIL;
}
else {
messageOutputHandler("Creating new tunnel...");
tunnelState = TUNNEL_NEW;
requestData();
}
}
else if (request.responseText.substring(0, 10) == "(CONNECT)") {
if (tunnelState == TUNNEL_NULL) {
messageOutputHandler("Resuming creation of tunnel...");
tunnelState = TUNNEL_NEW;
}
if (tunnelState != TUNNEL_NEW) {
errorOutputHandler("FATAL: Tunnel in unexpected state on connect.");
tunnelState = TUNNEL_FAIL;
}
else {
messageOutputHandler("Success.");
tunnelState = TUNNEL_CONNECTED;
requestData();
}
}
else if (request.responseText.substring(0, 5) == "(EOF)") {
messageOutputHandler("Connection closed by foreign host.");
tunnelState = TUNNEL_EOF;
}
else if (request.responseText.substring(0, 6) == "(PING)") {
// Just pinging. Rerequest.
requestData();
}
else if (request.responseText.substring(7, 14) == "BACKEND") {
// The comment at the begging of the backend tunnel - server not configured properly.
errorOutputHandler("Tunnel error - server returned tunnel source code.");
tunnelState = TUNNEL_EOF;
}
else {
errorOutputHandler("Tunnel error (unexpected data)! Rerequesting.");
requestData();
}
}
else if (request.readyState == 4)
errorOutputHandler("Tunnel closed by browser (status = " + request.status + ")");
};
request.send(null);
}
this.send = function(str) {
var send = new XMLHttpRequest();
var data = "seq=" + sendSeq + "&data=" + escape(str).replace("+", "%2B");
send.open("GET", "backend/tunnel.jsp?" + data, true);
send.onreadystatechange = function() {};
send.send(null);
sendSeq++;
}
// Not used...
this.close = function() {
var send = new XMLHttpRequest();
send.open("GET", "backend/tunnel.jsp?disconnect", true);
send.onreadystatechange = function() {};
send.send(null);
sendSeq++;
}
} 