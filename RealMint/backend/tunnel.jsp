<%-- BACKEND --%>
<%@page import="java.io.OutputStream"%>
<%@page import="java.io.InputStream"%>
<%@page import="java.io.BufferedOutputStream"%>
<%@page import="java.net.Socket"%>
<%@page import="java.net.InetAddress"%>
<%@page import="java.net.InetSocketAddress"%>
<%@page import="java.net.SocketTimeoutException"%>
<%@page import="java.util.Arrays"%>
<%@page import="java.util.HashMap"%>
<%@page import="java.net.URLEncoder"%>
<%
OutputStream o = response.getOutputStream();
// Set up stream
Socket sock = (Socket) session.getAttribute("Socket");
Integer sequenceNumber = (Integer) session.getAttribute("SequenceNumber");
HashMap<Integer, byte[]> packetQueue = (HashMap<Integer, byte[]>) session.getAttribute("PacketQueue");
String packetSequence = request.getParameter("seq");
byte[] packetData = null;
// If we don't use getBytes, Java will clobber the binary data and
// output it as UNICODE!!!
String packetString = request.getParameter("data");
if (packetString != null) packetData = packetString.getBytes("iso-8859-1");
// Disconnect mode
if (request.getQueryString().equals("disconnect")) {
o.write("(EOF)".getBytes());
if (sock != null) sock.close();
session.setAttribute("Socket", null);
}
// If receiving data
else if (packetSequence != null && packetData != null) {
// Insert into queue
if (packetQueue == null || sock == null) {
// Could be null of session expires, bad request sequence, etc.
o.write("(EOF)".getBytes());
if (sock != null) sock.close();
session.setAttribute("Socket", null);
}
else {
packetQueue.put(new Integer(packetSequence), packetData);
// Add check for queue size (if above a certain number, give up)
// Write all sequential data in queue, until queue empty or
// missing data
OutputStream net_out = sock.getOutputStream();
byte[] data;
while ((data = packetQueue.get(sequenceNumber)) != null) {
net_out.write(data);
sequenceNumber++;
}
session.setAttribute("SequenceNumber", sequenceNumber);
response.addHeader("X-Now-Waiting-For", sequenceNumber.toString());
}
}
// Else (connecting / sending)
else {
int rseq = Integer.parseInt(request.getParameter("rseq"));
if (rseq == 0) {
if (sock != null) sock.close();
sock = null; // Automatically reset connection if requested
}
if (sock == null) {
session.setAttribute("Socket", new Socket());
session.setAttribute("SequenceNumber", new Integer(0));
session.setAttribute("PacketQueue", new HashMap<Integer, byte[]>());
o.write("(NEW)".getBytes());
}
else if (!sock.isConnected()) {
sock.connect(new InetSocketAddress(InetAddress.getLocalHost(), 23));
o.write("(CONNECT)".getBytes());
}
else {
InputStream net_in = sock.getInputStream();
OutputStream net_out = sock.getOutputStream();
sock.setSoTimeout(10000); // Timeout in 10 seconds
try {
int firstChar = net_in.read();
if (firstChar != -1) {
// Forward data
/*if (net_in.available() >= 50000) {
o.write("(BOOM) ".getBytes());
net_in.skip(net_in.available() - 2048);
}
else*/
o.write("(DATA) ".getBytes());
// Read as much as possible
int avail = net_in.available();
if (avail > 2048) avail = 2048;
byte[] buffer = new byte[avail+1];
net_in.read(buffer, 1, avail);
buffer[0] = (byte) firstChar;
// Write buffer (encoded, so that javascript won't clobber the binary data into UNICODE!!!)
BufferedOutputStream bos = new BufferedOutputStream(o);
for (int i=0; i<buffer.length; i++) {
int val = buffer[i] & 0xFF;
if (val == '%' || val < 32 || val >= 128) {
bos.write('%');
int digit1 = val & 0xF;
int digit2 = val >> 4;
if (digit2 <= 9) bos.write('0' + digit2);
else bos.write('A' + digit2 - 10);
if (digit1 <= 9) bos.write('0' + digit1);
else bos.write('A' + digit1 - 10);
}
else
bos.write(val);
}
bos.flush();
}
else {
// Close on EOF.
o.write("(EOF)".getBytes());
sock.close();
session.setAttribute("Socket", null);
}
}
catch (SocketTimeoutException e) {
// Allow graceful timeout
o.write("(PING)".getBytes());
}
}
}
o.flush();
o.close();
%>