const AccordionItem = ({ title, children, isOpen, toggleOpen }) => (
  <div className="">
    <button
      className="w-full text-left p-4 bg-gray-100 text-gray-900 hover:bg-white rounded-[10px] focus:outline-none"
      onClick={toggleOpen}
    >
      <h3 className="font-medium ">{title}</h3>
    </button>
    {isOpen && <div className="p-4 bg-gray-50">{children}</div>}
  </div>
);

export default AccordionItem;
