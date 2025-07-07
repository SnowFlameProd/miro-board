import { useBoardsList } from "@/features/boards-list/model/use-boards-list.ts";
import {
  BoardsListLayout,
  BoardsListLayoutHeader,
  BoardsListLayoutContent,
} from "@/features/boards-list/ui/boards-list-layout.tsx";
import { useState } from "react";
import type { ViewMode } from "@/features/boards-list/ui/view-mode-toggle.tsx";
import { ViewModeToggle } from "@/features/boards-list/ui/view-mode-toggle.tsx";
import { BoardItem } from "@/features/boards-list/compose/board-item.tsx";
import { BoardCard } from "@/features/boards-list/compose/board-card.tsx";

function BoardsListFavoritePage() {
  const boardsQuery = useBoardsList({
    isFavorite: true,
  });

  const [viewMode, setViewMode] = useState<ViewMode>("list");

  return (
    <BoardsListLayout
      header={
        <BoardsListLayoutHeader
          title="Избранные доски"
          description="Здесь вы можете просматривать и управлять своими избранными досками"
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
        renderList={() => boardsQuery.boards.map(board => <BoardItem board={board}/>)}
        renderCards={() => boardsQuery.boards.map(board => <BoardCard board={board}/>)}
      />
    </BoardsListLayout>
  );
}

export const Component = BoardsListFavoritePage;
