import { ReactNode, RefAttributes } from 'react';
import {
  AccordionMultipleProps,
  AccordionSingleProps,
} from '@radix-ui/react-accordion';

type RadixCollapseProps =
  | (AccordionSingleProps & RefAttributes<HTMLDivElement>)
  | (AccordionMultipleProps & RefAttributes<HTMLDivElement>);

export type CollapseProps = RadixCollapseProps;

export interface CollapseItemProps {
  header: string | ReactNode;
  value: string;
  children?: string | ReactNode;
}
