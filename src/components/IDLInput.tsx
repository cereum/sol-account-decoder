export const IDLInput = ({ setFile }: { setFile: Function }) => {
  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();
    fileReader.readAsText(e.target.files![0], "UTF-8");
    fileReader.onload = (e) => {
      setFile(e.target!.result);
    };
  };
  return (
    <>
      <h1>Upload Json file</h1>
      <input type="file" onChange={handleChange} />
    </>
  );
};
