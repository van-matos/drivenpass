import { networks } from "@prisma/client";

export type INetworkData = Omit<networks, "id">;