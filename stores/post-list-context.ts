import { BlogItem } from '@/utils/post';
import { Dictionary } from 'lodash';
import { createContext } from 'react';
type ReadingTime = ReturnType<
  typeof import('reading-time-estimator').readingTime
>;

export type PostInfoItem = {
  readingInfo: ReadingTime;
  name: string;
  title: string;
  image: string;
};



export const PostListContext = createContext<{ blogs: Dictionary<BlogItem[]>, sortedYears: number[] }>({ blogs: {}, sortedYears: [] });