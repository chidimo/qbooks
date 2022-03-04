import clx from 'clsx';

import {BackArrowIcon} from 'src/svg/BackArrowIcon';
import {ModalComponent} from './ModalComponent';
import {SearchBox} from './SearchBox';
import styles from './searchboxmobile.module.scss';

type Props = {
  isOpen: boolean;
  onRequestClose: () => void;
};

export const SearchBoxMobile = (props: Props) => {
  return (
    <ModalComponent
      centered
      isOpen={props.isOpen}
      onRequestClose={props.onRequestClose}>
      <div className={clx([styles.parent])}>
        <div onClick={props.onRequestClose} className={styles.arrow_container}>
          <BackArrowIcon />
        </div>
        <SearchBox />
      </div>
    </ModalComponent>
  );
};
