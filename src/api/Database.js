import  "./config";
import "firebase/firestore";
import * as firebase from "firebase";

const db = firebase.firestore();

export const postEntity = (entity, item) => {
    db.collection(entity).doc(item.id.toString()).set(item)
        .then(() => console.log("Document successfully written!"))
        .catch((error) => console.error("Error writing document: ", error));
};

export const getEntity = entity => {
    return new Promise((success, reject) => {
        db.collection(entity)
            .get()
            .then(snapshot => success(snapshot))
            .catch(error => reject(error))
        ;
    });
};

export const deleteEntity = (entity, item) => {
    return new Promise((success, reject) => {
        db.collection(entity).doc(item.id.toString()).delete()
            .then(() => success())
            .catch(error => reject(error))
        ;
    });
};
