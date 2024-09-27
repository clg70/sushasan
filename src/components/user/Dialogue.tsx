import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import React from 'react';

type Props = {
  title?: string;
  description?: string;
  body: React.ReactNode;
  open: boolean;
  onClose: () => void;
};

const PopUpDialogue: React.FC<Props> = ({
  body,
  description,
  title,
  onClose,
  open,
}) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div>{body}</div>
      </DialogContent>
    </Dialog>
  );
};

export default PopUpDialogue;
