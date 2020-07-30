/* --- Node.js --- */
const http = require('http');

/* --- http server --- */
const server = http.createServer((req, res, next) => {
  res.end('Hello Node');
});

server.listen(5000);

/* --- file system ---
const fs = require('fs').promises;
const input = 'files-system with node';
fs.writeFile('input-node.txt', input).then(() => { console.log('fs-write') }).catch();
*/
