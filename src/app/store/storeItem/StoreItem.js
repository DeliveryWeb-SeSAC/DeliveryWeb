"use client"

import Link from "next/link"
import style from "./StoreItem.module.css"

const StarRating = ({ rating }) => {
  const MAX_STARS = 5
  const starCount = Math.floor(rating * 2) / 2

  const stars = []

  for (let i = 1; i <= MAX_STARS; i++) {
    if (i <= starCount) {
      stars.push(
        <span key={i} className={style.fullStar}>
          ★
        </span>,
      )
    } else if (i - 0.5 === starCount) {
      stars.push(
        <span key={i} className={style.fullStar} style={{ opacity: 0.5 }}>
          ★
        </span>,
      )
    } else {
      stars.push(
        <span key={i} className={style.emptyStar}>
          ☆
        </span>,
      )
    }
  }

  return <span>{stars}</span>
}

export default function StoreItem({ store, onClick }) {
  return (
    <Link href={`/store/${store.id}`} className={style.card} onClick={onClick}>
      <div className={style.imageWrapper}>
        <img src={store.logo} alt={store.name + " 로고"} />
      </div>

      <div className={style.infoWrapper}>
        <h3>{store.name}</h3>
        <hr />
        <p>{store.address}</p>
        <p>배달시간 : {store.delivery}</p>
        <p>{store.category}</p>
      </div>
      <p className={style.ratingWrapper}>
        평점: <StarRating rating={store.star} /> ({store.star})
      </p>
    </Link>
  )
}
