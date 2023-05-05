export const countChar = (id, event) => {
  const { currentTarget: target } = event;
  const maxLength = target.getAttribute("maxlength");
  const currentLength = target.value.length;
  const count = document.getElementById(id);

  if (currentLength >= maxLength) {
    return console.log("You have reached the maximum number of characters.");
  }

  count.innerHTML = maxLength - currentLength;
};