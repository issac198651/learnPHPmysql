function RealMintTelnetClient() {
// NVT codes
var NVT_NUL	= "\x00";	// NULL
var NVT_LF	= "\x0A";	// Line Feed
var NVT_CR	= "\x0D";	// Carriage Return
// Not required to effect terminal, but must be understood
var NVT_BEL	= "\x07";	// BELL
var NVT_BS	= "\x08";	// Back Space
var NVT_HT	= "\x09";	// Horizontal Tab
var NVT_VT	= "\x0B";	// Vertical Tab
var NVT_FF	= "\x0C";	// Form Feed
// NVT characters defined in RFC854
var NVT_SE	= "\xF0";	// Subnegotiation End
var NVT_NOP	= "\xF1";	// No operation
var NVT_DM	= "\xF2";	// "Data Mark"
var NVT_BRK	= "\xF3";	// Break
var NVT_IP	= "\xF4";	// Interrupt Process
var NVT_AO	= "\xF5";	// Abort Output
var NVT_AYT	= "\xF6";	// Are You There
var NVT_EC	= "\xF7";	// Erase Character
var NVT_EL	= "\xF8";	// Erase Line
var NVT_GA	= "\xF9";	// Go Ahead
var NVT_SB	= "\xFA";	// Subnegotiation Begin
var NVT_WILL	= "\xFB";	// WILL
var NVT_WONT	= "\xFC";	// WON'T
var NVT_DO	= "\xFD";	// DO
var NVT_DONT	= "\xFE";	// DON'T
var NVT_IAC	= "\xFF";	// Interpret As Command
// Options
var OPTION_TTYPE = "\x18";	// Terminal Type
var OPTION_NAWS = "\x1F";	// Window Size
var networkOutputHandler = null;
this.setNetworkOutputHandler = function(noh) { networkOutputHandler = noh; }
var terminalOutputHandler = null;
this.setTerminalOutputHandler = function(toh) { terminalOutputHandler = toh; }
this.type = function(str) { networkOutputHandler(str); }
this.receive = function(str) {
if (window.console) {
//console.group("Telnet packet");
var received = new Array();
var rcv_i = 0;
var rcv_mode = -1;
for (var i=0; i<str.length; i++) {
var c2 = str.charAt(i);
var c = str.charCodeAt(i);
if (c >= 32 && c <= 126) {
if (!received[rcv_i]) received[rcv_i] = "";
received[rcv_i] += c2;
rcv_mode = 0;	
}
else {
if (rcv_mode == 0) rcv_i ++;
received[rcv_i++] = c;
rcv_mode = 1;
}
}
console.log(received);
//console.groupEnd();
}
if (str.indexOf(NVT_IAC) == -1) {
terminalOutputHandler(str);
return;
}
var reducedString = str.split(/(?=\xFF)/);
// Handle commands
for (var i=0; i<reducedString.length; i++) {
var c = reducedString[i].charAt(0);
if (c == NVT_IAC) {
var cmd = reducedString[i].charAt(1);
if (cmd == NVT_DO) {
var parm = reducedString[i].charAt(2);
telnetDO(parm);
terminalOutputHandler(reducedString[i].substring(3));
}
else if (cmd == NVT_WILL) {
var parm = reducedString[i].charAt(2);
telnetWILL(parm);
terminalOutputHandler(reducedString[i].substring(3));
}
else if (cmd == NVT_DONT) {
var parm = reducedString[i].charAt(2);
telnetDONT(parm);
terminalOutputHandler(reducedString[i].substring(3));
}
else if (cmd == NVT_WONT) {
var parm = reducedString[i].charAt(2);
telnetWONT(parm);
terminalOutputHandler(reducedString[i].substring(3));
}
else if (cmd == NVT_SB) {
var parm = reducedString[i].charAt(2);
var ok = reducedString[i].charCodeAt(3);
/*+ NVT_IAC + NVT_SE are ignored for now */
if (ok == 1) telnetSB(parm);
terminalOutputHandler(reducedString[i].substring(4));
}
}
else
terminalOutputHandler(reducedString[i]);
}
}
var ALLOWED_OPTIONS = new Array();
function telnetDO(parm) {
switch (parm) {
// Supported options
case OPTION_TTYPE:
case OPTION_NAWS:
ALLOWED_OPTIONS[parm] = true;
networkOutputHandler(NVT_IAC + NVT_WILL + parm);
if (parm == OPTION_NAWS) sendWidthHeight();
break;
// Default to unsupported
default:
networkOutputHandler(NVT_IAC + NVT_WONT + parm);
}
}
function telnetWILL(parm) {
networkOutputHandler(NVT_IAC + NVT_DONT + parm);
}
function telnetDONT(parm) {
networkOutputHandler(NVT_IAC + NVT_WONT + parm);
}
function telnetWONT(parm) {
networkOutputHandler(NVT_IAC + NVT_DONT + parm);
}
// Subnegotiation
function telnetSB(parm) {
if (parm == OPTION_TTYPE)
networkOutputHandler(NVT_IAC + NVT_SB + OPTION_TTYPE + "\x00ANSI" + NVT_IAC + NVT_SE);
}
var termWidth = 80;
var termHeight = 25;
this.setWidthHeight = function(w, h) {
termWidth = w;
termHeight = h;
if (ALLOWED_OPTIONS[OPTION_NAWS]) sendWidthHeight();
}
function sendWidthHeight() {
networkOutputHandler(NVT_IAC + NVT_SB + OPTION_NAWS + "\x00" + String.fromCharCode(termWidth) + "\x00" + String.fromCharCode(termHeight) + NVT_IAC + NVT_SE);
//networkOutputHandler(NVT_IAC + NVT_SB + OPTION_NAWS + "\x00\x80\x00\x20" + NVT_IAC + NVT_SE);
}
} 