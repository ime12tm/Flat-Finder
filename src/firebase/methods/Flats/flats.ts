import { DocumentData, collection, deleteDoc, doc, getDoc, getDocs, setDoc, updateDoc } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { Flat } from "../../../interface";
import { db } from "../../api/firebase.config";

export async function addFlat(flat: Flat) {
  const uid = uuidv4();
  // const newProduct = { ...product, id: uuidv4() };

  await setDoc(doc(db, "flats", uid), {
    id: uid,
    createdBy: flat.createdBy,
    title: flat.title,
    city: flat.city,
    streetName: flat.streetName,
    streetNumber: flat.streetNumber,
    areaSize: flat.areaSize,
    hasAC: flat.hasAC,
    yearBuilt: flat.yearBuilt,
    rentPrice: flat.rentPrice,
    description: flat.description,
    phone: flat.phone,
    image: flat.image,
    dateAvailable: flat.dateAvailable,
  });
}

export async function updateFlat(updatedFlat: Flat) {
  const flatRef = doc(db, "flats", updatedFlat.id as string);
  console.log("Flat", updatedFlat);
  await updateDoc(flatRef, { ...updatedFlat });
}

export async function deleteFlat(flatReference: string) {
  const flatRef = doc(db, "flats", flatReference);
  await deleteDoc(flatRef);
  console.log("deleted");
}

export async function getAllFlats() {
  const arr: DocumentData[] = [];
  const data = await getDocs(collection(db, "flats"));
  data.forEach((doc) => {
    arr.push(doc.data());
  });
  return arr;
}

export async function getFlat(id: string) {
  const flatRef = doc(db, "flats", id);
  const flat = await getDoc(flatRef);
  console.log(flat.data());
  return flat.data();
}
