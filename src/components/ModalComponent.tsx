import clx from 'clsx';
import {PropsWithChildren} from 'react';
import ReactModal from 'react-modal';

import styles from 'src/components/modalcomponent.module.scss';

type Props = {
  isOpen: boolean;
  onAfterClose?: any;
  onRequestClose: any;
  centered?: boolean;
};

export const ModalComponent = (props: PropsWithChildren<Props>) => {
  const {isOpen, centered, onRequestClose, onAfterClose, children} = props;

  return (
    <ReactModal
      isOpen={isOpen}
      onAfterClose={onAfterClose}
      onRequestClose={onRequestClose}
      className={clx('react-modal--content-style', {
        centered: centered,
      })}
      overlayClassName="react-modal--overlay-style">
      {isOpen && (
        <div className={styles.modal_children}>
          <div className={styles.modal_body}>{children}</div>
        </div>
      )}
    </ReactModal>
  );
};

ModalComponent.defaultProps = {
  isOpen: false,
  centered: false,
};
