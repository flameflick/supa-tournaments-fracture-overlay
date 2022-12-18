import React, { useState } from 'react'

import styles from './BaseFooter.module.scss'

import { BaseMarquee } from '@/components/BaseMarquee'
import { BaseMap } from '@/components/BaseMap'

export const BaseFooter = () => {
  const [hash, setHash] = useState<null | string>(
    '6bd8d61cb7451b2532cf6379a607707d406b9bc5'
  )

  return (
    <footer className={styles['base-footer']}>
      <BaseMap mapHash={hash} />

      <section className={styles['base-footer__info']}>
        <BaseMarquee gradientWidth={100}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis pharetra
          metus et nisi vulputate, quis hendrerit turpis blandit. Lorem ipsum
          dolor sit amet, consectetur adipiscing elit. Duis congue nisi leo, non
          laoreet diam imperdiet ut. Proin ultricies viverra elit nec efficitur.
          Vivamus eget pulvinar lacus. Duis urna diam, ultricies mattis posuere
          et, fermentum in erat. Suspendisse augue purus, fringilla quis lacus
          vitae, commodo tincidunt nisl. Integer pretium augue nec orci maximus,
          in condimentum erat ultrices. Quisque iaculis consequat nulla at
          fringilla. Nulla at venenatis augue, eget gravida felis. Nullam rutrum
          ipsum a mauris rutrum, sit amet tempor ligula placerat. Phasellus eu
          odio pellentesque, tempor velit nec, consectetur lorem. Proin faucibus
          et purus vitae porta. Etiam pulvinar commodo purus eu rutrum. Quisque
          eu imperdiet purus. In elementum placerat dui, dapibus varius sapien
          mollis vel.
        </BaseMarquee>
      </section>
    </footer>
  )
}