import { FC } from "react";

export interface ListItemProps {
    Icon: FC;
    text: string;
    to: string;
    id: number;
}

export interface ListProps {
    content: ListItemProps[]
}