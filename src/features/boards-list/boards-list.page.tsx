import { Button } from "@/shared/ui/kit/button";
import { useBoardsList } from "@/features/boards-list/model/use-boards-list.ts";
import { useBoardsFilters } from "@/features/boards-list/model/use-boards-filters.ts";
import { useDebouncedValue } from "@/shared/lib/react.ts";
import { useCreateBoard } from "@/features/boards-list/model/use-create-board.ts";
import {
  BoardsListLayout,
  BoardsListLayoutFilters,
  BoardsListLayoutHeader,
  BoardsListLayoutContent,
} from "@/features/boards-list/ui/boards-list-layout.tsx";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import type { ViewMode } from "@/features/boards-list/ui/view-mode-toggle.tsx";
import { ViewModeToggle } from "@/features/boards-list/ui/view-mode-toggle.tsx";
import { BoardsSearchInput } from "@/features/boards-list/ui/boards-search-input.tsx";
import { BoardsSortSelect } from "@/features/boards-list/ui/boards-sort-select.tsx";
import { BoardItem } from "@/features/boards-list/compose/board-item.tsx";
import { BoardCard } from "@/features/boards-list/compose/board-card.tsx";

function BoardsListPage() {
  const boardsFilters = useBoardsFilters();
  const boardsQuery = useBoardsList({
    sort: boardsFilters.sort,
    search: useDebouncedValue(boardsFilters.search, 500),
  });

  const createBoard = useCreateBoard();

  const [viewMode, setViewMode] = useState<ViewMode>("list");

  return (
    <BoardsListLayout
      header={
        <BoardsListLayoutHeader
          title="Доски"
          description="Здесь вы можете просматривать и управлять своими досками"
          actions={
            <Button disabled={createBoard.isPending} onClick={createBoard.createBoard}>
              <PlusIcon/>
              Создать доску
            </Button>
          }
        />
      }
      filters={
        <BoardsListLayoutFilters
          filters={
            <BoardsSearchInput
              value={boardsFilters.search}
              onChange={boardsFilters.setSearch}
            />
          }
          sort={
            <BoardsSortSelect
              value={boardsFilters.sort}
              onValueChange={boardsFilters.setSort}
            />
          }
          actions={
            <ViewModeToggle
              value={viewMode}
              onChange={(value) => setViewMode(value)}
            />
          }
        />
      }
    >
      <BoardsListLayoutContent
        isEmpty={boardsQuery.boards.length === 0}
        cursorRef={boardsQuery.cursorRef}
        hasCursor={boardsQuery.hasNextPage}
        isPending={boardsQuery.isPending}
        isPendingNext={boardsQuery.isFetchingNextPage}
        mode={viewMode}
        renderList={() =>
          boardsQuery.boards.map((board) => (
            <BoardItem key={board.id} board={board}/>
          ))
        }
        renderCards={() =>
          boardsQuery.boards.map((board) => (
            <BoardCard key={board.id} board={board}/>
          ))
        }
      />
    </BoardsListLayout>
  );
}

export const Component = BoardsListPage;
