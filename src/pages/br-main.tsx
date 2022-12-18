import { useState } from "react"

import Image from "next/image"
import styles from "../styles/Home.module.css"

import { BaseFooter } from "@/components/BaseFooter"
import { BaseSidebar } from "@/components/BaseSidebar"

export default function Home() {

  return (
    <main className={''}>
      <BaseFooter/>
      <BaseSidebar/>
    </main>
  )
}
