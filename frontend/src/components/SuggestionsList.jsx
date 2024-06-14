import React, { useState } from "react";

const SuggestionsList = ({ suggestions = [], highlight, dataKey, changeChat }) => {
    const [currentSelected, setCurrentSelected] = useState(undefined);
    console.log(changeChat);
    
    const getHighlightedText = (text, highlight) => {
    if (!highlight) return text;
    const parts = text.split(new RegExp(`(${highlight})`, "gi"));
    return parts.map((part, index) =>
      part.toLowerCase() === highlight.toLowerCase() ? (
        <span key={index} className="">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  const changeCurrentChat = (index, suggestion) => {
    setCurrentSelected(index);
    changeChat(suggestion);
  };
  return (
    <>
      {suggestions.map((suggestion, index) => {
        const currSuggestion = dataKey ? suggestion[dataKey] : suggestion;

        return (
          <li
            key={index}
            onClick={() => changeCurrentChat(index, suggestion)}
            className=""
            id={`suggestion-${index}`}
          >
            {getHighlightedText(currSuggestion, highlight)}
          </li>
        );
      })}
    </>
  );
};

export default SuggestionsList;
