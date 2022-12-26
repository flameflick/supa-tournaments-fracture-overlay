import { useState } from "react"

import Image from "next/image"
import styles from "../styles/Home.module.css"

import { BaseFooter } from "@/components/BaseFooter"
import { BaseSidebar } from "@/components/BaseSidebar"
import { useRelay } from "@/hooks/use-relay"

export default function Home() {
  const {
    team1Id,
    team2Id,

    userScores,
    songHash
  } = useRelay()

  return (
    <main>
      { JSON.stringify(userScores) } {songHash}
    
      <BaseFooter songHash={songHash}/>

      <BaseSidebar/>
    </main>
  )
}
