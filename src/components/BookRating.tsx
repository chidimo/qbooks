import {BookType} from 'src/api/bookTypes';
import {LikeIcon} from 'src/svg/LikeIcon';
import {StarIcon} from 'src/svg/StarIcon';
import {UsersIcon} from 'src/svg/UsersIcon';
import styles from './bookrating.module.scss';

type Props = {
  book: BookType;
  iconFillLight?: boolean;
};

export const BookRating = (props: Props) => {
  const {book} = props;

  return (
    <div className={styles.purchase_likes_rating}>
      <div className={styles.like_and_purchase}>
        <div className={styles.purchases}>
          <p>
            <UsersIcon fill={props.iconFillLight ? '#fff' : '#000'} />
          </p>
          <p className="flex-grow">{book.number_of_purchases}</p>
        </div>

        <div className={styles.likes}>
          <p>
            <LikeIcon fill={props.iconFillLight ? '#fff' : '#000'} />
          </p>
          <p className="flex-grow">{book.likes}</p>
        </div>
      </div>

      <div className={styles.rating}>
        <p>
          <span className="font-bold">Ratings</span>: {book.rating}
        </p>
        <StarIcon />
      </div>
    </div>
  );
};
