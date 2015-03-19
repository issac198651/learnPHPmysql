function RealMintTerminal(ele) {
var term = ele;
var scrollback = document.createElement("div");
term.appendChild(scrollback);
var screen = document.createElement("div");
term.appendChild(screen);
defaultBackground = "black";//term.style.backgroundColor;
defaultForeground = "silver";//term.style.color;
term.style.whiteSpace = "pre";
term.style.fontFamily = "monospace";
/*** Color Palette -----0----- -----1----- -----2----- -----3----- -----4----- -----5----- -----6----- -----7----- -----8----- */
var normalColor = ["black", "maroon", "green", "olive", "navy", "purple", "teal", "silver", ""];
var intenseColor = ["gray", "red", "lime", "yellow", "blue", "fuchsia", "aqua", "white", ""];
/********************************************************************************************************************************/
// Cursor element
var cursor = document.createElement("span");
cursor.style.position = "relative";
cursor.style.top = "0px";
cursor.innerHTML = " ";
var cursorSpan = document.createElement("span");
cursorSpan.style.position = "absolute";
//cursorSpan.style.top = "0px";
//cursorSpan.style.left = "0px";
cursorSpan.appendChild(cursor);
var cursorFG = defaultBackground;
var cursorBG = defaultForeground;
// Go to hollow, non-blinking cursor on loss of focus
var docOnblur = document.onblur;
document.onblur = function() {
cursorBlink = 0;
cursor.style.visibility = "visible";
cursor.style.border = "1px solid " + cursorBG;
cursor.style.backgroundColor = null;
if (docOnblur != null) docOnblur();
}
// Go to filled, blinking cursor on focus
var docOnfocus = document.onfocus;
document.onfocus = function() {
cursorBlink = 1;
cursor.style.border = null;
cursor.style.backgroundColor = cursorBG;
cursor.style.color = cursorFG;
if (docOnfocus != null) docOnfocus();
}
var rowDiv = null;
// Determine character size (by calculating size of a square of Ms)
// This will be more robust that calculating the size of one character,
// since the spacing between lines may be subtly different than
// expected.
var getCharSize = document.createElement("span");
var testString = ""; for (var i=0; i<10; i++) testString += "M";
var theMs = testString;
for (var i=1; i<10; i++) theMs += "\n" + testString;
getCharSize.innerHTML = theMs;
term.appendChild(getCharSize);
var charWidth = Math.floor(getCharSize.offsetWidth / 10);
var charHeight = Math.floor(getCharSize.offsetHeight / 10);
term.removeChild(getCharSize);
// TODO: Could have window set screen rows/cols based on height/width!
var screenCols = 80;
var screenRows = 25;
this.resize = function(w, h) {
screenCols = w;
screenRows = h;
scrollToBottom();
}
this.resizeToFit = function(w, h) {
this.resize(Math.floor(w / charWidth), Math.floor(h / charHeight));
}
this.getScreenCols = function() { return screenCols; }
this.getScreenRows = function() { return screenRows; }
// Set up cursor
var cursorRow;
var cursorCol;
changeRow(0);
changeCol(0);
var italic = 0;
var intense = 0;
var negative = 0;
var underline = 0;
var bgColor = defaultBackground;
var fgColor = defaultForeground;
var styleDiv = null;
var prepend = null;
var CONTROL_FUNCTION = new Array();
var ESCAPE_FUNCTION = new Array();
var CSI_FUNCTION = new Array();
// Function A
CSI_FUNCTION[0x41] = function(lastSegment, parms) {
var rows = 1;
if (parms.length >= 1 && parms[0].length > 0) rows = parseInt(parms[0]);
changeRow(cursorRow - rows);
}
// Function B
CSI_FUNCTION[0x42] = function(lastSegment, parms) {
var rows = 1;
if (parms.length >= 1 && parms[0].length > 0) rows = parseInt(parms[0]);
changeRow(cursorRow + rows);
}
// Function C
CSI_FUNCTION[0x43] = function(lastSegment, parms) {
var columns = 1;
if (parms.length >= 1 && parms[0].length > 0) columns = parseInt(parms[0]);
changeCol(cursorCol + columns);
}
// Function D
CSI_FUNCTION[0x44] = function(lastSegment, parms) {
var columns = 1;
if (parms.length >= 1 && parms[0].length > 0) columns = parseInt(parms[0]);
changeCol(cursorCol - columns);
}
// Function H or f
CSI_FUNCTION[0x48] = CSI_FUNCTION[0x66] = function(lastSegment, parms) {
var row = 0;
var col = 0;
if (parms.length >= 1 && parms[0].length > 0) row = parseInt(parms[0])-1;
if (parms.length >= 2 && parms[1].length > 0) col = parseInt(parms[1])-1;
changeCol(col);
changeRow(row);
}
// Function G
CSI_FUNCTION[0x47] = function(lastSegment, parms) {
var col = 0;
if (parms.length >= 1 && parms[0].length > 0) col = parseInt(parms[0])-1;
changeCol(col);
}
// Function J
CSI_FUNCTION[0x4A] = function(lastSegment, parms) {
var mode = 0;
if (parms.length >= 1 && parms[0].length > 0) mode = parseInt(parms[0]);
if (mode == 0) {
// No need to start a new span, since the current one remains untouched.
deleteAndInsert(rowDiv, cursorCol, screenCols - cursorCol, null);
for (var j=cursorRow+1; j<screenRows; j++)
getRow(j).innerHTML = " ";
}
else if (mode == 1) {
// Clear from beginning to cursor
deleteAndInsert(rowDiv, 0, cursorCol, document.createTextNode(repeat(" ", cursorCol)));
styleDiv = null; // Start a new span
for (var j=0; j<cursorRow; j++)
getRow(j).innerHTML = " ";
}
else if (mode == 2) {
styleDiv = null; // Start a new span
for (var j=0; j<screenRows; j++)
getRow(j).innerHTML = " ";
}
}
// Function K
CSI_FUNCTION[0x4B] = function(lastSegment, parms) {
var mode = 0;
if (parms.length >= 1 && parms[0].length > 0) mode = parseInt(parms[0]);
if (mode == 0) {
// No need to start a new span, since the current one remains untouched.
deleteAndInsert(rowDiv, cursorCol, screenCols - cursorCol, null);
}
else if (mode == 1) {
deleteAndInsert(rowDiv, 0, cursorCol, document.createTextNode(repeat(" ", cursorCol)));
styleDiv = null;
}
else if (mode == 2) {
styleDiv = null; // Start a new span
getRow(cursorRow).innerHTML = " ";
}
}
// Function L
/*CSI_FUNCTION[0x4C] = function(lastSegment, parms) {
var num = 0;
if (parms.length >= 1 && parms[0].length > 0) num = parseInt(parms[0]);
}*/
// Function P
CSI_FUNCTION[0x50] = function(lastSegment, parms) {
var num = 1;
if (parms.length >= 1 && parms[0].length > 0) num = parseInt(parms[0]);
deleteAndInsert(rowDiv, cursorCol, num, null);
}
// Function b
CSI_FUNCTION[0x62] = function(lastSegment, parms) {
var num = 0;
if (parms.length >= 1 && parms[0].length > 0) num = parseInt(parms[0]);
var repeatMe = lastSegment.charAt(lastSegment.length - 1);
return repeat(lastSegment, num);
}
// Function d
CSI_FUNCTION[0x64] = function(lastSegment, parms) {
var row = 0;
if (parms.length >= 1 && parms[0].length > 0) row = parseInt(parms[0])-1;
changeCol(row);
}
// Function m - Rendition Change
CSI_FUNCTION[0x6D] = function(lastSegment, parms) {
for (var j=0; j<parms.length; j++) {
var parameter = 0;
if (parms[j].length > 0) parameter = parseInt(parms[j]);
if (parameter == 0) { // Reset
intense = 0;
italic = 0;
negative = 0;
underline = 0;
bgColor = defaultBackground;
fgColor = defaultForeground;
}
else if (parameter == 3)
italic = 1;
else if (parameter == 1)
intense = 1;
else if (parameter == 22)
intense = 0;
else if (parameter == 4)
underline = 1;
else if (parameter == 21)
underline = 2;
else if (parameter == 24)
underline = 0;
else if (parameter == 7)
negative = 1;
else if (parameter == 27)
negative = 0;
else if (parameter >= 30 && parameter <= 38) {
if (intense == 1)
fgColor = intenseColor[parameter - 30];
else
fgColor = normalColor[parameter - 30];
}	
else if (parameter == 39)
fgColor = defaultForeground;
else if (parameter >= 40 && parameter <= 48) {
bgColor = normalColor[parameter - 40];
}	
else if (parameter == 39)
bgColor = defaultBackground;
}
styleDiv = null;
}
// Linefeed
CONTROL_FUNCTION[10] = function(lastSegment, str) {
// Start new div at LF
if (cursorRow+1 < screenRows)
changeRow(cursorRow+1);
else {
// Scroll top row off
scrollback.appendChild(screen.removeChild(screen.firstChild));
changeRow(cursorRow);
}
return str;
}
// Carriage return
CONTROL_FUNCTION[13] = function(lastSegment, str) {
changeCol(0);
return str;
}
// Backspace
CONTROL_FUNCTION[8] = function(lastSegment, str) {
changeCol(cursorCol - 1);
return str;
}
function CSI_HANDLER(lastSegment, str) {
result = str.match(/^\??([0-9;]*)([A-Za-z])(.*)$/);
if (result != null) {
var parms = result[1].split(/[^0-9]/);
var command = result[2].charCodeAt(0);
var handlerReturnValue = "";
var handler = CSI_FUNCTION[command];
if (handler != null)
handlerReturnValue = handler(lastSegment, parms);
else if (window.console)
console.warn("Unhandled console code: ESC[" + result[1] + result[2] + " (ECMA-48: " + (command>>4) + "/" + (command%16) + ")");
var remainingStream = result[3];
if (handlerReturnValue)
remainingStream = handlerReturnValue + remainingStream;
return remainingStream;
}
return undefined;
}
// CSI
ESCAPE_FUNCTION[0x5B] = function(lastSegment, str) {
return CSI_HANDLER(lastSegment, str);
}
// Escape
CONTROL_FUNCTION[0x1B] = function(lastSegment, str) {
// Need at least one character
if (str.length == 0)
return undefined;
var command = str.charCodeAt(0);
var handler = ESCAPE_FUNCTION[command];
var parameters = str.substring(1);
var handlerReturnValue = "";
if (handler != null) {
handlerReturnValue = handler(lastSegment, parameters);
return handlerReturnValue;
}
else {
if (window.console)
console.warn("Unhandled escape.", command);
return parameters;
}
}
var lastStreamSegment = "";
this.print = function(str) {
// Remove cursor overlay
if (cursorSpan.parentNode != null) cursorSpan.parentNode.removeChild(cursorSpan);
str = decode(str);
if (prepend != null) {
str = prepend + str;
prepend = null;
}
// Strip unhandled codes
//str = str.replace(/[\x00-\x07\x09\x0B\x0C\x0E-\x1A\x1C-\x1F\x80-\xFF]/g, "");
str = str.replace(/\x00/g, "");
// Split on remaining codes (so we only have to deal with one command at a time)
var reducedString = str.split(/(?=[\x00-\x1F\x80-\xFF])/);
for (var i=0; i<reducedString.length; i++) {
// Handle leading control code, if any
var charCode = reducedString[i].charCodeAt(0);
if (charCode <= 31) {
var controlCodeParameters = reducedString[i].substring(1);
// Handle control characters
var handler = CONTROL_FUNCTION[charCode];
if (handler != null) {
var remainingStream = handler(lastStreamSegment, controlCodeParameters);
// If handler reports incomplete result...
if (remainingStream === undefined) {
// ...and no more non-control data exists, prepend and stop printing.
if (i == reducedString.length-1) {
prepend = reducedString[i];
break;
}
// Otherwise, if more control data exists, we have a broken control code.
// Skip control code, print rest.
reducedString[i] = controlCodeParameters;
}
else
reducedString[i] = remainingStream;
}
else {
if (window.console)
console.warn("Unhandled control code.", charCode);
reducedString[i] = controlCodeParameters;
}
}
lastStreamSegment = reducedString[i];
// If characters remain, print them.
if (reducedString[i].length > 0) {
// Wrap lines
while (cursorCol + reducedString[i].length > screenCols) {
var remaining = screenCols - cursorCol;
var first = reducedString[i].substring(0, remaining);
printElement(document.createTextNode(first));
changeRow(cursorRow+1);
changeCol(0);
reducedString[i] = reducedString[i].substring(remaining);
}
printElement(document.createTextNode(reducedString[i]));
cursorCol += reducedString[i].length;
}
}
// Must take offset into account in the future!!!
var rowTerm = getRow(cursorRow);
if (rowTerm != null) {
var character = " ";
// Default to inverted defaults
cursorFG = defaultBackground;
cursorBG = defaultForeground;
// Loop through parent's children to find child the selected character and color state
var children = rowTerm.childNodes;
var childStartCol = 0;
for (var i=0; i<children.length; i++) {
// Get contents of child
var childContents = children[i].textContent;
// Calculate start/end of spans within current row
var nextChildStartCol = childStartCol + childContents.length;
// If cursor column is within this layer
if (cursorCol >= childStartCol && cursorCol < nextChildStartCol) {
// Calculate string index of column
var index = cursorCol - childStartCol;
// Get character
if (index < childContents.length)
character = childContents.charAt(index);
// Set colors to corresponding colors.
if (children[i].style) {
cursorFG = children[i].style.backgroundColor;
cursorBG = children[i].style.color;
}
// Break to avoid descending into lower, invisible layers.
break;
}
childStartCol = nextChildStartCol;
}
// TODO: Set font weight properly! Intense cursor won't render properly otherwise...
cursor.style.left = cursorCol + "00%";
cursor.style.color = cursorFG;
cursor.style.backgroundColor = cursorBG;
cursor.textContent = character;
rowTerm.insertBefore(cursorSpan, rowTerm.firstChild);
}
scrollToBottom();
}
function repeat(c, n) {
var spc = "";
for (var i=0; i<n; i++)
spc += c;
return spc;
}
function printElement(ele) {
if (styleDiv == null) {
styleDiv = document.createElement("span");
if (negative == 0) {
styleDiv.style.backgroundColor = bgColor;
styleDiv.style.color = fgColor;
}
else {
styleDiv.style.backgroundColor = fgColor;
styleDiv.style.color = bgColor;
}
if (underline >= 1) styleDiv.style.textDecoration = "underline";
if (underline == 2) styleDiv.style.borderBottom = "1px solid"
if (intense == 1) styleDiv.style.fontWeight = "bold";
if (italic == 1) styleDiv.style.fontStyle = "oblique";
styleDiv.appendChild(ele);
deleteAndInsert(rowDiv, cursorCol, styleDiv.textContent.length, styleDiv);
}
else {
deleteAndInsert(rowDiv, cursorCol, ele.textContent.length, null);
styleDiv.appendChild(ele);
/*var next = styleDiv.nextSibling;
if (next != null) {
next.textContent = next.textContent.substring(ele.textContent.length);
if (next.textContent.length == 0) next.parentNode.removeChild(next);
}*/
}
}
function deleteAndInsert(ele, col, tlen, insertme) {
if (col >= ele.textContent.length) {
// Insert spacers here...
var space_needed = col - ele.textContent.length;
if (space_needed > 0) ele.appendChild(document.createTextNode(repeat(" ", space_needed)));
if (insertme != null)
ele.appendChild(insertme);
return;
}
//console.log("-------------------");
var current = ele.firstChild;
while (current != null) {
var str = current.textContent;
var len = str.length;
//console.log("%i, %i '%s' %e", col, len, str, current);
if (col < len) {
var parentNode = current.parentNode;
var next = current.nextSibling;
if (col == 0)
parentNode.removeChild(current);
else
current.textContent = str.substring(0, col);
if (insertme != null) {
parentNode.insertBefore(insertme, next);
insertme = null;
}
// This needs to copy style from old current node that it was split from.
if (col + tlen < len) {
var rest = document.createElement("span");
rest.textContent = str.substring(col+tlen);
parentNode.insertBefore(rest, next);
}
// In future, should merge adjacent spans with same style.
current = next;
tlen -= len - col;
if (tlen <= 0) break;
}
else
current = current.nextSibling;
if (col > len) col -= len;
else col = 0;
}
if (ele.textContent.length == 0) ele.innerHTML = " ";
}
function changeCol(col) {
if (col < 0) col = 0;
else if (col >= screenCols) col = screenCols - 1;
cursorCol = col;
styleDiv = null;
}
function insertNewRow() {
var rowDiv = document.createElement("div");
rowDiv.innerHTML = " ";
screen.appendChild(rowDiv);
}
function getRow(row) {
while (row >= screen.childNodes.length)
insertNewRow();
return screen.childNodes[row];
}
function changeRow(row) {
if (row < 0) row = 0;
else if (row >= screenRows) row = screenRows - 1;
cursorRow = row;
rowDiv = getRow(cursorRow);
styleDiv = null;
}
function scrollToBottom() {
// Get top row
//var topRow = getRow(0);
screen.scrollIntoView();
}
function swapColors(blinkEle) {
var backgroundColor = blinkEle.style.backgroundColor;
var color = blinkEle.style.color;
blinkEle.style.color = backgroundColor;
blinkEle.style.backgroundColor = color;
}
// Text blink
var cursorBlink = 1;
var blinkTextIntervalId = setInterval(function() {
// Blink cursor
if (cursor != null) {
if (cursorBlink == 1) {
if (cursor.style.visibility == "hidden")
cursor.style.visibility = "visible";
else
cursor.style.visibility = "hidden";
}
}
// Blink blinking text (this needs to be different...)
var blinkMe = document.getElementsByName("blink");
for (var i=0; i<blinkMe.length; i++) swapColors(blinkMe[i]);
}, 500);
// UTF-8 decoding function taken from webtoolkit.info
// Presumably under MIT license (as all scripts from that site are) but
// no license text was in downloaded file.
//
// Will rewrite to suit needs later, anyway.
function decode(utftext) {
var string = "";
var i = 0;
var c = c1 = c2 = 0;
while ( i < utftext.length ) {
c = utftext.charCodeAt(i);
if (c < 128) {
string += String.fromCharCode(c);
i++;
}
else if((c > 191) && (c < 224)) {
c2 = utftext.charCodeAt(i+1);
string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
i += 2;
}
else {
c2 = utftext.charCodeAt(i+1);
c3 = utftext.charCodeAt(i+2);
string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
i += 3;
}
}
return string;
}
} 