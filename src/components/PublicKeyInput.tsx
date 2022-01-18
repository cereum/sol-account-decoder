export const PublicKeyInput = ({
  setPublicKey,
}: {
  setPublicKey: Function;
}) => {


  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    if(name=="key"){
      setPublicKey(value);
    }
  };
  

  return (
    <div>
      <h2
        className="text-3xl font-extrabold text-gray-600"
        style={{ textAlign: "center" }}
      >
        Enter Account Address
      </h2>
      <input
        type="text"
        name="key"
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          handleChange(event);
        }}
        placeholder="Address"
        className="px-3 py-3 my-4 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"
      />
      
    </div>
  );
};
