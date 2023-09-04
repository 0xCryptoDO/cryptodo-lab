import { useState } from 'react';
import { TooltipProps } from './tooltip.types';

import { Content, Root, Trigger } from './tooltip.style';

export const Tooltip = (props: TooltipProps) => {
  const { children, content, open, onOpenChange, delayDuration } = props
const [openMobile, setOpenMobile] = useState(false)

  return (
    <Root open={openMobile || open} onOpenChange={onOpenChange} delayDuration={delayDuration || 350}>
      <Trigger asChild onTouchStart={() => {setOpenMobile(prevState => !prevState)}}>{children}</Trigger>
      <Content side="top" align="center">
        {content}
      </Content>
    </Root>
  );
};
