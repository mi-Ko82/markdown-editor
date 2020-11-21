import * as React from 'react'
import styled from 'styled-components'

const Header = styled.header`
  position: fixed;
  right: 0;
  top: 0;
  left: 0;
  height: 2rem;
  padding: 0.5rem 2rem;
  font-size: 1.5rem;
  line-height: 2rem;
`

const Wrapper = styled.div`
  position: fixed;
  top: 3rem;
  left: 0;
  right: 0;
  bottom: 0;
`

const TextArea = styled.textarea`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 50vw;
  padding: 0.5rem;
  border-right: 1px solid silver;
  border-top: 1px solid silver;
  font-size: 1rem;
`

const Preview = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  overflow-y: scroll;
  width: 50vw;
  border-top: 1px solid silver;
  padding: 2rem;
`

export const Editor: React.FC = () => {
  return (
    <>
      <Header>
        Markdown Editor
      </Header>
      <Wrapper>
        <TextArea value="テキスト入力エリア" />
        <Preview>プレビューエリア</Preview>
      </Wrapper>
    </>
  )
}