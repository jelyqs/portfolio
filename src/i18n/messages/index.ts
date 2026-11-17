import type { Locale } from "@/i18n/config";
import { messages as en } from "./en";
import { messages as ja } from "./ja";
import { messages as vi } from "./vi";

/** Widen literal UI strings so en/vi/ja can share one Messages type. */
type UiMessages = { [K in keyof typeof en.ui]: string };

/** Content overlays from vi/ja; EN only needs `ui` at runtime. */
export type Messages = Omit<typeof vi, "ui"> & { ui: UiMessages };

export const MESSAGE_CATALOG: Record<Locale, Messages> = {
  en: en as unknown as Messages,
  vi: vi as unknown as Messages,
  ja: ja as unknown as Messages,
};

export { en, vi, ja };
