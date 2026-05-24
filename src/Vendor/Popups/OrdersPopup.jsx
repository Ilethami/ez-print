import * as Ven from "../../Functions/login_vendor";
import { useEffect } from "react";

export default function Orders() {
  useEffect(() => {
    const timer = setTimeout(() => {
      Ven.loadOrders();
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full h-full min-w-0 overflow-hidden bg-[#f6f5f5] text-[#33313B] flex flex-col">
      {/* HEADER */}
      <div className="px-6 pt-6 pb-2 shrink-0">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Orders</h2>
        </div>
      </div>

      {/* SCROLL AREA */}
      <div className="flex-1 overflow-y-auto px-6 pb-6 min-h-0">
        <div
          id="orders-container"
          className="
            w-full
            min-w-0
            grid
            grid-cols-1
            lg:grid-cols-2
            gap-4

            /* CARD BASE */
            [&>div]:bg-white
            [&>div]:border
            [&>div]:border-[#33313B]/10
            [&>div]:rounded-xl
            [&>div]:shadow-sm
            [&>div]:p-4
            [&>div]:flex
            [&>div]:flex-col
            [&>div]:gap-2
            [&>div]:transition-all
            [&>div]:min-w-0
            [&>div]:overflow-hidden

            /* HOVER */
            [&>div:hover]:shadow-md
            [&>div:hover]:border-[#e3c4ab]

            /* TITLE */
            [&_h3]:font-bold
            [&_h3]:text-lg
            [&_h3]:text-[#33313B]
            [&_h3]:break-words

            /* TEXT */
            [&_p]:text-sm
            [&_p]:text-[#33313B]/80
            [&_p]:break-words

            /* IMAGES */
            [&_img]:w-[180px]
            [&_img]:rounded-lg
            [&_img]:mx-auto
            [&_img]:border
            [&_img]:border-[#33313B]/10
            [&_img]:object-cover

            /* BUTTONS */
            [&_button]:mt-2
            [&_button]:p-2
            [&_button]:rounded-lg
            [&_button]:cursor-pointer
            [&_button]:transition
            [&_button]:font-medium
            [&_button]:w-32

            /* Download Button */
            [&_button:nth-of-type(1)]:bg-[#4592af]
            [&_button:nth-of-type(1)]:text-white
            [&_button:nth-of-type(1):hover]:bg-[#33313B]

            /* Accept Button */
            [&_button:nth-of-type(2)]:bg-[#e3c4ab]
            [&_button:nth-of-type(2)]:text-[#33313B]
            [&_button:nth-of-type(2):hover]:bg-[#4592af]
            [&_button:nth-of-type(2):hover]:text-white

            /* Reject Button */
            [&_button:nth-of-type(3)]:bg-[#33313B]
            [&_button:nth-of-type(3)]:text-white
            [&_button:nth-of-type(3):hover]:bg-[#e3c4ab]
            [&_button:nth-of-type(3):hover]:text-[#33313B]

            /* SELECTS */
            [&_select]:appearance-none
            [&_select]:bg-white
            [&_select]:border
            [&_select]:border-[#33313B]/20
            [&_select]:rounded-lg
            [&_select]:p-2
            [&_select]:cursor-pointer
            [&_select]:transition
            [&_select:hover]:border-[#e3c4ab]
            [&_select:focus]:border-[#4592af]
            [&_select]:outline-none
          "
        />
      </div>
    </div>
  );
}
