export const SchemaInput = ({ onChange }: { onChange: Function }) => {
  return (
    <input
      type="text"
      name="schema"
      onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
        onChange(event);
      }}
      placeholder="Schema"
      className="px-3 py-3 my-4 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"
    />
  );
};
