'use client';

import {useStoreModal} from '@/hooks/useStoreModal';
import {Modal} from '@/components/ui/modal';

export const StoreModal = () => {
  const storeModal = useStoreModal();

  return (
    <Modal
      title={'Create Store'}
      description={'Add store to manage products'}
      isOpen={storeModal.isOpen}
      onClose={storeModal.onClose}
    >
      Create Store Form
    </Modal>
  );
};
