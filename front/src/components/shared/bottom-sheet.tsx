"use client";

import { Drawer } from "vaul";

interface BottomSheetProps {
  isOpen: boolean;
  onSwitch: (state: boolean) => void;
  children: React.ReactNode;
}

export default function BottomSheet({
  isOpen,
  onSwitch,
  children
}: BottomSheetProps) {
  return (
    <Drawer.Root open={isOpen} onClose={() => onSwitch(false)}>

      <Drawer.Overlay className="fixed inset-0 z-40 bg-black/40" />
      
      <Drawer.Content className="fixed bottom-0 left-0 w-full bg-white z-50 rounded-t-[10px] outline-none">
        <Drawer.Title />
        <Drawer.Handle className="my-4" />
        <div className="px-6">
          {children}
        </div>
      </Drawer.Content>
    </Drawer.Root>
  );
}