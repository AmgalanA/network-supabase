import { useState, useRef, useCallback, ChangeEvent } from "react";
import { v4 } from "uuid";

import { IFile } from "../../types/file/file.types";
import { StorageFiles } from "../../types/supabase/storage-files/storage-files.enum";
import { supabase } from "../../utils/supabase";

export const useUpload = () => {
  const [file, setFile] = useState({} as IFile);

  const ref = useRef<HTMLInputElement>(null);

  const click = useCallback(() => {
    ref.current?.click();
  }, [ref.current]);

  const clear = useCallback(() => {
    setFile({} as IFile);
  }, [setFile]);

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const file = e.target.files[0];

    const url = URL.createObjectURL(file);

    setFile({
      file,
      url,
    });
  }, []);

  const upload = async () => {
    if (!file.file) return;

    const { data, error } = await supabase.storage
      .from(StorageFiles.POST_IMAGES)
      .upload(`/public/${file.file.name}${v4()}`, file.file);

    if (error) {
      console.log(`Error uploading file: ${error}`);
      return error;
    }

    return data?.["Key"];
  };

  return { click, clear, file, handleChange, upload, ref };
};
