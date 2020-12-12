import * as React from 'react'
import {
  Link,
  useHistory,
} from 'react-router-dom'
import styled from 'styled-components'
import { Header } from '../components/header'
import {
  getMemoPageCount,
  getMemos,
  MemoRecord,
} from '../indexeddb/memos'

const { useState, useEffect } = React

const HeaderArea = styled.div`
  position: fixed;
  right: 0;
  top: 0;
  left: 0;
`

const Wrapper = styled.div`
  position: fixed;
  bottom: 3rem;
  left: 0;
  right: 0;
  top:3rem;
  overflow-y: scroll;
  padding: 0 1rem;
`

const Memo = styled.button`
  display: block;
  background-color: white;
  border: 1px solid gray;
  width: 100%;
  padding: 1rem;
  margin: 1rem 0;
  text-align: left;
`

const MemoTitle = styled.div`
  margin-bottom: .5rem;
  font-size: 1rem;
`

const MemoText = styled.div`
  overflow: hidden;
  font-size: .85rem;
  text-overflow: ellipsis;
  white-space: nowrap;
`

const Paging = styled.div`
  position: fixed;
  left: 0;
  bottom: 0;
  right: 0;
  height: 3rem;
  padding: .5rem;
  line-height: 2rem;
  text-align: center;
`

const PagingButton = styled.button`
  background: none;
  border: none;
  display: inline-block;
  height: 2rem;
  padding: .5rem 1rem;

  &:disabled {
    color: silver;
  }
`

interface Props {
  setText: (text: string) => void
}

export const History: React.FC<Props> = (props) => {
  const { setText } = props
  const [memos, setMemos] = useState<MemoRecord[]>([])
  const [page, setPage] = useState(1)
  const [maxPage, setMaxPage] = useState(1)
  const history = useHistory()

  useEffect(() => {
    getMemos(1).then(setMemos)
    getMemoPageCount().then(setMaxPage)
  }, [])

  const canNextPage: boolean = page < maxPage
  const canPrevPage: boolean = page > 1
  const movePage = (targetPage: number) => {
    if (targetPage < 1 || maxPage < targetPage) {
      return
    }
    setPage(targetPage)
    getMemos(targetPage).then(setMemos)
  }

  return (
    <>
      <HeaderArea>
        <Header title="履歴">
          <Link to="/editor">
            エディタに戻る
          </Link>
        </Header>
      </HeaderArea>
      <Wrapper>
        {memos.map(memo => (
          <Memo 
            key={memo.datetime}
            onClick={() => {
              setText(memo.text)
              history.push('/editor')
            }}
          >
            <MemoTitle>{ memo.title }</MemoTitle>
            <MemoText>{ memo.text }</MemoText>
          </Memo>
        ))

        }
      </Wrapper>
      <Paging>
        <PagingButton
          onClick={() => movePage(page - 1)}
          disabled={!canPrevPage}
        >
          ＜
        </PagingButton>
        {page} / {maxPage}
        <PagingButton
          onClick={() => movePage(page + 1)}
          disabled={!canNextPage}
        >
          ＞
        </PagingButton>
      </Paging>
    </>
  )
}