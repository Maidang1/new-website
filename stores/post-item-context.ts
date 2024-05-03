import { createContext } from "react";

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const PostItemContext = createContext<Record<string, any>>({});
