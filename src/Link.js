import React from 'react'
import PropTypes from 'prop-types'
import { useSpring, animated } from 'react-spring'

/**
 * @typedef {import('./index').TreeNode} TreeNode
 * @typedef {import("d3").HierarchyNode} HierarchyNode
 * @param {{
 *  source: TreeNode,
 *  target: TreeNode
 *  dx:number,
 *  dy:number,
 *  springConfig: import('react-spring').SpringConfig
 * }} props */
const Link = ({ source, target, dx, dy, springConfig }) => {
  const { x: parentX, y: parentY } = source
  const { x: childX, y: childY } = target

  const xrvs = parentX - childX < 0 ? -1 : 1
  const yrvs = parentY - childY < 0 ? -1 : 1
  const rdef = 35
  const rInitial =
    Math.abs(parentX - childX) / 2 < rdef
      ? Math.abs(parentX - childX) / 2
      : rdef
  const r =
    Math.abs(parentY - childY) / 2 < rInitial
      ? Math.abs(parentY - childY) / 2
      : rInitial
  const h = Math.abs(parentY - childY) / 2 - r
  const w = Math.abs(parentX - childX) - r * 2

  const props = useSpring({
    to: {
      d: `
      M ${childX} ${childY}
      L ${childX} ${childY + h * yrvs}
      C  ${childX} ${childY + h * yrvs + r * yrvs} ${childX} ${
        childY + h * yrvs + r * yrvs
      } ${childX + r * xrvs} ${childY + h * yrvs + r * yrvs}
      L ${childX + w * xrvs + r * xrvs} ${childY + h * yrvs + r * yrvs}
      C ${parentX}  ${childY + h * yrvs + r * yrvs} ${parentX}  ${
        childY + h * yrvs + r * yrvs
      } ${parentX} ${parentY - h * yrvs}
      L ${parentX} ${parentY}
      `
    },
    config: springConfig
  })
  // @ts-ignore
  const { d } = props

  return (
    <animated.path
      transform={`translate(${dx / 2},${dy / 2})`}
      stroke='black'
      fill='none'
      strokeWidth={2}
      d={d}
    />
  )
}

Link.propTypes = {
  source: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired
  }).isRequired,
  target: PropTypes.shape({}),
  dx: PropTypes.number.isRequired,
  dy: PropTypes.number.isRequired,
  springConfig: PropTypes.object
}

export default Link
