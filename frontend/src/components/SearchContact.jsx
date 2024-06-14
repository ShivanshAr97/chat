import React, { useCallback, useState, useEffect } from "react";
import debounce from "lodash/debounce";
import Loader from "./Loader";
import SuggestionsList from "./SuggestionsList";

const SearchContact = ({
  contacts,
  dataKey = "username",
  onSelect,
  changeChat,
}) => {
  console.log({changeChat, contacts});
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const getSuggestions = async (query) => {
    setError(null);
    setLoading(true);

    try {
      let result;
      result = contacts.filter((item) => {
        return item[dataKey].toLowerCase().includes(query.toLowerCase());
      });
      setSuggestions(result);
    } catch (err) {
      setError("Failed to fetch suggestions");
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  };

  const getSuggestionsDebounced = useCallback(debounce(getSuggestions, 300), [
    contacts,
  ]);

  useEffect(() => {
    if (inputValue.length > 1) {
      getSuggestionsDebounced(inputValue);
    } else {
      setSuggestions([]);
    }
  }, [inputValue, getSuggestionsDebounced]);

  const handleSuggestionClick = (suggestion) => {
    setInputValue(dataKey ? suggestion[dataKey] : suggestion);
    setSuggestions([]);
  };

  return (
    <div>
      <input type="text" value={inputValue} onChange={handleInputChange} />

      {(suggestions.length > 0 || loading || error) && (
        <ul className="suggestions-list" role="listbox">
          {error && <div className="error">{error}</div>}
          {loading && (
            <div className="loading">
              <Loader />
            </div>
          )}
          <SuggestionsList
            changeChat={changeChat}
            dataKey={dataKey}
            suggestions={suggestions}
            highlight={inputValue}
          />
        </ul>
      )}
    </div>
  );
};

export default SearchContact;
