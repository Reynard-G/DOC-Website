import { useState } from 'react';
import { motion } from 'framer-motion';
import { Chart } from 'primereact/chart';
import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  useMediaQuery,
} from '@mui/material';

const ChartContainer = ({ type, data, options, chartTitle, chartSubtitle, chartDescription, dropdowns }) => {
  const [open, setOpen] = useState(false);
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.75 }}
    >
      <div className="flex justify-center">
        <Card className={isSmallScreen ? "w-full mb-4" : "w-[80vw] mb-4"} elevation={4}>
          <CardHeader title={chartTitle} subheader={chartSubtitle} />
          <CardContent>
            <Chart type={type} data={data} options={options} />
          </CardContent>
          {dropdowns && (
            <div>
              <Divider className="mt-4" />
              {dropdowns}
            </div>
          )}
          <Divider />
          <Button variant="outlined" onClick={handleClickOpen} className="mt-4 w-full">
            <strong>Description</strong>
          </Button>
        </Card>
      </div>
      <Dialog maxWidth="md" scroll="paper" open={open} onClose={handleClose}>
        <DialogTitle className="flex flex-col gap-1">{chartTitle}</DialogTitle>
        <DialogContent>
          <Typography variant="body1" className="text-center" dangerouslySetInnerHTML={{ __html: chartDescription }} />
        </DialogContent>
        <DialogActions>
          <Button color="error" onClick={handleClose}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </motion.div>
  );
};

export default ChartContainer;
