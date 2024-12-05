import { collection, addDoc, getDocs, doc, updateDoc } from 'firebase/firestore';
import { db } from './firebase';
import { Anime } from '@/types/anime';

export async function addAnime(animeData: Omit<Anime, 'id'>): Promise<string> {
  const docRef = await addDoc(collection(db, 'anime'), {
    ...animeData,
    malId: animeData.malId, // Use malId directly
  });
  return docRef.id;
}

export async function getAllAnime(): Promise<Anime[]> {
  const querySnapshot = await getDocs(collection(db, 'anime'));
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Anime));
}

export async function updateAnime(id: string, animeData: Omit<Anime, 'id'>): Promise<void> {
  const animeRef = doc(db, 'anime', id);
  await updateDoc(animeRef, {
    ...animeData,
    malId: animeData.malId, // Use malId directly
  });
}

