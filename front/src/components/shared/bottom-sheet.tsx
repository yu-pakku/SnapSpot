"use client";

import { Drawer } from "vaul";

interface BottomSheetProps {
  isOpen: boolean;
  onSwitch: (state: boolean) => void;
}

export default function BottomSheet({
  isOpen,
  onSwitch,
}: BottomSheetProps) {
  return (
    <Drawer.Root open={isOpen} onClose={() => onSwitch(false)}>

      <Drawer.Overlay className="fixed inset-0 z-40 bg-black/40" />
      
      <Drawer.Content className="fixed bottom-0 left-0 w-full bg-white z-50 rounded-t-[10px] outline-none">
        <Drawer.Title></Drawer.Title>
        <div>contents</div>
      </Drawer.Content>
    </Drawer.Root>
  );
}