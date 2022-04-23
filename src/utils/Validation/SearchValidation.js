function SearchValidation(searchString) {
  if (searchString.length < 3) {
    return searchString.length === 0
      ? "Нужно ввести ключевое слово"
      : "Строка поиска содержит менее трех символов";
  }
  return "";
}

export default SearchValidation;
