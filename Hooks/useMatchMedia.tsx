import React from "react";

const useMatchMedia = (media: string) => {
  const [match, setMatch] = React.useState<null | true | false>(null);

  React.useEffect(() => {
    function changeMatch() {
      const { matches } = window.matchMedia(media);
      setMatch(matches);
    }

    window.addEventListener("resize", changeMatch);
    changeMatch();
    return () => {
      window.removeEventListener("resize", changeMatch);
    };
  }, [media]);

  return match;
};

export default useMatchMedia;
