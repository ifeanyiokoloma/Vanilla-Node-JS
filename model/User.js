const {
  getCollection,
  usersCollectionPath,
  updateCollection,
  saveCollection,
  updateDoc,
  removeDocFromCollectionByID,
} = require('../utils');

const create = newUser => {
  return new Promise((res, rej) => {
    getCollection(usersCollectionPath, (err, usersCollection) => {
      if (err) {
        rej(err);
        return;
      }

      const updatedUsersCollection = updateCollection(usersCollection, newUser);
      saveCollection(usersCollectionPath, updatedUsersCollection);

      res(newUser);
    });
  });
};

const findAll = () => {
  return new Promise((res, rej) => {
    getCollection(usersCollectionPath, (err, usersCollection) => {
      if (err) {
        rej(err);
        return;
      }

      const number = usersCollection.length;

      res([usersCollection, number]);
    });
  });
};

const findById = id => {
  return new Promise((res, rej) => {
    getCollection(usersCollectionPath, (err, usersCollection) => {
      if (err) {
        rej(err);
        return;
      }

      const userDoc = usersCollection.find(userDoc => id === userDoc.id);
      res(userDoc);
    });
  });
};

const updateById = (id, { ...newUserUpdateData }) => {
  return new Promise(async function (res, rej) {
    const userDoc = await findById(id);
    const newUserUpdateDataProps = Object.keys(newUserUpdateData);

    const propsExistInUserDoc = newUserUpdateDataProps.every(
      prop => prop in userDoc
    );
    if (propsExistInUserDoc) {
      updateDoc(userDoc, newUserUpdateData);

      getCollection(usersCollectionPath, (err, usersCollection) => {
        if (err) {
          rej(err);
          return;
        }

        const newCollection = removeDocFromCollectionByID(id, usersCollection);

        newCollection.push(userDoc);

        saveCollection(usersCollectionPath, JSON.stringify(newCollection));

        res(userDoc);
      });
    } else {
      const propsNotInUserDoc = newUserUpdateDataProps.filter(
        prop => !(prop in userData)
      );

      rej(
        `These properties: "${propsNotInUserDoc.join(',')}"... ${
          propsNotInDB.length > 1 ? 'do' : 'does'
        } not exist in the "user document"`
      );
    }
  });
};

const removeById = id => {
  return new Promise(async (res, rej) => {
    getCollection(usersCollectionPath, (err, usersCollection) => {
      if (err) {
        rej("Something went wrong");
        return;
      }

      const newCollection = removeDocFromCollectionByID(id, usersCollection);

      saveCollection(usersCollectionPath, JSON.stringify(newCollection));

      res(`User with the ID: '${id}' has been deleted`);
    });
  });
};

module.exports = { create, findAll, findById, updateById, removeById };
