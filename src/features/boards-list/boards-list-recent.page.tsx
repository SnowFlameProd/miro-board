import { useBoardsList } from "@/features/boards-list/model/use-boards-list.ts";
import {
  BoardsListLayout,
  BoardsListLayoutHeader,
  BoardsListLayoutContent, BoardsListLayoutContentGroups,
} from "@/features/boards-list/ui/boards-list-layout.tsx";
import { useState } from "react";
import type { ViewMode } from "@/features/boards-list/ui/view-mode-toggle.tsx";
import { ViewModeToggle } from "@/features/boards-list/ui/view-mode-toggle.tsx";
import { useRecentGroups } from "@/features/boards-list/model/use-recent-groups.ts";
import { BoardCard } from "@/features/boards-list/compose/board-card.tsx";
import { BoardItem } from "@/features/boards-list/compose/board-item.tsx";

function BoardsListRecentPage() {
  const boardsQuery = useBoardsList({
    sort: "lastOpenedAt",
  });

  const [viewMode, setViewMode] = useState<ViewMode>("list");

  const recentGroups = useRecentGroups(boardsQuery.boards);

  return (
    <BoardsListLayout
      header={
        <BoardsListLayoutHeader
          title="Последние доски"
          description="Здесь вы можете просматривать и управлять своими последними досками"
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
      >
        <BoardsListLayoutContentGroups
          groups={recentGroups.map((group) => ({
            items: {
              list: group.items.map((board) => <BoardItem board={board}/>),
              cards: group.items.map((board) => <BoardCard board={board}/>)
            }[viewMode],
            title: group.title,
          }))}
        />
      </BoardsListLayoutContent>
    </BoardsListLayout>
  );
}

export const Component = BoardsListRecentPage;
