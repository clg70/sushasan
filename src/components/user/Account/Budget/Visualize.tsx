import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

import TransactionFlow from '../../TransactionFlow';
import { Button } from '@/components/ui/button';

const Visulaize: React.FC = () => {
  return (
    <Sheet>
      <SheetTrigger>
        <Button variant="outline">Open Visulizer</Button>
      </SheetTrigger>
      <SheetContent side="bottom" className="h-screen">
        <SheetHeader>
          <SheetTitle className="text-center font-bold">
            Tree Visulaization of Budget Flow
          </SheetTitle>
          <SheetDescription></SheetDescription>
          <div>
            <TransactionFlow />
          </div>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default Visulaize;
