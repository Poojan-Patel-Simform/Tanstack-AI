"use server";

import { revalidatePath } from "next/cache";

export const refreshAPIs = async (path: string) => {
  revalidatePath(path);
};
