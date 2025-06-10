import script from '../../tempfol/preview.json';
import { assetMap } from './assets';
// Holds current state index (can make this reactive later)
let currentSceneIndex = 0;

/**
 * Loads and enriches a scene from script JSON.
 */
export function getCurrentScene() {
  const rawScene = script[currentSceneIndex];

  if (!rawScene) return null;

  // Attach actual asset paths
  const enrichedScene = {
    ...rawScene,
    backgroundSrc: assetMap.backgrounds[rawScene.background] || null,
    character_1_emotionSrc: assetMap.emotions[rawScene.character_1_emotions] || null,
    character_2_emotionSrc: assetMap.emotions[rawScene.character_2_emotions] || null,
  };

  return enrichedScene;
}

/**
 * Advance to the next major state (scene).
 */
export function goToNextScene() {
  if (currentSceneIndex < script.length - 1) {
    currentSceneIndex++;
    return true;
  }
  return false; // no more scenes
}

/**
 * Reset the story to the beginning.
 */
export function resetStory() {
  currentSceneIndex = 0;
}
export function jumpToSceneById(id) {
  const index = script.findIndex(scene => scene.id === id);
  if (index !== -1) {
    currentSceneIndex = index;
    return true;
  }
  console.warn(`Scene with id ${id} not found.`);
  return false;
}