import { collection, getDocs, doc, getDoc, query, where, limit, arrayUnion, arrayRemove, updateDoc } from 'firebase/firestore';
import { db } from './firebase';
import { Anime } from '@/types/anime';

const ANIME_COLLECTION = 'anime';

export async function getFeaturedAnime(): Promise<Anime | null> {
  const q = query(collection(db, ANIME_COLLECTION), where('isFeatured', '==', true), limit(1));
  const querySnapshot = await getDocs(q);
  
  if (querySnapshot.empty) {
    return null;
  }

  const doc = querySnapshot.docs[0];
  return { id: doc.id, ...doc.data() } as Anime;
}

export async function getPopularAnime(limitCount: number = 6): Promise<Anime[]> {
  const q = query(collection(db, ANIME_COLLECTION), where('isFeatured', '==', false), limit(limitCount));
  const querySnapshot = await getDocs(q);
  
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Anime));
}

export async function getAnimeById(id: string): Promise<Anime | null> {
  const docRef = doc(db, ANIME_COLLECTION, id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() } as Anime;
  } else {
    return null;
  }
}

export async function addToFavorites(userId: string, animeId: string) {
  const userRef = doc(db, 'users', userId);
  await updateDoc(userRef, {
    favorites: arrayUnion(animeId)
  });
}

export async function removeFromFavorites(userId: string, animeId: string) {
  const userRef = doc(db, 'users', userId);
  await updateDoc(userRef, {
    favorites: arrayRemove(animeId)
  });
}

export async function getFavorites(userId: string): Promise<Anime[]> {
  const userRef = doc(db, 'users', userId);
  const userDoc = await getDoc(userRef);
  
  if (userDoc.exists() && userDoc.data().favorites) {
    const favorites = userDoc.data().favorites as string[];
    const animePromises = favorites.map(id => getAnimeById(id));
    const animeList = await Promise.all(animePromises);
    return animeList.filter((anime): anime is Anime => anime !== null);
  }
  
  return [];
}

export async function isFavorite(userId: string, animeId: string): Promise<boolean> {
  const userRef = doc(db, 'users', userId);
  const userDoc = await getDoc(userRef);
  
  if (userDoc.exists() && userDoc.data().favorites) {
    const favorites = userDoc.data().favorites as string[];
    return favorites.includes(animeId);
  }
  
  return false;
}

