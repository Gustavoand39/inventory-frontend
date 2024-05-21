import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";

interface ICustomModal {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  onSave?: () => void;
  renderBody: React.ReactNode;
}

const CustomModal = ({
  title,
  isOpen,
  onClose,
  onSave,
  renderBody,
}: ICustomModal) => {
  return (
    <>
      <Modal
        isOpen={isOpen}
        onOpenChange={onClose}
        placement="top-center"
        size="lg"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>{title}</ModalHeader>

              <ModalBody className="flex flex-wrap gap-4 w-100">
                {renderBody}
              </ModalBody>

              <ModalFooter>
                <Button
                  color="danger"
                  className="font-semibold"
                  onPress={onClose}
                >
                  Cerrar
                </Button>

                <Button
                  color="primary"
                  className="font-semibold"
                  onPress={onSave}
                >
                  Guardar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default CustomModal;
