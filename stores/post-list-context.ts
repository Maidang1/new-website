import { createContext } from 'react';


interface PostListItem {
  name: string;
  readingInfo: {
    words: string;
    text: string
  }
  title: string
}

export const PostListContext = createContext<PostListItem[]>([]);