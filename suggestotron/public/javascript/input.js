function RealMintKeyboard() {
/*****************************************/
/*** Keyboard Handler ***/
/*****************************************/
// Single key state/modifier buffer
var heldKey = 0;
var modShift = 0;
var modCtrl = 0;
var modAlt = 0;
// ID of routine repeating keystrokes. -1 = not repeating.
var repeatKeyTimeoutId = -1;
var repeatKeyIntervalId = -1;
// Starts repeating keystrokes
function startRepeat() {
repeatKeyIntervalId = setInterval(function() { sendKey(); }, 50);
}
// Stops repeating keystrokes
function stopRepeat() {
if (repeatKeyTimeoutId != -1) clearInterval(repeatKeyTimeoutId);
if (repeatKeyIntervalId != -1) clearInterval(repeatKeyIntervalId);
}
// Sends a single keystroke over the network
function sendKey() {
if (heldKey == 16) return;	// Shift
if (heldKey == 17) return;	// Ctrl
if (heldKey == 18) return;	// Alt
if (modAlt == 1) keyHandler("\x1B");
if (modCtrl == 1 && heldKey >= 64 && heldKey <= 90) {
keyHandler(controlChar[heldKey - 64]);
return;
}
var sendme = null;
if (modShift == 0) sendme = unshiftedKeyString[heldKey];
else sendme = shiftedKeyString[heldKey];
if (sendme != null)
keyHandler(sendme);
else if (window.console)
console.log("Undefined keystroke.", heldKey);
}
// When key pressed
document.onkeydown = function(e) {
var keynum;
if (window.event) keynum = window.event.keyCode;
else if (e.which) keynum = e.which;
// Ctrl/Alt/Shift
if (keynum == 16)
modShift = 1;
else if (keynum == 17)
modCtrl = 1;
else if (keynum == 18)
modAlt = 1;
else {
heldKey = keynum;
// Clear old key repeat, if any.
stopRepeat();
// Otherwise...
sendKey();
// Start repeating after a short delay
repeatKeyTimeoutId = setTimeout(function() { startRepeat(); }, 500);
}
return false;
}
// When key released
document.onkeyup = function(e) {
var keynum;
if (window.event) keynum = window.event.keyCode;
else if (e.which) keynum = e.which;
// Ctrl/Alt/Shift
if (keynum == 16)
modShift = 0;
else if (keynum == 17)
modCtrl = 0;
else if (keynum == 18)
modAlt = 0;
// Otherwise...
else
stopRepeat();
return false;
}
// When focus is lost, stop repeating keys.
var docOnblur = document.onblur;
document.onblur = function() {
modAlt = 0;
modCtrl = 0;
modShift = 0;
stopRepeat();
if (docOnblur != null) docOnblur();
}
var controlChar = new Array();
controlChar[0] = '\x00';
controlChar[1] = '\x01';
controlChar[2] = '\x02';
controlChar[3] = '\x03';
controlChar[4] = '\x04';
controlChar[5] = '\x05';
controlChar[6] = '\x06';
controlChar[7] = '\x07';
controlChar[8] = '\x08';
controlChar[9] = '\x09';
controlChar[10] = '\x0A';
controlChar[11] = '\x0B';
controlChar[12] = '\x0C';
controlChar[13] = '\x0D';
controlChar[14] = '\x0E';
controlChar[15] = '\x0F';
controlChar[16] = '\x10';
controlChar[17] = '\x11';
controlChar[18] = '\x12';
controlChar[19] = '\x13';
controlChar[20] = '\x14';
controlChar[21] = '\x15';
controlChar[22] = '\x16';
controlChar[23] = '\x17';
controlChar[24] = '\x18';
controlChar[25] = '\x19';
controlChar[26] = '\x1A';
var keyHandler = null;
this.setKeyHandler = function(kh) { keyHandler = kh; }
} 