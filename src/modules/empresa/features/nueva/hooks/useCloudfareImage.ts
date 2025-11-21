import { useState, useCallback } from "react";
import { deleteFile } from "@/lib/cloudfare";
import { uploadCompanyLogoAction } from "@/modules/empresa/actions/nueva_actions";

interface UseCompanyImageOptions {
  existingImageUrl?: string | null;
  onImageUpload?: (_url: string) => void;
  onImageRemove?: () => void;
}

interface UseCompanyImageReturn {
  imageFile: File | null;
  imagePreview: string | null;
  isUploading: boolean;
  uploadProgress: number;
  handleImageSelect: (_file: File) => void;
  handleImageRemove: () => void;
  uploadImage: () => Promise<string | null>;
  deleteExistingImage: () => Promise<void>;
}

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/gif", "image/webp"];

export function useCloudfareImage({
  existingImageUrl = null,
  onImageUpload,
  onImageRemove,
}: UseCompanyImageOptions = {}): UseCompanyImageReturn {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(
    existingImageUrl
  );
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const validateFile = (file: File): { isValid: boolean; error?: string } => {
    if (!ALLOWED_TYPES.includes(file.type)) {
      return {
        isValid: false,
        error: "Formato de imagen no permitido. Use JPG, PNG, GIF o WebP",
      };
    }

    if (file.size > MAX_FILE_SIZE) {
      return { isValid: false, error: "La imagen no debe superar los 5MB" };
    }

    return { isValid: true };
  };

  const handleImageSelect = useCallback((file: File) => {
    const validation = validateFile(file);

    if (!validation.isValid) {
      alert(validation.error);
      return;
    }

    setImageFile(file);

    // Crear preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  }, []);

  const handleImageRemove = useCallback(() => {
    setImageFile(null);
    setImagePreview(existingImageUrl || null);
    onImageRemove?.();
  }, [existingImageUrl, onImageRemove]);

  const deleteExistingImage = async (): Promise<void> => {
    if (!existingImageUrl) return;

    try {
      

      // Extraer el path del archivo desde la URL pública
      const url = new URL(existingImageUrl);
      const pathMatch = url.pathname.match(/\/company-logos\/(.+)/);

      if (pathMatch) {
        const filePath = pathMatch[1];
        await deleteFile(filePath);
      }
    } catch (error) {
      console.error("Error al procesar la eliminación:", error);
      throw error;
    }
  };

  const uploadImage = async (): Promise<string | null> => {
    if (!imageFile) return null;

    setIsUploading(true);
    setUploadProgress(0);


    try {
      const formData = new FormData();
      formData.append("file", imageFile);

      const result = await uploadCompanyLogoAction(formData);

      if (!result || !result.success || !result.url) {
        console.error("Error al subir imagen:", result);
        throw new Error(result?.error || "Error desconocido al subir la imagen");
      }

      const publicUrl = result.url;

      setUploadProgress(100);
      onImageUpload?.(publicUrl);

      return publicUrl;
    } catch (error) {
      console.error("Error en el proceso de upload:", error);
      alert("Error al subir la imagen. Por favor, intente nuevamente.");
      return null;
    } finally {
      setIsUploading(false);
    }
  };

  return {
    imageFile,
    imagePreview,
    isUploading,
    uploadProgress,
    handleImageSelect,
    handleImageRemove,
    uploadImage,
    deleteExistingImage,
  };
}
