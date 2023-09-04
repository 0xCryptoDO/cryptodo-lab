import * as RadixSwitch from '@radix-ui/react-switch';
import { styled } from '@stitches/react';
import { blackA } from '@radix-ui/colors';

export const SwitchRoot = styled(RadixSwitch.Root, {
    all: 'unset',
    width: 42,
    height: 25,
    backgroundColor: blackA.blackA9,
    borderRadius: '9999px',
    position: 'relative',
    boxShadow: `0 2px 10px ${ blackA.blackA7 }`,
    WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)',
    '&[data-state="checked"]': { backgroundColor: '$primarySelected' },
});

export const SwitchThumb = styled(RadixSwitch.Thumb, {
    display: 'block',
    width: 21,
    height: 21,
    backgroundColor: 'white',
    borderRadius: '9999px',
    boxShadow: `0 2px 2px ${ blackA.blackA7 }`,
    transition: 'transform 100ms',
    transform: 'translateX(2px)',
    willChange: 'transform',
    '&[data-state="checked"]': { transform: 'translateX(19px)' },
});

export const Flex = styled('div', { display: 'flex' });
export const Label = styled('label', {
    fontSize: 15,
    lineHeight: 1,
});