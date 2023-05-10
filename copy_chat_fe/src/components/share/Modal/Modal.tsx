import { CloseOutlined } from "@mui/icons-material";
import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { ui_actions } from "../../../store/ui";
import { Store } from "../../../types/store";

export interface ModalDialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose?: () => void;
}

function ModalDialogTitle(props: ModalDialogTitleProps) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, paddingBottom: 4 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 0,
            top: 0,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseOutlined />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

export interface ModalProps {
  typeName: string;
  className: string;
  title?: string;
  onClose?: Function;
  children: any;
  maxWidth?: string;
  fullWidth?: boolean;
}

const Modal: React.FunctionComponent<ModalProps> = ({
  title,
  children,
  className,
  typeName,
  maxWidth,
  fullWidth,
}) => {
  const openedModal = useSelector((s: Store.AppState) => s.ui.modal.type);
  const dispatch = useDispatch();

  const max_width = maxWidth ? maxWidth : "md";
  const full_width = fullWidth ? fullWidth : false;

  return (
    <div className={className}>
      <Dialog
        aria-labelledby="customized-dialog-title"
        open={openedModal === typeName}
        // @ts-expect-error
        maxWidth={max_width}
        fullWidth={full_width}
      >
        <DialogContent>
          <ModalDialogTitle
            id={className}
            onClose={() => {
              dispatch(ui_actions.closeModal());
            }}
          >
            {title}
          </ModalDialogTitle>
          {children}
        </DialogContent>
      </Dialog>
    </div>
  );
};
export default Modal;
