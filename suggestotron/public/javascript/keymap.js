// Keymap
var unshiftedKeyString = new Array();
unshiftedKeyString[8] = "\x08"; // backspace
unshiftedKeyString[9] = "\x09"; // tab
unshiftedKeyString[13] = "\n"; // enter
unshiftedKeyString[16] = null; // shift
unshiftedKeyString[17] = null; // ctrl
unshiftedKeyString[18] = null; // alt
unshiftedKeyString[19] = null; // pause/break
unshiftedKeyString[20] = null; // caps lock
unshiftedKeyString[27] = "\x1B"; // escape
unshiftedKeyString[32] = " "; // space
unshiftedKeyString[33] = "\x1B\x5B5~"; // page up
unshiftedKeyString[34] = "\x1B\x5B6~"; // page down
unshiftedKeyString[35] = "\x1BOF"; // end
unshiftedKeyString[36] = "\x1BOH"; // home
unshiftedKeyString[37] = "\x1B\x5BD"; // left arrow
unshiftedKeyString[38] = "\x1B\x5BA"; // up arrow
unshiftedKeyString[39] = "\x1B\x5BC"; // right arrow
unshiftedKeyString[40] = "\x1B\x5BB"; // down arrow
unshiftedKeyString[45] = "\x1B\x5B2~"; // insert
unshiftedKeyString[46] = "\x1B\x5B3~"; // delete
unshiftedKeyString[48] = "0";
unshiftedKeyString[49] = "1";
unshiftedKeyString[50] = "2";
unshiftedKeyString[51] = "3";
unshiftedKeyString[52] = "4";
unshiftedKeyString[53] = "5";
unshiftedKeyString[54] = "6";
unshiftedKeyString[55] = "7";
unshiftedKeyString[56] = "8";
unshiftedKeyString[57] = "9";
unshiftedKeyString[59] = ";"; // semi-colon
unshiftedKeyString[61] = "="; // equals sign
unshiftedKeyString[65] = "a";
unshiftedKeyString[66] = "b";
unshiftedKeyString[67] = "c";
unshiftedKeyString[68] = "d";
unshiftedKeyString[69] = "e";
unshiftedKeyString[70] = "f";
unshiftedKeyString[71] = "g";
unshiftedKeyString[72] = "h";
unshiftedKeyString[73] = "i";
unshiftedKeyString[74] = "j";
unshiftedKeyString[75] = "k";
unshiftedKeyString[76] = "l";
unshiftedKeyString[77] = "m";
unshiftedKeyString[78] = "n";
unshiftedKeyString[79] = "o";
unshiftedKeyString[80] = "p";
unshiftedKeyString[81] = "q";
unshiftedKeyString[82] = "r";
unshiftedKeyString[83] = "s";
unshiftedKeyString[84] = "t";
unshiftedKeyString[85] = "u";
unshiftedKeyString[86] = "v";
unshiftedKeyString[87] = "w";
unshiftedKeyString[88] = "x";
unshiftedKeyString[89] = "y";
unshiftedKeyString[90] = "z";
unshiftedKeyString[91] = null; // left window key
unshiftedKeyString[92] = null; // right window key
unshiftedKeyString[93] = null; // select key
unshiftedKeyString[96] = null; // numpad 0
unshiftedKeyString[97] = null; // numpad 1
unshiftedKeyString[98] = null; // numpad 2
unshiftedKeyString[99] = null; // numpad 3
unshiftedKeyString[100] = null; // numpad 4
unshiftedKeyString[101] = null; // numpad 5
unshiftedKeyString[102] = null; // numpad 6
unshiftedKeyString[103] = null; // numpad 7
unshiftedKeyString[104] = null; // numpad 8
unshiftedKeyString[105] = null; // numpad 9
unshiftedKeyString[106] = null; // multiply
unshiftedKeyString[107] = "="; // equals/add
unshiftedKeyString[109] = "-"; // subtract
unshiftedKeyString[110] = null; // decimal point
unshiftedKeyString[111] = null; // divide
unshiftedKeyString[112] = null; // f1
unshiftedKeyString[113] = null; // f2
unshiftedKeyString[114] = null; // f3
unshiftedKeyString[115] = null; // f4
unshiftedKeyString[116] = null; // f5
unshiftedKeyString[117] = null; // f6
unshiftedKeyString[118] = null; // f7
unshiftedKeyString[119] = null; // f8
unshiftedKeyString[120] = null; // f9
unshiftedKeyString[121] = null; // f10
unshiftedKeyString[122] = null; // f11
unshiftedKeyString[123] = null; // f12
unshiftedKeyString[144] = null; // num lock
unshiftedKeyString[145] = null; // scroll lock
unshiftedKeyString[186] = ";"; // semi-colon
unshiftedKeyString[187] = "="; // equal sign
unshiftedKeyString[188] = ","; // comma
unshiftedKeyString[189] = "-"; // dash
unshiftedKeyString[190] = "."; // period
unshiftedKeyString[191] = "/"; // forward slash
unshiftedKeyString[192] = "`"; // grave accent
unshiftedKeyString[219] = "["; // open bracket
unshiftedKeyString[220] = "\\"; // back slash
unshiftedKeyString[221] = "]"; // close bracket
unshiftedKeyString[222] = "'"; // single quote
var shiftedKeyString = new Array();
shiftedKeyString[8] = "\x08"; // backspace
shiftedKeyString[9] = "\x09"; // tab
shiftedKeyString[13] = "\n"; // enter
shiftedKeyString[16] = null; // shift
shiftedKeyString[17] = null; // ctrl
shiftedKeyString[18] = null; // alt
shiftedKeyString[19] = null; // pause/break
shiftedKeyString[20] = null; // caps lock
shiftedKeyString[27] = "\x1B"; // escape
shiftedKeyString[32] = " "; // space
shiftedKeyString[33] = "\x1B\x5B5~"; // page up
shiftedKeyString[34] = "\x1B\x5B6~"; // page down
shiftedKeyString[35] = "\x1BOF"; // end
shiftedKeyString[36] = "\x1BOH"; // home
shiftedKeyString[37] = "\x1B\x5BD"; // left arrow
shiftedKeyString[38] = "\x1B\x5BA"; // up arrow
shiftedKeyString[39] = "\x1B\x5BC"; // right arrow
shiftedKeyString[40] = "\x1B\x5BB"; // down arrow
shiftedKeyString[45] = "\x1B\x5B2~"; // insert
shiftedKeyString[46] = "\x1B\x5B3~"; // delete
shiftedKeyString[48] = ")";
shiftedKeyString[49] = "!";
shiftedKeyString[50] = "@";
shiftedKeyString[51] = "#";
shiftedKeyString[52] = "$";
shiftedKeyString[53] = "%";
shiftedKeyString[54] = "^";
shiftedKeyString[55] = "&";
shiftedKeyString[56] = "*";
shiftedKeyString[57] = "(";
shiftedKeyString[59] = ":"; // semi-colon
shiftedKeyString[61] = "+"; // equals sign
shiftedKeyString[65] = "A";
shiftedKeyString[66] = "B";
shiftedKeyString[67] = "C";
shiftedKeyString[68] = "D";
shiftedKeyString[69] = "E";
shiftedKeyString[70] = "F";
shiftedKeyString[71] = "G";
shiftedKeyString[72] = "H";
shiftedKeyString[73] = "I";
shiftedKeyString[74] = "J";
shiftedKeyString[75] = "K";
shiftedKeyString[76] = "L";
shiftedKeyString[77] = "M";
shiftedKeyString[78] = "N";
shiftedKeyString[79] = "O";
shiftedKeyString[80] = "P";
shiftedKeyString[81] = "Q";
shiftedKeyString[82] = "R";
shiftedKeyString[83] = "S";
shiftedKeyString[84] = "T";
shiftedKeyString[85] = "U";
shiftedKeyString[86] = "V";
shiftedKeyString[87] = "W";
shiftedKeyString[88] = "X";
shiftedKeyString[89] = "Y";
shiftedKeyString[90] = "Z";
shiftedKeyString[91] = null; // left window key
shiftedKeyString[92] = null; // right window key
shiftedKeyString[93] = null; // select key
shiftedKeyString[96] = null; // numpad 0
shiftedKeyString[97] = null; // numpad 1
shiftedKeyString[98] = null; // numpad 2
shiftedKeyString[99] = null; // numpad 3
shiftedKeyString[100] = null; // numpad 4
shiftedKeyString[101] = null; // numpad 5
shiftedKeyString[102] = null; // numpad 6
shiftedKeyString[103] = null; // numpad 7
shiftedKeyString[104] = null; // numpad 8
shiftedKeyString[105] = null; // numpad 9
shiftedKeyString[106] = null; // multiply
shiftedKeyString[107] = "+"; // add
shiftedKeyString[109] = "_"; // subtract
shiftedKeyString[110] = null; // decimal point
shiftedKeyString[111] = null; // divide
shiftedKeyString[112] = null; // f1
shiftedKeyString[113] = null; // f2
shiftedKeyString[114] = null; // f3
shiftedKeyString[115] = null; // f4
shiftedKeyString[116] = null; // f5
shiftedKeyString[117] = null; // f6
shiftedKeyString[118] = null; // f7
shiftedKeyString[119] = null; // f8
shiftedKeyString[120] = null; // f9
shiftedKeyString[121] = null; // f10
shiftedKeyString[122] = null; // f11
shiftedKeyString[123] = null; // f12
shiftedKeyString[144] = null; // num lock
shiftedKeyString[145] = null; // scroll lock
shiftedKeyString[186] = ":"; // semi-colon
shiftedKeyString[187] = "+"; // equal sign
shiftedKeyString[188] = "<"; // comma
shiftedKeyString[189] = "_"; // dash
shiftedKeyString[190] = ">"; // period
shiftedKeyString[191] = "?" // forward slash
shiftedKeyString[192] = "~"; // grave accent
shiftedKeyString[219] = "{"; // open bracket
shiftedKeyString[220] = "|"; // back slash
shiftedKeyString[221] = "}"; // close braket
shiftedKeyString[222] = "\""; // single quote 