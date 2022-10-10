import { RefObject } from "react";

export interface IUploadImageProps {
  url: string;
  clear: () => void;
  click: () => void;
}
