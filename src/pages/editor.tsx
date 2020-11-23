import * as React from 'react'
import styled from 'styled-components'
import { useStateWithStorage } from '../hocks/use_state_with_storage'
import * as ReactMarkdown from 'react-markdown'
import { putMemo } from '../indexeddb/memos'
import { Button } from '../components/button'
import { SaveModal } from '../components/save_modal'

const { useState } = React

const Header = styled.header`
  display: flex;
  align-content: center;
  justify-content: space-between;
  position: fixed;
  right: 0;
  top: 0;
  left: 0;
  height: 2rem;
  padding: 0.5rem 2rem;
  font-size: 1.5rem;
  line-height: 2rem;
`

const HeaderControl = styled.div`
  height: 2rem;
  display: flex;
  align-content: center;
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

const StorageKey = 'pages/editor:text'

export const Editor: React.FC = () => {
  const [text, setText] = useStateWithStorage('', StorageKey)

  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <Header>
        Markdown Editor
        <HeaderControl>
          <Button onClick={() => setShowModal(true)}>
            保存する
          </Button>
        </HeaderControl>
      </Header>
      <Wrapper>
        <TextArea
         onChange={(event) => setText(event.target.value)}
         value={text}
        />
        <Preview>
          <ReactMarkdown source={text} />
        </Preview>
      </Wrapper>
      {showModal && (
        <SaveModal
         onSave={(title: string) :void => {
           putMemo(title, text)
           setShowModal(false)
         }}
         onCancel={() => setShowModal(false)}
        />
      )}
    </>
  )
}