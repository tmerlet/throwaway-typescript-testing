const Confirmation = ({
  children,
  onOk,
}: {
  children: string;
  onOk: () => null;
}) => {
  return (
    <div role="dialog">
      <h2>Confirmation</h2>
      <div>{children}</div>
      <button onClick={onOk}>Ok</button>
      <button>Cancel</button>
    </div>
  );
};

export default Confirmation;
