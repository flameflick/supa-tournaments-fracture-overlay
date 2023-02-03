import React, { ReactPropTypes } from 'react'

import styles from './BaseMarquee.module.scss'

import Marquee from 'react-fast-marquee'
import clsx from 'clsx'

interface IBaseMarqueeProps {
  width?: number
  height?: number
  gradientWidth?: number
  hollow?: boolean
  speed?: number
  play?: boolean

  className?: string
  children: React.ReactNode
}

export const BaseMarquee = (props: IBaseMarqueeProps) => {
  return (
    <div 
      className={clsx(
        styles['base-marquee__wrapper'],
        props.hollow && styles['base-marquee__wrapper_hollow'],
        props.className
      )}
    >
      <Marquee
        speed={props.speed || 12}
        play={props.play ?? true}
        style={{
          maxWidth: props.width ? `${props.width}px` : '100%',
          height: props.height ? `${props.height}px` : '100%'
        }}
        gradientWidth={`${props.gradientWidth ?? 50}px`}
        gradientColor={props.hollow ? null : [35, 35, 35]}
        className={clsx(
          styles['base-marquee__container']
        )}
      >
        { props.children } 
      </Marquee>
    </div>
  )
}
