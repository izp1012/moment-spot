import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MapPin, Camera, X } from "lucide-react";
import { apiService } from "@/services/api";
import { useToast } from "@/hooks/use-toast";

interface CreatePostModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onPostCreated?: () => void;
}

export const CreatePostModal = ({ open, onOpenChange, onPostCreated }: CreatePostModalProps) => {
  const [images, setImages] = useState<string[]>([]);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [location, setLocation] = useState("");
  const [caption, setCaption] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const fileArray = Array.from(files);
      const newImages = fileArray.map(file => URL.createObjectURL(file));
      setImages(prev => [...prev, ...newImages]);
      setImageFiles(prev => [...prev, ...fileArray]);
    }
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
    setImageFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (!caption.trim() || imageFiles.length === 0) return;

    setIsSubmitting(true);
    try {
      await apiService.createPost({
        content: caption.trim(),
        location: location.trim() || undefined,
        images: imageFiles,
      });

      toast({
        title: "게시글 작성 완료",
        description: "게시글이 성공적으로 작성되었습니다.",
      });

      // Reset form
      setImages([]);
      setImageFiles([]);
      setLocation("");
      setCaption("");
      onOpenChange(false);
      onPostCreated?.();
    } catch (error) {
      console.error('Error creating post:', error);
      toast({
        title: "오류",
        description: "게시글 작성에 실패했습니다.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">새로운 장소 공유하기</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Image Upload */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">사진 추가</Label>
            <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
              {images.length === 0 ? (
                <label className="cursor-pointer">
                  <Camera className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                  <p className="text-muted-foreground">클릭하여 사진을 추가하세요</p>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                </label>
              ) : (
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    {images.map((image, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={image}
                          alt={`Upload ${index + 1}`}
                          className="w-full h-32 object-cover rounded-lg"
                        />
                        <button
                          onClick={() => removeImage(index)}
                          className="absolute top-2 right-2 p-1 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="h-4 w-4 text-white" />
                        </button>
                      </div>
                    ))}
                  </div>
                  <label className="cursor-pointer inline-flex items-center space-x-2 text-sm text-primary hover:text-primary/80">
                    <Camera className="h-4 w-4" />
                    <span>더 추가하기</span>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                  </label>
                </div>
              )}
            </div>
          </div>

          {/* Location Input */}
          <div className="space-y-3">
            <Label htmlFor="location" className="text-sm font-medium">장소</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="location"
                placeholder="이 곳은 어디인가요?"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Caption */}
          <div className="space-y-3">
            <Label htmlFor="caption" className="text-sm font-medium">이야기</Label>
            <Textarea
              id="caption"
              placeholder="이 장소에 대한 특별한 이야기를 들려주세요..."
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              className="min-h-[100px] resize-none"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 pt-4">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              취소
            </Button>
            <Button 
              onClick={handleSubmit}
              disabled={imageFiles.length === 0 || !caption.trim() || isSubmitting}
              className="bg-gradient-primary hover:opacity-90"
            >
              {isSubmitting ? "업로드 중..." : "공유하기"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};