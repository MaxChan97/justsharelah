import firebase from "./Firebase.js";

export function getUserByUsernameListener(username, setUser) {
  const snapshot = firebase
    .firestore()
    .collection("users")
    .where("username", "==", username)
    .limit(1);

  const unsubscribe = snapshot.onSnapshot((docSnapshot) => {
    docSnapshot.forEach((doc) => {
      setUser([doc.id, doc.data()]);
    });
  });

  return unsubscribe;
}

export async function getUserByUsername(username, setUser) {
  const snapshot = await firebase
    .firestore()
    .collection("users")
    .where("username", "==", username)
    .limit(1)
    .get();

  if(snapshot.empty) {
    return false;
  }

  snapshot.forEach((doc) => {
    console.log("USERDATA: " + JSON.stringify(doc.data()));
    setUser([doc.id,doc.data()]);
  });

  return true;
}

export function getUserByIdListener(userId, setUser) {
  console.log("FROM API - userToken : " + userId);
  const unsubscribe = firebase
    .firestore()
    .collection("users")
    .doc(userId)
    .onSnapshot(function (doc) {
      console.log("FROM API: " + JSON.stringify(doc.data()));
      setUser(doc.data());
    });

  return unsubscribe;
}

export async function getUserById(userId, setUser) {
  const snapshot = await firebase
    .firestore()
    .collection("users")
    .doc(userId)
    .get();

  console.log(snapshot.data());

  setUser(snapshot.data());
}

export async function followUser(user1Id, user2Id) {
  console.log("STARTING TRANSACTION");

  var user1Ref = firebase.firestore().collection("users").doc(user1Id);

  var user2Ref = firebase.firestore().collection("users").doc(user2Id);

  try {
    await firebase.firestore().runTransaction(async (tn) => {
      console.log("LINE0");
      var user1Doc = await tn.get(user1Ref);
      var user2Doc = await tn.get(user2Ref);

      if (user1Doc.get("following") != null) {
        console.log("LINE1");
        tn.update(user1Ref, {
          following: firebase.firestore.FieldValue.arrayUnion(user2Id),
        });
      } else {
        console.log("LINE2");
        tn.update(user1Ref, { following: [user2Id] });
      }

      if (user2Doc.get("followers") != null) {
        console.log("LINE3");
        tn.update(user2Ref, {
          followers: firebase.firestore.FieldValue.arrayUnion(user1Id),
        });
      } else {
        console.log("LINE4");
        tn.update(user2Ref, { followers: [user1Id] });
      }

      return true;
    });
  } catch (err) {
    console.log("TRANSACTION FAILED");
    console.log(err);
    return false;
  }
}

export async function unfollowUser(user1Id, user2Id) {
  console.log("STARTING TRANSACTION");

  var user1Ref = firebase.firestore().collection("users").doc(user1Id);

  var user2Ref = firebase.firestore().collection("users").doc(user2Id);

  try {
    await firebase.firestore().runTransaction(async (tn) => {
      console.log("LINE0");
      var user1Doc = await tn.get(user1Ref);
      var user2Doc = await tn.get(user2Ref);

      if (user1Doc.get("following") != null) {
        console.log("LINE1");
        tn.update(user1Ref, {
          following: firebase.firestore.FieldValue.arrayRemove(user2Id),
        });
      }

      if (user2Doc.get("followers") != null) {
        console.log("LINE3");
        tn.update(user2Ref, {
          followers: firebase.firestore.FieldValue.arrayRemove(user1Id),
        });
      }

      return true;
    });
  } catch (err) {
    console.log("TRANSACTION FAILED");
    console.log(err);
    return false;
  }
}

export async function getAllUsers() {
  const db = firebase.firestore().collection("users");
  const snapshot = await db.get();
  return snapshot;
}

export function changePassword(newPassword) {
  var user = firebase.auth().currentUser;

  user.updatePassword(newPassword).then(function() {
    // Update successful.
  }).catch(function(error) {
    // An error happened.
  });
}
