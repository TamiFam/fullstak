import { useState, useEffect } from "react";

const Loading = (isLoading) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isLoading) {
      setLoading(false);
    }
  }, [isLoading]);

  return loading;
};

export default Loading;
