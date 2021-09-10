import React, { useMemo } from 'react'
import { TreeNode } from './index'
import { SpringConfig } from '@react-spring/web'
import Link from './Link'

type Props<T> = {
  root: TreeNode<T>
  dx: number
  dy: number
  collapsed: string[]
  springConfig: SpringConfig
}

const Links = <T extends Record<string, unknown>>({
  root,
  dx,
  dy,
  springConfig
}: Props<T>) => {
  const links = useMemo(() => root.links(), [root])
  return (
    <>
      {links.map(({ source, target }) => (
        <Link
          key={`link-${source.data.id}-${target.data.id}`}
          dx={dx}
          dy={dy}
          source={source as TreeNode<T>}
          target={target as TreeNode<T>}
          springConfig={springConfig}
        />
      ))}
    </>
  )
}

export default Links
