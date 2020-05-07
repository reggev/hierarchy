import React, { useCallback, useState } from 'react'
import Hierarchy from 'react-hierarchy'
import 'react-hierarchy/dist/index.css'
import './App.css'
import Card from './Card'

/** @typedef {{
 *  rank: number,
 *  name: string,
 *  parent: string
 * }} DataNode */

const rawData = [
  { rank: 1, customId: '1', CustomParentId: '', name: 'Eve' },
  { rank: 2, customId: '2', CustomParentId: '1', name: 'Cain' },
  { rank: 3, customId: '3', CustomParentId: '2', name: 'po' },
  { rank: 4, customId: '4', CustomParentId: '2', name: 'jim' },
  { rank: 1, customId: '5', CustomParentId: '2', name: 'kelly' },
  { rank: 0, customId: '6', CustomParentId: '1', name: 'Seth' },
  { rank: 1, customId: '7', CustomParentId: '6', name: 'Enos' },
  { rank: 5, customId: '8', CustomParentId: '6', name: 'Noam' },
  { rank: 2, customId: '9', CustomParentId: '6', name: 'joe' },
  { rank: 1, customId: '10', CustomParentId: '6', name: 'peggy' },
  { rank: 3, customId: '11', CustomParentId: '1', name: 'Abel' },
  { rank: 4, customId: '12', CustomParentId: '1', name: 'Awan' },
  { rank: 2, customId: '13', CustomParentId: '12', name: 'Enoch' },
  { rank: 1, customId: '14', CustomParentId: '1', name: 'Azura' }
]

const App = () => {
  const [data, setData] = useState(rawData)
  const handleClick = useCallback(
    (id) => {
      setData((state) => {
        const tmp = state
          .map((item) =>
            item.name === id ? { ...item, rank: item.rank + 1 } : item
          )
          .filter((item) => item.rank <= 5)
        const parents = new Set(tmp.map((item) => item.name))
        return tmp.filter((item) => parents.has(item.parent) || !item.parent)
      })
    },
    [setData]
  )

  return (
    <div className='App'>
      <Hierarchy
        data={data}
        onClick={handleClick}
        Component={Card}
        nodeIdField='customId'
        parentIdField='CustomParentId'
      />
    </div>
  )
}

export default App
