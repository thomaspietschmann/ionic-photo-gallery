import { ref, onMounted, watch } from 'vue';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';


import { Filesystem, Directory } from '@capacitor/filesystem';
import { Storage } from '@capacitor/storage';



export function usePhotoGallery() {
  const photos = ref<UserPhoto[]>([]);
  const takePhoto = async () => {
    const photo = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100,
    });
    const fileName = new Date().getTime() + '.jpeg';
    const savedFileImage = {
      filepath: fileName,
      webviewPath: photo.webPath,
    }
    photos.value = [savedFileImage, ...photos.value];
    console.log(photos.value);
  };
  
  return {
    takePhoto,
    photos
  };
}

export interface UserPhoto {
  filepath: string;
  webviewPath?: string;
}