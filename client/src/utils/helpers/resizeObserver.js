const resizeBodyHeight = (body, panel) => {
  const resizeObserver = new ResizeObserver(entries => {
    const target = entries[0].contentRect.height;
    const offsetHeight = panel.current && panel.current.offsetHeight;

    if (body.current) {
      body.current.style = `height: ${target - offsetHeight - 65}px`;
    }
  });

  resizeObserver.observe(document.body);
};

const resizeEditor = (body, panel) => {
  const resizeObserver = new ResizeObserver(entries => {
    const target = entries[0].contentRect.height + 10;
    const offsetHeight = window.innerHeight - target - 65;

    if (body.current) {
      body.current.style = `height: ${offsetHeight}px`;
    }
  });
  resizeObserver.observe(panel.current);
};

export {
  resizeBodyHeight,
  resizeEditor
}