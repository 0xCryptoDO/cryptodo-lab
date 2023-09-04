/* eslint-disable global-require */
import dynamic from 'next/dynamic';
import { useTheme } from 'next-themes';
import { Ace } from 'ace-builds';
import { useRef, useState } from 'react';

import { CopyIcon, LinkIcon } from '@/assets/icons';

import { CodeSnippetProps } from './codeSnippet.types';
import * as S from './codeSnippet.style';

const AceEditor = dynamic(
  async () => {
    const ace = await import('react-ace');

    require('ace-builds/src-noconflict/mode-json5');
    require('ace-builds/src-noconflict/mode-javascript');
    require('ace-builds/src-noconflict/theme-cloud9_day');
    require('ace-builds/src-noconflict/theme-cloud9_night');
    require('ace-builds/src-noconflict/ext-language_tools');
    require('brace/ext/searchbox');

    return ace;
  },
  {
    ssr: false,
  }
);

export const CodeSnippet = (props: CodeSnippetProps) => {
  const { title, code, className, css, showGutter, link, lang } = props;

  const { resolvedTheme } = useTheme();
  const [editor, setEditor] = useState<Ace.Editor | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const editorTheme = resolvedTheme === 'light' ? 'cloud9_day' : 'cloud9_night';

  const onLoad = (currentEditor: Ace.Editor) => {
    const { hash } = window.location;
    setEditor(currentEditor);

    const splittedHash = hash.split('#');
    const line = splittedHash.find((item) => item.includes('L'))?.slice(1);

    if (splittedHash.includes(link)) {
      containerRef.current?.scrollIntoView({ behavior: 'smooth' });

      if (line) {
        currentEditor.scrollToLine(+line, true, true, () => {});
      }
    }
  };

  return (
    <S.CodeSnippet className={className} css={css} id={link} ref={containerRef}>
      <S.Wrapper>
        <S.Header>
          <S.Title>{title}</S.Title>
          <S.Buttons>
            <S.Button
              onClick={() => {
                const baseUrl = window.location.toString();
                const line = (editor?.getSelectionRange().start.row ?? -1) + 1;
                let currentLink = `${
                  baseUrl.includes('#') ? baseUrl.split('#')[0] : baseUrl
                }#${link}`;

                if (line) {
                  currentLink += `#L${line}`;
                }

                navigator.clipboard.writeText(currentLink);
              }}
            >
              <LinkIcon />
            </S.Button>
            <S.Button
              onClick={() => {
                navigator.clipboard.writeText(code);
              }}
            >
              <CopyIcon />
            </S.Button>
          </S.Buttons>
        </S.Header>
        <S.Code preWrap={lang === 'json'}>
          {lang !== 'json' ? (
            <AceEditor
              mode="javascript"
              theme={editorTheme}
              name={title}
              showPrintMargin={false}
              editorProps={{ $blockScrolling: true }}
              readOnly
              defaultValue={code}
              width="100%"
              height="400px"
              wrapEnabled
              showGutter={showGutter}
              onLoad={onLoad as any}
              setOptions={{ useWorker: false }}
              navigateToFileEnd={false}
            />
          ) : (
            code
          )}
        </S.Code>
      </S.Wrapper>
    </S.CodeSnippet>
  );
};
