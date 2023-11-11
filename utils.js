const { readFile, writeFile } = require('fs');
const { randomUUID } = require('crypto');
const path = require('path');

exports.getCollection = (collectionPath, cb) => {
  readFile(collectionPath, 'utf-8', (err, collection) => {
    cb(err, JSON.parse(collection));
  });
};

exports.updateCollection = (collection, newUser) => {
  const id = randomUUID();
  newUser.id = id;
  collection.push(newUser);
  return JSON.stringify(collection);
};

exports.saveCollection = (collectionPath, collection) => {
  writeFile(collectionPath, collection, () =>
    console.log('collection updated')
  );
};

exports.usersCollectionPath = path.resolve(__dirname, 'DB', 'Users.json');

exports.updateDoc = (oldDoc, newDoc) => {
  const newDocProps = Object.keys(newDoc);
  for (const prop of newDocProps) {
    oldDoc[prop] = newDoc[prop];
  }
};

exports.removeDocFromCollectionByID = (id, collection) => {
  const newCollection = collection.filter(function (doc) {
    return id !== doc.id;
  });
  return newCollection;
};
