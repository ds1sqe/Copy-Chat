import { Dialog, DialogTitle, IconButton, styled } from "@mui/material";
import { useSelector } from "react-redux";
import { Store } from "../../../types/store";

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose?: () => void;
}

function BootstrapDialogTitle(props: DialogTitleProps) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          Close
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export interface ModalProps {
  typeName: string;
  className?: string;
  title?: string;
  onClose?: Function;
  children: any;
}

const Modal: React.FunctionComponent<ModalProps> = ({
  title,
  children,
  className,
  typeName,
}) => {
  const openModal = useSelector((s: Store.AppState) => s.ui.openModal);

  return (
    <div className={className}>
      <BootstrapDialog
        aria-labelledby="customized-dialog-title"
        open={openModal === typeName}
      >
        <BootstrapDialogTitle id="customized-dialog-title">
          {title}
        </BootstrapDialogTitle>
        {...children}
      </BootstrapDialog>
    </div>
  );
};
export default Modal;
