export function swipe(node) {
  let x;
  let y;

  function handleTouchstart(event) {
    x = event.touches[0].clientX;
    y = event.touches[0].clientY;

    node.dispatchEvent(
      new CustomEvent("swipestart", {
        detail: { x, y }
      })
    );

    window.addEventListener("touchmove", handletouchMove);
    window.addEventListener("touchend", handletouchEnd);
  }

  function handletouchMove(event) {
    const dx = event.touches[0].clientX - x;
    const dy = event.touches[0].clientY - y;
    x = event.touches[0].clientX;
    y = event.touches[0].clientY;

    node.dispatchEvent(
      new CustomEvent("swipemove", {
        detail: { x, y, dx, dy }
      })
    );
  }

  function handletouchEnd(event) {
    node.dispatchEvent(new CustomEvent("swipeend"));

    window.removeEventListener("touchmove", handletouchMove);
    window.removeEventListener("touchend", handletouchEnd);
  }

  node.addEventListener("touchstart", handleTouchstart);

  return {
    destroy() {
      node.removeEventListener("touchstart", handleTouchstart);
    }
  };
}
