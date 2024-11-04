import { useState } from 'react';
import { ImagePlus, Camera, X } from 'lucide-react';
import { cn } from '../utils/cn';

interface ImageUploadProps {
  maxPhotos: number;
  images: File[];
  onImagesChange: (images: File[]) => void;
}

export default function ImageUpload({ maxPhotos, images, onImagesChange }: ImageUploadProps) {
  const [preview, setPreview] = useState<string[]>([]);
  const [showCamera, setShowCamera] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [videoRef, setVideoRef] = useState<HTMLVideoElement | null>(null);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' }
      });
      setStream(mediaStream);
      setShowCamera(true);
      if (videoRef) {
        videoRef.srcObject = mediaStream;
      }
    } catch (err) {
      console.error('Erreur lors de l\'accès à la caméra:', err);
      alert('Impossible d\'accéder à la caméra. Veuillez vérifier vos permissions.');
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setShowCamera(false);
  };

  const takePhoto = () => {
    if (videoRef) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.videoWidth;
      canvas.height = videoRef.videoHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(videoRef, 0, 0);
        canvas.toBlob((blob) => {
          if (blob) {
            const file = new File([blob], `photo-${Date.now()}.jpg`, { type: 'image/jpeg' });
            const newImages = [...images, file];
            onImagesChange(newImages);
            setPreview([...preview, URL.createObjectURL(blob)]);
          }
        }, 'image/jpeg');
      }
      stopCamera();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files).slice(0, maxPhotos - images.length);
      const newImages = [...images, ...files];
      onImagesChange(newImages);
      const newPreviews = files.map(file => URL.createObjectURL(file));
      setPreview([...preview, ...newPreviews]);
    }
  };

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    onImagesChange(newImages);
    URL.revokeObjectURL(preview[index]);
    setPreview(preview.filter((_, i) => i !== index));
  };

  return (
    <div>
      <div className="mt-2 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {preview.map((url, index) => (
          <div key={index} className="relative aspect-square rounded-lg overflow-hidden">
            <img
              src={url}
              alt=""
              className="h-full w-full object-cover"
            />
            <button
              type="button"
              onClick={() => removeImage(index)}
              className="absolute top-1 right-1 p-1 bg-white rounded-full shadow-sm hover:bg-gray-100"
            >
              <X size={16} className="text-gray-600" />
            </button>
          </div>
        ))}

        {preview.length < maxPhotos && (
          <div className="flex gap-2">
            <label className={cn(
              "flex-1 flex flex-col items-center justify-center rounded-lg",
              "border-2 border-dashed border-gray-300",
              "hover:border-red-400 cursor-pointer"
            )}>
              <div className="flex flex-col items-center justify-center py-7 px-4">
                <ImagePlus className="h-8 w-8 text-gray-400" />
                <p className="mt-1 text-sm text-gray-500">
                  Choisir une photo
                </p>
              </div>
              <input
                type="file"
                className="sr-only"
                accept="image/*"
                onChange={handleFileChange}
                multiple
              />
            </label>

            <button
              type="button"
              onClick={startCamera}
              className={cn(
                "flex-1 flex flex-col items-center justify-center rounded-lg",
                "border-2 border-dashed border-gray-300",
                "hover:border-red-400"
              )}
            >
              <div className="flex flex-col items-center justify-center py-7 px-4">
                <Camera className="h-8 w-8 text-gray-400" />
                <p className="mt-1 text-sm text-gray-500">
                  Prendre une photo
                </p>
              </div>
            </button>
          </div>
        )}
      </div>

      {showCamera && (
        <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-lg max-w-2xl w-full mx-4">
            <div className="relative">
              <video
                ref={ref => setVideoRef(ref)}
                autoPlay
                playsInline
                className="w-full rounded-lg"
              />
              <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-4">
                <button
                  onClick={takePhoto}
                  className="bg-red-600 text-white p-3 rounded-full hover:bg-red-700"
                >
                  <Camera size={24} />
                </button>
                <button
                  onClick={stopCamera}
                  className="bg-gray-600 text-white p-3 rounded-full hover:bg-gray-700"
                >
                  <X size={24} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}