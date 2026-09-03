function cartReducer(state, action) {
  switch (action.type) {
    case "add":
      return { items: [...state.items, action.dish] };
    case "remove":
      return { items: state.items.filter(d => d.id !== action.id) };
    case "clear":
      return { items: [] };
    default:
      throw new Error("Unknown action: " + action.type);
  }
}

export default cartReducer;
