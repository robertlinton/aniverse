import { collection, addDoc, getDocs, doc, updateDoc } from 'firebase/firestore';
import { db } from './firebase';
import { Anime } from '@/types/anime';

function determineCategory(format: string): 'tv' | 'movie' | 'other' {
  format = format.toLowerCase();
  if (format.includes('tv') || format.includes('series')) return 'tv';
  if (format.includes('movie')) return 'movie';
  return 'other';
}

export async function addAnime(animeData: Omit<Anime, 'id'>): Promise<string> {
  const category = determineCategory(animeData.format);
  const docRef = await addDoc(collection(db, 'anime'), {
    ...animeData,
    category,
    malId: animeData.id, // Store the MAL ID separately
  });
  return docRef.id;
}

export async function getAllAnime(): Promise<Anime[]> {
  const querySnapshot = await getDocs(collection(db, 'anime'));
  return querySnapshot.docs.map(doc => ({
    ...doc.data(),
    id: doc.id,
  } as Anime));
}

export async function updateAnime(id: string, animeData: Omit<Anime, 'id'>): Promise<void> {
  const category = determineCategory(animeData.format);
  const animeRef = doc(db, 'anime', id);
  await updateDoc(animeRef, {
    ...animeData,
    category,
    malId: animeData.id, // Ensure we're updating the MAL ID if it changes
  });
}

