import React, { useEffect } from "react";
import Forms from "../../Components/Forms/Forms";
import { toast } from "react-toastify";

function Error() {
  useEffect(() => {
    toast.warning("oops you've just made a mistake!,  Go home please...", {
      theme: "dark",
    });
  }, []);

  return (
    <Forms title="SORRY...">
      <a href="/">Go Home!!!!</a>
    </Forms>
  );
}

export default Error;
