import { motion } from 'framer-motion';
import { Chart } from 'primereact/chart';
import { Card } from 'primereact/card';
import { Divider, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from '@nextui-org/react';

const ChartContainer = ({ type, data, options, chartTitle, chartSubtitle, chartDescription, children }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.75 }}
    >
      <div className="chart-container flex justify-center py-4">
        <Card className="min-w-[60vw] dark:bg-black" title={chartTitle} subTitle={chartSubtitle}>
          <Chart type={type} data={data} options={options} />
          <Divider className="my-4" />
          <Button
            color="secondary"
            onPress={onOpen}
            className="justify-center w-full"
          >
            Description
          </Button>
          <Modal
            size="4xl"
            isOpen={isOpen}
            onOpenChange={onOpenChange}>
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">{chartTitle}</ModalHeader>
                  <ModalBody>
                    <p className="text-center" dangerouslySetInnerHTML={{ __html: chartDescription }} />
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" variant="ghost" onPress={onClose}>Close</Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
          {children}
        </Card>
      </div>
    </motion.div>
  );
};

export default ChartContainer;
