import style from './storeItem.module.css'

// 평점(star)을 받아서 별 이모지를 반환하는 개선된 함수
const StarRating = ({ rating }) => {
    // 최대 별 개수
    const MAX_STARS = 5; 
    // 반올림 대신 소수점 0.5 단위로 처리하기 위해 0.5 단위로 내림합니다.
    const starCount = Math.floor(rating * 2) / 2; 
    
    let stars = [];
    
   
    for (let i = 1; i <= MAX_STARS; i++) {
        if (i <= starCount) {
            stars.push(<span key={i} className={style.fullStar}>★</span>);
        } else if (i - 0.5 === starCount) {

            stars.push(<span key={i} className={style.halfStar}>★</span>);
        } else {
            stars.push(<span key={i} className={style.emptyStar}>☆</span>);
        }
    }
    
    return (
        <span className={style.stars}>
            {stars}
        </span>
    );
};

export default function StoreItem({store, onClick}){
    return (
        <div 
            className={style.card}
            onClick={onClick}
            >
            <img src={store.logo} className={style.logo} alt={store.name + " 로고"}/>
            <hr className={style.divider}/>
            <h2>{store.name}</h2>
            <hr className={style.divider}/>
            <p>{store.address}</p>
            <p>배달시간 : {store.delivery}</p>
            <p>
                평점: <StarRating rating={store.star} /> ({store.star})
            </p>
        </div>
    )
};