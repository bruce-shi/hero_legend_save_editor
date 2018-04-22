const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();
const LZString = require('./lz-string')

function ascii_to_hex(str) {
  var arr1 = [];
  for (var n = 0, l = str.length; n < l; n++) {
    var hex = Number(str.charCodeAt(n)).toString(16);
    arr1.push(hex);
  }
  return arr1.join('00');
}


const db = new sqlite3.Database('file__0.localstorage')

const query = "SELECT * FROM ItemTable WHERE key = ?"
db.get(query, ['RPG File1'], (err, row) => {
  const value = row.value.toString();
  const data = JSON.parse(LZString.decompressFromBase64(value))
  data['variables']['_data']["@a"][30] = 5000000
  changed = LZString.compressToBase64(JSON.stringify(data))
  db.run(`UPDATE ItemTable SET value = x'${ascii_to_hex(changed)}'  WHERE key='RPG File1'`)
  db.close()
})