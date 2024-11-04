import { useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';

interface UseInfiniteScrollProps {
  loading: boolean;
  hasNextPage: boolean;
  onLoadMore: () => void;
  threshold?: number;
}

export function useInfiniteScroll({
  loading,
  hasNextPage,
  onLoadMore,
  threshold = 0.5
}: UseInfiniteScrollProps) {
  const { ref, inView } = useInView({
    threshold,
    triggerOnce: false
  });

  useEffect(() => {
    if (inView && !loading && hasNextPage) {
      onLoadMore();
    }
  }, [inView, loading, hasNextPage, onLoadMore]);

  return { ref };
}