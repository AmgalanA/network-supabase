import { FieldError } from "react-hook-form";

export interface IField {
  placeholder: string;
  error?: FieldError;
  type?: string;
}
