import React, { useState } from 'react'

import styles from './BaseFooter.module.scss'

import { BaseMarquee } from '@/components/BaseMarquee'
import { BaseMap } from '@/components/BaseMap'

export const BaseFooter = () => {
  const [hash, setHash] = useState<null | string>(
    'c80463d4041f580e3f6465a3022cb94480685629'
  )

  return (
    <footer className={styles['base-footer']}>
      <BaseMap mapHash={hash} />

      <section className={styles['base-footer__info']}>
        <BaseMarquee gradientWidth={100}>
          Team 1: 4558617, 5018049, 5428872 | Team 2: 4141946, 1998001, 5034731 | Team 3: 9036984, 7101590, 3195971 | Team 4: 2781573, 5275299, 60014 | Team 5: 8737519, 95729, 8710711 | Team 6: 2406105, 657415, 6996359 | Team 7: 9072722, 6862514, 1876983 | Team 8: 3074092, 7395673, 320909 | Team 9: 9390846, 8538486, 4536664 | Team 10: 2631451, 3784079, 9582937 |
        </BaseMarquee>
      </section>
    </footer>
  )
}