import { useSearchParams } from "react-router-dom";

export const AnchorViewer = () => {
    const [params] = useSearchParams();
    const pubkey = params.get("pubkey");
    return (
      <>
        <div className="w-screen m-8">
            {pubkey}
        </div>
      </>
    );
  };
    