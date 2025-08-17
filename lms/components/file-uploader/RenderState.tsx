import { cn } from "@/lib/utils";
import { CloudUpload, ImageIcon, XIcon } from "lucide-react";
import { Button } from "../ui/button";
import Image from "next/image";

export function RenderEmptyState({ isDragActive }: { isDragActive: boolean }) {
  return (
    <div className="text-center">
      <div className="flex items-center mx-auto justify-center size-12 rounded-full bg-muted mb-4">
        <CloudUpload
          className={cn(
            "size-6 text-muted-foreground ",
            isDragActive && "text-primary"
          )}
        />
      </div>
      <p className="text-base font-semibold text-foreground">
        Drop your files here
        <span className="text-primary font-bold cursor-pointer">
          Click to upload
        </span>
      </p>
      <Button className="mt-4" type="button">
        Select File
      </Button>
    </div>
  );
}

export function RenderErrorState() {
  return (
    <div className="text-center">
      <div className="flex items-center mx-auto justify-center size-12 rounded-full  bg-destructive/30 mb-4">
        <ImageIcon className={cn("size-6 text-destructive")} />
      </div>
      <p className="text-base font-semibold">Upload Failed</p>
      <p className="text-xs mt-1 text-muted-foreground">Something went wrong</p>
      <p className="text-xl mt-3 text-muted-foreground">
        Click or drug file to retry
      </p>
      <Button className="mt-4" type="button">
        Try again
      </Button>
    </div>
  );
}

export function RenderUploadState({ previewUrl }: { previewUrl: string }) {
  return (
    <div>
      <Image
        src={previewUrl}
        alt="Uploaded File"
        className="object-contain p-2"
      />
      <Button
        variant="destructive"
        size="icon"
        className={cn("absolute top-4 right-4")}
      >
        <XIcon className="size-4" />
      </Button>
    </div>
  );
}
