import React, { useEffect, useState } from 'react';

type Props = {
  description: string;
};

const Description = ({ description }: Props) => {
  const [fullString, setFullString] = useState(description);
  const [isTruncated, setIsTruncated] = useState(true);

  useEffect(() => {
    if (description.length < 100) {
      setIsTruncated(false);
    }
  }, []);

  return (
    <div className="text-md px-4 pb-4 break-all flex">
      {isTruncated ? (
        <pre>
          {fullString.slice(0, 100)}...{' '}
          <button
            onClick={() => setIsTruncated(false)}
            className="text-neutral-700
            hover:underline"
          >
            View More
          </button>
        </pre>
      ) : (
        <pre>{fullString}</pre>
      )}
    </div>
  );
};

export default Description;
