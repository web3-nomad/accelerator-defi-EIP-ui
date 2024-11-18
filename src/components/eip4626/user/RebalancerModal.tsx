import {
  Modal,
  ModalOverlay,
  ModalCloseButton,
  ModalContent,
  ModalBody,
  ModalHeader,
  Text,
} from "@chakra-ui/react";

type RebalancerModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactElement;
};

export const RebalancerModal = ({
  isOpen,
  onClose,
  title,
  children,
}: RebalancerModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent width="80%" pt="8">
        <ModalHeader mb="8">
          <Text fontSize={22} fontWeight="800" align="center" mb="2">
            {title}
          </Text>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>{children}</ModalBody>
      </ModalContent>
    </Modal>
  );
};
