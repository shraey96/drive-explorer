import { useState, useEffect, forwardRef } from "react";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { subscribe } from "../../utils/pubsub";
import { PUBSUB_EVENTS } from "../../constants";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function CustomizedSnackbars() {
  const [toastQueue, setToastQueue] = useState([]);

  const handleClose = (toastId) => {
    setToastQueue((prevToasts) =>
      prevToasts.filter((prevToast) => prevToast.id !== toastId)
    );
  };

  const handleShowToast = (toastPayload) => {
    setToastQueue((prevQueue) => [
      ...prevQueue,
      { ...toastPayload, id: Date.now() },
    ]);
  };

  useEffect(() => {
    subscribe(PUBSUB_EVENTS.SHOW_TOAST, handleShowToast);
  }, []);

  return (
    <Stack spacing={2} sx={{ width: "100%" }}>
      {toastQueue.map((queueItem) => {
        return (
          <Snackbar
            key={queueItem.id}
            open
            autoHideDuration={6000}
            onClose={() => handleClose(queueItem.id)}
          >
            <Alert
              onClose={() => handleClose(queueItem.id)}
              severity={queueItem.type}
              sx={{ width: "100%" }}
            >
              {queueItem.msg}
            </Alert>
          </Snackbar>
        );
      })}
    </Stack>
  );
}
