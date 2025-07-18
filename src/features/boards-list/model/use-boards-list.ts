import { rqClient } from "@/shared/api/instance.ts";
import { RefCallback, useCallback } from "react";
import type { BoardsSortOption } from "@/features/boards-list/model/use-boards-filters.ts";
import { keepPreviousData } from "@tanstack/query-core";

type UseBoardsListParams = {
  limit?: number;
  isFavorite?: boolean;
  search?: string;
  sort?: BoardsSortOption;
};

export function useBoardsList({
  limit = 20,
  isFavorite,
  search,
  sort,
}: UseBoardsListParams) {
  const { fetchNextPage, data, isFetchingNextPage, isPending, hasNextPage } =
    rqClient.useInfiniteQuery(
      "get",
      "/boards",
      {
        params: {
          query: {
            page: 1,
            limit,
            isFavorite,
            search,
            sort,
          },
        },
      },
      {
        initialPageParam: 1,
        pageParamName: "page",
        getNextPageParam: (lastPage, _, lastPageParam) =>
          Number(lastPageParam) < lastPage.totalPages
            ? Number(lastPageParam) + 1
            : null,
        placeholderData: keepPreviousData,
      },
    );

  const cursorRef: RefCallback<HTMLDivElement> = useCallback(
    (el) => {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            fetchNextPage();
          }
        },
        { threshold: 0.5 },
      );

      if (el) {
        observer.observe(el);

        return () => {
          observer.disconnect();
        };
      }
    },
    [fetchNextPage],
  );

  const boards = data?.pages.flatMap((page) => page.list) ?? [];

  return {
    boards,
    isPending,
    isFetchingNextPage,
    hasNextPage,
    cursorRef,
  };
}
