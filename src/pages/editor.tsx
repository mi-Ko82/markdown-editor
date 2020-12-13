import * as React from 'react'
import styled from 'styled-components'
import { useStateWithStorage } from '../hocks/use_state_with_storage'
import { putMemo } from '../indexeddb/memos'
import { Button } from '../components/button'
import { SaveModal } from '../components/save_modal'
import { Link } from 'react-router-dom'
import { Header } from '../components/header'
import ConvertMarkdownWorker from 'worker-loader!../worker/convert_markdown_worker'

const convertMarkdownWorker = new ConvertMarkdownWorker()
const { useState, useEffect } = React

const Wrapper = styled.div`
  position: fixed;
  top: 3rem;
  right: 0;
  left: 0;
  bottom: 0;
`

const HeaderArea = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
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

interface Props {
  text: string
  setText: (text: string) => void
}

export const Editor: React.FC<Props> = (props) => {
  const { text, setText } = props
  const [showModal, setShowModal] = useState(false)
  const [html, setHtml] = useState('')

  useEffect(() => {
    convertMarkdownWorker.onmessage = (event) => {
      setHtml(event.data.html)
    }
  }, [])

  useEffect(() => {
    convertMarkdownWorker.postMessage(text)
  }, [text])

  return (
    <>
      <HeaderArea>
        <Header title="Markdown Editor">
          <Button onClick={() => setShowModal(true)}>
            保存する
          </Button>
          <Link to="/history">
            履歴を見る
          </Link>
        </Header>
      </HeaderArea>
      <Wrapper>
        <TextArea
         onChange={(event) => setText(event.target.value)}
         value={text}
        />
        <Preview>
          <div dangerouslySetInnerHTML={{ __html: html }} />
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