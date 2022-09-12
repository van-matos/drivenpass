import { securenotes } from "@prisma/client";

export type INotesData = Omit<securenotes, "id">